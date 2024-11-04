const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const { v4: uuidv4 } = require('uuid');

const BUCKET_NAME = 'your-s3-bucket-name';

exports.handler = async (event) => {
    try {
        // Parse JSON data from the POST request
        const data = JSON.parse(event.body);

        // Generate a unique file name for the JSON file
        const fileName = `${uuidv4()}.json`;

        // Define the parameters for storing the file in S3
        const params = {
            Bucket: BUCKET_NAME,
            Key: fileName,
            Body: JSON.stringify(data),
            ContentType: 'application/json',
        };

        // Store the data in S3
        const response = await s3.putObject(params).promise();

        // Construct the S3 URL and return the eTag
        const s3Url = `https://${BUCKET_NAME}.s3.amazonaws.com/${fileName}`;

        return {
            statusCode: 200,
            body: JSON.stringify({
                e_tag: response.ETag,
                url: s3Url
            })
        };
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to store JSON data' })
        };
    }
};
