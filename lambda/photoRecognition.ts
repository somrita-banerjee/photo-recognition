import {
  RekognitionClient,
  DetectModerationLabelsCommand,
} from "@aws-sdk/client-rekognition";

// helper methods

// lambda entry point
export const handler = async (event: any, context: any) => {
  console.log("Received event:", JSON.stringify(event, null, 2));

  const input = event.body;

  const rekognitionClient = new RekognitionClient({});
  const bucketName = process.env.BUCKET_NAME;

  try {
    const detectCommand = new DetectModerationLabelsCommand({
      Image: {
        S3Object: {
          Bucket: bucketName,
          Name: input.imageKey, // The key of the image in S3
        },
      },
    });

    const detectResponse = await rekognitionClient.send(detectCommand);

    return {
      statusCode: 200,
      body: {
        message: "Hello from Photo Recognition Lambda!",
        input: input,
        rekognitionResponse: detectResponse,
        moderationLabels: detectResponse.ModerationLabels || [],
      },
    };
  } catch (error: any) {
    console.error("Error processing image:", error);
    return {
      statusCode: 500,
      body: {
        message: "Error processing image",
        error: error.message,
      },
    };
  }
};
