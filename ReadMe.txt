The service consists of two API endpoints:
    
	a) POST /store: Accepts JSON data from the user, stores it in an S3 bucket, and returns the file’s URL and eTag.
   	b) GET /retrieve: Retrieves all stored JSON data from the S3 bucket and returns it as an array.
      	These endpoints are managed by AWS API Gateway, with AWS Lambda functions performing the data handling. JSON files are stored in S3 with a unique ID for each file.

Architecture
    	S3 Bucket: Stores JSON data files.
    	API Gateway: Manages the HTTP POST and GET endpoints.
    	Lambda Functions: Handles data storage and retrieval operations.

