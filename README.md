# Photo Recognition

This project uses the AWS CDK to deploy a photo recognition application that utilizes Amazon Rekognition for image analysis. The application is designed to recognize photo and categorize them as suitable pictures and filters out unsuitable ones like nudity or violence. The project uses a Lambda function and step function to process the images and an S3 bucket to store them. 

# Prerequisites
- Node.js (v20.x or later)
- AWS CDK (v2.x)
- AWS CLI configured with your credentials

# Getting Started
1. Clone the repository
2. Navigate to the project directory
3. Install the dependencies:
   ```bash
   npm install
   ```
4. Make sure you have the AWS CLI configured with your credentials:
   ```bash
   aws configure
   ```
5. Bootstrap your AWS environment:
   ```bash
   cdk bootstrap
   ```
6. Deploy the stack:
   ```bash
   cdk deploy
   ```

## Project Structure


The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `npx cdk deploy`  deploy this stack to your default AWS account/region
* `npx cdk diff`    compare deployed stack with current state
* `npx cdk synth`   emits the synthesized CloudFormation template
