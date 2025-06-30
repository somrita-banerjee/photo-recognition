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
    const detectedLabels = detectResponse.ModerationLabels || [];

    if (detectedLabels.length === 0) {
      return {
        status: "safe",
        labels: [],
        userMessage: "No moderation labels detected. The image appears safe.",
      };
    }

    const highRiskLabels = detectedLabels.filter(
      (label) => typeof label.Confidence === "number" && label.Confidence >= 90
    );
    const mediumRiskLabels = detectedLabels.filter(
      (label) =>
        typeof label.Confidence === "number" &&
        label.Confidence >= 70 &&
        label.Confidence < 90
    );

    if (highRiskLabels.length > 0) {
      const labelNames = highRiskLabels.map((label) => label.Name).join(", ");
      return {
        status: "unsafe",
        labels: highRiskLabels,
        userMessage: `This image contains unsafe content: ${labelNames}. It cannot be uploaded.`,
      };
    }

    if (mediumRiskLabels.length > 0) {
      const labelNames = mediumRiskLabels.map((label) => label.Name).join(", ");
      return {
        status: "warn",
        labels: mediumRiskLabels,
        userMessage: `Caution: This image may contain sensitive content such as: ${labelNames}. Please review before proceeding.`,
      };
    }

    const labelNames = detectedLabels.map((label) => label.Name).join(", ");
    return {
      status: "safe",
      labels: detectedLabels,
      userMessage: `This image appears mostly safe, but some content was flagged (low confidence): ${labelNames}.`,
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
