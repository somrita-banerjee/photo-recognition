// imports
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";

// helper methods

// lambda entry point
export const handler = async (event: any, context: any) => {
  console.log("Event: ", JSON.stringify(event, null, 2));

  const s3Client = new S3Client();
  const bucketName = process.env.BUCKET_NAME;

  console.log("Bucket Name: ", bucketName);

  const key = `photos/${uuidv4()}.jpg`; // Generate a unique key for the photo

  try {
    // Upload the photo to S3
    const uploadResult = await s3Client.send(
      new PutObjectCommand({
        Bucket: bucketName,
        Key: key,
        Body: event.body,
        ContentType: "image/jpeg",
      })
    );
    console.log("Upload Result: ", JSON.stringify(uploadResult, null, 2));

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Photo uploaded successfully",
        uploadResult,
      }),
    };
  } catch (error) {
    console.error("Error uploading photo: ", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Error uploading photo",
        error,
      }),
    };
  }
};
