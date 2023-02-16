import S3 from "aws-sdk/clients/s3"

const config: S3.ClientConfiguration = {
    region: process.env.AWS_REGION ?? 'eu-west-3',
}

const s3 = new S3(config)

export {
    s3
}