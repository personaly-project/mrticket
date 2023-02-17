import { s3 } from "./aws"

const bucket_name = process.env.TICKETS_BUCKET_NAME ?? 'tickets_uploads_dev'


export const downloadFile = (target: string) => {

}

export const uploadFile = async (file: Buffer, filename: string, contentType: string): Promise<string> => {
    const upload = await s3.upload({
        Bucket: bucket_name,
        Key: filename,
        Body: file,
        ContentType: contentType,
    }).promise()

    return upload.Location
}

