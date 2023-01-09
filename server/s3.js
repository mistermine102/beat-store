import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();

import S3 from "aws-sdk/clients/s3.js";
import fs from "fs";

const bucketName = process.env.S3_NAME;
const region = process.env.S3_REGION;
const accessKeyId = process.env.S3_KEY;
const secretAccessKey = process.env.S3_SECRET;

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
});

//upload a file to s3
export function uploadFile(file) {
  const fileStream = fs.createReadStream(file.path);

  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: file.filename,
  };

  return s3.upload(uploadParams).promise();
}

export function deleteFile(filename) {
  const deleteParams = {
    Bucket: bucketName,
    Key: filename,
  };

  return s3.deleteObject(deleteParams).promise();
}
