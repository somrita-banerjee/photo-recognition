import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as sfn from "aws-cdk-lib/aws-stepfunctions";
import * as tasks from "aws-cdk-lib/aws-stepfunctions-tasks";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as apigw from "aws-cdk-lib/aws-apigateway";

const BUCKET_NAME = "photo-recognition-bucket";

export class PhotoRecognitionStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create an S3 bucket for photo uploads
    const photoBucket = new s3.Bucket(this, "PhotoBucket", {
      bucketName: BUCKET_NAME,
      removalPolicy: cdk.RemovalPolicy.DESTROY, // Only for development purposes
      autoDeleteObjects: true, // Only for development purposes
    });

    // Lambda function for photo upload
    const photoUploadFunction = new lambda.Function(
      this,
      "PhotoUploadFunction",
      {
        runtime: lambda.Runtime.NODEJS_22_X,
        code: lambda.Code.fromAsset("lambda"),
        handler: "photoUpload.handler",
        environment: {
          BUCKET_NAME: photoBucket.bucketName,
        },
        timeout: cdk.Duration.minutes(3),
      }
    );

    // Grant the Lambda function permissions to put objects in the S3 bucket
    photoBucket.grantPut(photoUploadFunction);

    // Create a Lambda function for photo recognition
    const photoRecognitionFunction = new lambda.Function(
      this,
      "PhotoRecognitionFunction",
      {
        runtime: lambda.Runtime.NODEJS_22_X,
        code: lambda.Code.fromAsset("lambda"),
        handler: "photoRecognition.handler",
        environment: {
          BUCKET_NAME: photoBucket.bucketName,
        },
        timeout: cdk.Duration.minutes(3),
      }
    );

    // Define the Step Functions state machine
    // that orchestrates the photo upload and recognition tasks

    // The photo upload task that uploads the photo to S3
    // and returns the S3 object key
    const photoUploadTask = new tasks.LambdaInvoke(this, "PhotoUploadTask", {
      lambdaFunction: photoUploadFunction,
      outputPath: "$.Payload",
    });

    // The photo recognition task that processes the uploaded photo
    // and returns the recognition results
    const photoRecognitionTask = new tasks.LambdaInvoke(
      this,
      "PhotoRecognitionTask",
      {
        lambdaFunction: photoRecognitionFunction,
        outputPath: "$.Payload",
      }
    );

    // Define the state machine workflow
    // that first uploads the photo and then recognizes it
    const definition = photoUploadTask.next(photoRecognitionTask);

    // Create the Step Functions state machine
    // with the defined workflow and a timeout of 5 minutes
    const stateMachine = new sfn.StateMachine(
      this,
      "PhotoRecognitionStateMachine",
      {
        definition,
        timeout: cdk.Duration.minutes(5),
        stateMachineType: sfn.StateMachineType.EXPRESS,
      }
    );

    // Api Gateway integration for the state machine
    const api = new apigw.RestApi(this, "PhotoRecognitionApi", {
      restApiName: "Photo Recognition Service",
      description: "This service handles photo uploads and recognition.",
    });

    api.root.addMethod(
      "POST",
      apigw.StepFunctionsIntegration.startExecution(stateMachine)
    );

    // Outputs
    new cdk.CfnOutput(this, "StateMachineArn", {
      value: stateMachine.stateMachineArn,
      description: "The ARN of the photo recognition state machine",
    });
    new cdk.CfnOutput(this, "PhotoUploadFunctionArn", {
      value: photoUploadFunction.functionArn,
      description: "The ARN of the photo upload Lambda function",
    });
    new cdk.CfnOutput(this, "PhotoRecognitionFunctionArn", {
      value: photoRecognitionFunction.functionArn,
      description: "The ARN of the photo recognition Lambda function",
    });
    new cdk.CfnOutput(this, "BucketName", {
      value: photoBucket.bucketName,
      description: "The name of the S3 bucket for photo uploads",
    });
    new cdk.CfnOutput(this, "ApiEndpoint", {
      value: api.url,
      description: "The endpoint URL for the photo recognition API",
    });
  }
}
