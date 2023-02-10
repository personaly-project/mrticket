import { INewUserSrcData, IApiResponse, IUser } from "@/lib/types";
import { usersApi } from "@/services/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse<IApiResponse<IUser>>) => {

    if (req.method !== 'GET') {
        res.status(405).json({
            error: "not allowed"
        })
    }
    const src = req.body as INewUserSrcData

    try {
        const user = await usersApi.createUser(src)
        res.status(200).json({
            data: user
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            error: "error creating the user"
        })
    }
}

export default handler
