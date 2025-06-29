// imports
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";

// helper methods

// lambda entry point
export const handler = async (event: any, context: any) => {
  const s3Client = new S3Client();
  const bucketName = process.env.BUCKET_NAME;

  const buffer = Buffer.from(event.body.photo, "base64"); // Decode the base64 photo
  const key = `photos/${uuidv4()}.jpg`; // Generate a unique key for the photo

  try {
    // Upload the photo to S3
    const uploadResult = await s3Client.send(
      new PutObjectCommand({
        Bucket: bucketName,
        Key: key,
        Body: buffer,
        ContentType: "image/jpeg",
        ContentEncoding: "base64",
      })
    );
    console.log("Upload Result: ", JSON.stringify(uploadResult, null, 2));

    return {
      statusCode: 200,
      body: {
        message: "Photo uploaded successfully",
        imageKey: key,
        uploadResult,
      },
    };
  } catch (error) {
    console.error("Error uploading photo: ", error);
    return {
      statusCode: 500,
      body: {
        message: "Error uploading photo",
        error,
      },
    };
  }
};
