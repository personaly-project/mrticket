import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Bucket, BucketEncryption } from "aws-cdk-lib/aws-s3"

const bucket_name = process.env.TICKETS_BUCKET_NAME ?? 'tickets_uploads_dev'

export class AwsCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new Bucket(this, bucket_name, {
      encryption: BucketEncryption.S3_MANAGED
    })
  }
}
