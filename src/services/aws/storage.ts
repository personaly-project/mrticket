import { s3 } from "./aws"

const bucket_name = process.env.TICKETS_BUCKET_NAME ?? 'tickets_uploads_dev'

//aeb09e22-4d9f-4a02-9152-4bf6bc468048-this-is-the-ticketId.png

export const downloadFile = async (target: string) => {
    const signedUrl = await new Promise<string>((resolve, reject) => {
        s3.getSignedUrl('getObject', {
            Bucket: bucket_name,
            Key: target
        }, (err, signedUrl) => {
            if (err) reject(new Error('could not get the signed url for download'))
            resolve(signedUrl)
        })
    })
    return signedUrl
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

