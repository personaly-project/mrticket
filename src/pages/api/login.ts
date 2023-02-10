import { INewUserSrcData, IApiResponse, IUser } from "@/lib/types";
import { comparePswWithHash } from "@/services/auth/hasher";
import { usersApi } from "@/services/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse<IApiResponse<IUser>>) => {

    if (req.method !== 'POST') {
        res.status(405).json({
            error: "not allowed"
        })
    }
    const { email, psw } = req.body as { email: string, psw: string }

    if (!email || !psw) {
        res.status(400).json({
            error: "bad request"
        })
    }

    try {
        const targetUser = await usersApi.getUserByEmail(email)
        const match = await comparePswWithHash(psw, targetUser.psw)
        if (!match) {
            res.status(401).json({
                error: "bad credentials"
            })
        } else {
            res.status(200).json({
                data: targetUser
            })
        }
    } catch (err) {
        console.log(err)
        res.status(404).json({
            error: "user not found"
        })
    }
}

export default handler
