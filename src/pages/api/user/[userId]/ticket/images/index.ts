import { IApiResponse } from "@/lib/types";
import type { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable"
import fs from "fs"
import { uploadFile } from "@/services/aws/storage";
import { makeFilename } from "@/lib/utils";
import { enforceBearerToken } from "@/lib/middleware";

const handler = async (req: NextApiRequest, res: NextApiResponse<IApiResponse<string>>) => {

    if (req.method !== 'POST') {
        return res.status(405).json({
            error: "not allowed"
        })
    }

    const form = new formidable.IncomingForm({
        multiples: false,
        keepExtensions: true,
    })

    const owner = req.query.userId as string
    if (!owner) return res.status(400).json({
        error: 'not allowed'
    })
    try {
        const filename = await new Promise<string>((resolve, reject) => {
            form.parse(req, async (err, fields, files) => {
                if (err) {
                    reject(new Error("could not parse the image"))
                }
                const ticketId = fields.ticketId
                const file = files.image as formidable.File
                const extension = file.mimetype?.split('/')[1]
                if (!extension) {
                    reject(new Error("could not find file extension"))
                }
                file.newFilename = makeFilename(owner, ticketId as string, extension!)
                const raw = await fs.promises.readFile(file.filepath)
                await uploadFile(raw, file.newFilename, file.mimetype as string)
                resolve(file.newFilename)
            })
        })
        return res.status(200).json({
            data: filename
        })

    } catch (err) {
        return res.status(500).json({
            error: (err as Error).message
        })
    }
}

export const config = {
    api: {
        bodyParser: false,
    },
}

export default enforceBearerToken(handler);