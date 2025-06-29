// imports
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";
import crypto from "crypto";

// helper methods

// lambda entry point
export const handler = async (event: any, context: any) => {
  const hash = crypto
    .createHash("sha256")
    .update(event.body.apiKey)
    .digest("hex");
  if (
    hash !== "2c901d204202209cbab59683082264ae977128a037c898098f893851e25913ea"
  ) {
    throw new Error("Unauthorized: Invalid or missing API key");
  }

  const s3Client = new S3Client();
  const bucketName = process.env.BUCKET_NAME;

  const cleanBase64 = event.body.photo.replace(/^data:image\/jpeg;base64,/, "");
  const buffer = Buffer.from(cleanBase64, "base64"); // Decode the base64 photo
  const key = `photos/${uuidv4()}.jpeg`; // Generate a unique key for the photo

  try {
    // Upload the photo to S3
    const uploadResult = await s3Client.send(
      new PutObjectCommand({
        Bucket: bucketName,
        Key: key,
        Body: buffer,
        ContentType: "image/jpeg",
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
