import { INewUserSrcData, IApiResponse, IUser } from "@/lib/types";
import { signUp } from "@/services/auth";
import { Prisma } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse<IApiResponse<IUser>>) => {

    if (req.method !== 'POST') {
        return res.status(405).json({
            error: "not allowed"
        })
    }
    const src = JSON.parse(req.body) as INewUserSrcData
    console.log(src)
    try {
        const user = await signUp(src)
        console.log(user)
        return res.status(200).json({
            data: user
        })
    } catch (err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            return res.status(402).json({
                error: "unique constrain violated, email already taken"
            })
        } else {
            return res.status(500).json({
                error: "error creating the user"
            })
        }
    }
}

export default handler
