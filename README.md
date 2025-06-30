# Photo Recognition

This project uses the AWS CDK to deploy a photo recognition application that utilizes Amazon Rekognition for image analysis. The application is designed to recognize photo and categorize them as suitable pictures and filters out unsuitable ones like nudity or violence. The project uses a Lambda function and step function to process the images and an S3 bucket to store them. 

# Prerequisites
- Node.js (v20.x or later)
- AWS CDK (v2.x)
- AWS CLI configured with your credentials
- AWS account with permissions to create and manage the required resources

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


# Frontend Client

The frontend client is a React application that allows users to upload images and view the results of the image analysis. It communicates with the backend API to send images for processing and receive the analysis results.

# Backend API
The backend API is built using AWS Lambda and AWS Step Functions. It handles image uploads, processes the images using Amazon Rekognition, and returns the results to the frontend client. The API is designed to be modular, allowing for easy updates and modifications.

# Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `npx cdk deploy`  deploy this stack to your default AWS account/region
* `npx cdk diff`    compare deployed stack with current state
* `npx cdk synth`   emits the synthesized CloudFormation template

# Features

- **Image Upload**: Users can upload images to an S3 bucket.
- **Image Analysis**: The application uses Amazon Rekognition to analyze the images and determine their suitability.
- **Workflow Orchestration**: AWS Step Functions are used to manage the workflow of image processing.
- **Serverless Architecture**: The application is built using AWS Lambda, allowing for scalable and cost-effective processing of images.
- **Modular Design**: The project is structured to allow for easy updates and modifications to the Lambda function and Step Functions.
- **TypeScript**: The project is written in TypeScript, providing type safety and better development experience.
- **AWS CDK**: The infrastructure is defined using AWS CDK, allowing for easy deployment and management of AWS resources.
- **Client Application**: A React-based client application is provided for users to interact with the photo recognition service.
- **Error Handling**: The application includes error handling mechanisms to manage failures in image processing.
- **Logging**: AWS CloudWatch is used for logging and monitoring the Lambda function and Step Functions.
- **Security**: The application uses AWS IAM roles and policies to manage permissions and access control.
- **Scalability**: The serverless architecture allows the application to scale automatically based on the number of image uploads and processing requirements.
- **Cross-Platform Compatibility**: The application can be run on any platform that supports Node.js and AWS services.
- **Modular Lambda Function**: The Lambda function is designed to be modular, allowing for easy updates and modifications.
- **Step Function Orchestration**: The Step Functions are defined in a modular way, allowing for easy updates and modifications to the workflow.
- **Image Storage**: Images are stored in an Amazon S3 bucket, providing durable and scalable storage.

# List of AWS Services Used
- **Amazon Rekognition**: For image analysis and recognition.
- **AWS Lambda**: For serverless compute to process images.
- **Amazon S3**: For storing images.   
- **AWS Step Functions**: For orchestrating the workflow of image processing.
- **AWS CDK**: For defining the cloud infrastructure as code.
- **AWS IAM**: For managing permissions and roles for the Lambda function and Step Functions.
- **AWS CloudFormation**: For deploying the infrastructure defined in the CDK.

# How It Works
1. The user uploads an image to the S3 bucket.
2. The S3 bucket triggers a Lambda function that starts a Step Function execution.
3. The Step Function orchestrates the workflow, calling the Lambda function to analyze the image using
   Amazon Rekognition.
4. The Lambda function processes the image and returns the results.
5. The results are stored in the S3 bucket or can be processed further as needed.

# Development

This project is structured to allow for easy development and testing of the photo recognition application. The main components are organized in a modular way, making it easy to update and maintain the codebase. The Lambda function and Step Function can be developed independently, allowing for quick iterations and testing.

# How the application used AWS Lambda

The application uses AWS Lambda to process images in a serverless manner. When a user uploads an image to the S3 bucket, it triggers a Lambda function that starts the image processing workflow. The Lambda function is responsible for analyzing the image using Amazon Rekognition and returning the results. 

# Troubleshooting

If you encounter issues with the deployment or functionality, consider the following steps:
- Ensure that your AWS credentials are correctly configured.
- Check the AWS CloudFormation console for any errors in the stack deployment.   
- Verify that the necessary permissions are granted to the Lambda function and Step Functions.
- Review the AWS Lambda logs in CloudWatch for any runtime errors or issues.

# Cleaning Up

```bash
cdk destroy
```   

# Additional Notes
- Ensure that you have the necessary permissions to create and manage the AWS resources used in this project
- The project is designed to be modular, allowing for easy updates and modifications to the Lambda function and Step Functions as needed.
- For more information on AWS CDK, refer to the [AWS CDK Documentation](https://docs.aws.amazon.com/cdk/latest/guide/work-with-cdk-typescript.html).
- For more information on Amazon Rekognition, refer to the [Amazon Rekognition Documentation](https://docs.aws.amazon.com/rekognition/latest/dg/what-is.html).
- For more information on AWS Step Functions, refer to the [AWS Step Functions Documentation](https://docs.aws.amazon.com/step-functions/latest/dg/welcome.html).
- For more information on AWS Lambda, refer to the [AWS Lambda Documentation](https://docs.aws.amazon.com/lambda/latest/dg/welcome.html).
- For more information on Amazon S3, refer to the [Amazon S3 Documentation](https://docs.aws.amazon.com/s3/index.html).
- For more information on AWS IAM, refer to the [AWS IAM Documentation](https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction.html).
- For more information on AWS CLI, refer to the [AWS CLI Documentation](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-welcome.html).
- For more information on Node.js, refer to the [Node.js Documentation](https://nodejs.org/en/docs/).
- For more information on Vite, refer to the [Vite Documentation](https://vitejs.dev/guide/).
- For more information on React, refer to the [React Documentation](https://reactjs.org/docs/getting-started.html).
- For more information on TypeScript, refer to the [TypeScript Documentation](https://www.typescriptlang.org/docs/).
- For more information on Jest, refer to the [Jest Documentation](https://jestjs.io/docs/getting-started).
- For more information on AWS SDK for JavaScript, refer to the [AWS SDK for JavaScript Documentation](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/welcome.html).
- For more information on AWS CDK CLI, refer to the [AWS CDK CLI Documentation](https://docs.aws.amazon.com/cdk/latest/guide/work-with-cdk-cli.html).
- For more information on AWS CloudFormation, refer to the [AWS CloudFormation Documentation](https://docs.aws.amazon.com/cloudformation/index.html).
- For more information on AWS IAM Roles, refer to the [AWS IAM Roles Documentation](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles.html).
- For more information on AWS S3 Buckets, refer to the [AWS S3 Buckets Documentation](https://docs.aws.amazon.com/AmazonS3/latest/userguide/creating-bucket.html).
- For more information on AWS Lambda Functions, refer to the [AWS Lambda Functions Documentation](https://docs.aws.amazon.com/lambda/latest/dg/getting-started.html).
- For more information on AWS Step Functions State Machines, refer to the [AWS Step Functions State Machines Documentation](https://docs.aws.amazon.com/step-functions/latest/dg/concepts-state-machine.html).
- For more information on AWS Lambda Layers, refer to the [AWS Lambda Layers Documentation](https://docs.aws.amazon.com/lambda/latest/dg/configuration-layers.html).
