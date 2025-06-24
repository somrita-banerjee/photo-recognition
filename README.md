# Photo Recognition

This project uses the AWS CDK to deploy a photo recognition application that utilizes Amazon Rekognition for image analysis. The application is designed to recognize photo and categorize them as suitable pictures and filters out unsuitable ones like nudity or violence. The project uses a Lambda function and step function to process the images and an S3 bucket to store them. 

## Project Structure


The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `npx cdk deploy`  deploy this stack to your default AWS account/region
* `npx cdk diff`    compare deployed stack with current state
* `npx cdk synth`   emits the synthesized CloudFormation template
