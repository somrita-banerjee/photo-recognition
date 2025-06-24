import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as sfn from 'aws-cdk-lib/aws-stepfunctions';
import * as tasks from 'aws-cdk-lib/aws-stepfunctions-tasks';

export class PhotoRecognitionStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);


    const photoUploadFunction = new lambda.Function(this, 'PhotoUploadFunction', {
      runtime: lambda.Runtime.NODEJS_18_X,
      code: lambda.Code.fromAsset('lambda'),
      handler: 'photoUpload.handler',
      environment: {
        BUCKET_NAME: 'my-photo-bucket',
      },
    });

    const photoRecognitionFunction = new lambda.Function(this, 'PhotoRecognitionFunction', {
      runtime: lambda.Runtime.NODEJS_18_X,
      code: lambda.Code.fromAsset('lambda'),
      handler: 'photoRecognition.handler',
      environment: {
        RECOGNITION_MODEL: 'my-recognition-model',
      },
    });

    const photoUploadTask = new tasks.LambdaInvoke(this, 'PhotoUploadTask', {
      lambdaFunction: photoUploadFunction,
      outputPath: '$.Payload',
    });

    const photoRecognitionTask = new tasks.LambdaInvoke(this, 'PhotoRecognitionTask', {
      lambdaFunction: photoRecognitionFunction,
      outputPath: '$.Payload',
    });

    const definition = photoUploadTask
      .next(photoRecognitionTask)
      .next(new sfn.Succeed(this, 'Success'));

    const stateMachine = new sfn.StateMachine(this, 'PhotoRecognitionStateMachine', {
      definition,
      timeout: cdk.Duration.minutes(5),
    });

    new cdk.CfnOutput(this, 'StateMachineArn', {
      value: stateMachine.stateMachineArn,
      description: 'The ARN of the photo recognition state machine',
    });
    new cdk.CfnOutput(this, 'PhotoUploadFunctionArn', {
      value: photoUploadFunction.functionArn,
      description: 'The ARN of the photo upload Lambda function',
    });
    new cdk.CfnOutput(this, 'PhotoRecognitionFunctionArn', {
      value: photoRecognitionFunction.functionArn,
      description: 'The ARN of the photo recognition Lambda function',
    });
    new cdk.CfnOutput(this, 'BucketName', {
      value: 'my-photo-bucket',
      description: 'The name of the S3 bucket for photo uploads',
    });
  }
}
