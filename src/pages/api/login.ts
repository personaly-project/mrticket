import { IApiResponse, IUser } from "@/lib/types";
import { autoLogin, login } from "@/services/auth";
import type { NextApiRequest, NextApiResponse } from "next";
import { encode, decode } from "@/services/auth/jwt";

const handler = async (req: NextApiRequest, res: NextApiResponse<IApiResponse<IUser>>) => {

    if (req.method !== 'POST') {
        return res.status(405).json({
            error: "not allowed"
        })
    }
    const { Authorization } = req.cookies

    if (Authorization) {
        const { email, psw } = decode<IUser>(Authorization)
        const targetUser = await autoLogin(email, psw)
        const newToken = encode(targetUser)
        res.setHeader("set-cookie", `Authorization=Bearer ${newToken}`)
        return res.status(200).json({
            data: targetUser
        })
    }

    const { email, psw } = JSON.parse(req.body) as { email: string, psw: string }

    if (!email || !psw) {
        return res.status(400).json({
            error: "bad request"
        })
    }

    try {
        const targetUser = await login(email, psw)
        const token = encode(targetUser)
        res.setHeader("set-cookie", `Authorization=Bearer ${token}`)
        return res.status(200).json({
            data: targetUser
        })
    } catch (err) {
        return res.status(404).json({
            error: "user not found"
        })
    }
}

export default handler
