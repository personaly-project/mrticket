import { IApiResponse } from "@/lib/types";
import type { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable"
import fs from "fs"
import { uploadFile } from "@/services/aws/storage";
import { ticketsApi, usersApi } from "@/services/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse<IApiResponse<string>>) => {

    if (req.method !== 'POST') {
        return res.status(405).json({
            error: "not allowed"
        })
    }

    const form = new formidable.IncomingForm({
        multiples: false,
        keepExtensions: true
    })

    const owner = req.query.userId as string

    try {
        const location = await new Promise<string>((resolve, reject) => {
            form.parse(req, async (err, fields, files) => {
                if (err) {
                    reject(new Error("could not parse the image"))
                }

                const file = files.image as formidable.File
                const raw = await fs.promises.readFile(file.filepath)

                const location = await uploadFile(raw, owner)
                resolve(location)
            })
        })

        return res.status(200).json({
            data: location
        })

    } catch (err) {
        console.log(err)
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

export default handler;