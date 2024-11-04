const AWS = require('aws-sdk');
const s3 = new AWS.S3();

const BUCKET_NAME = 'your-s3-bucket-name';

exports.handler = async (event) => {
    try {
        // List all JSON files in the S3 bucket
        const listParams = {
            Bucket: BUCKET_NAME
        };

        const listedObjects = await s3.listObjectsV2(listParams).promise();

        const allData = [];

        // Retrieve each JSON file and append its contents to allData
        for (const item of listedObjects.Contents) {
            const getObjectParams = {
                Bucket: BUCKET_NAME,
                Key: item.Key
            };
            const fileObject = await s3.getObject(getObjectParams).promise();
            const fileContent = JSON.parse(fileObject.Body.toString('utf-8'));
            allData.push(fileContent);
        }

        return {
            statusCode: 200,
            body: JSON.stringify(allData)
        };
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to retrieve JSON data' })
        };
    }
};
