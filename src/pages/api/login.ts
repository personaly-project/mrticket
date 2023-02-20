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

    if (req.body) {
        const { email, psw } = JSON.parse(req.body) as { email: string, psw: string }

        if (!email || !psw) {
            // Remove the cookie 'Authorization'
            res.setHeader('set-cookie', 'Authorization=;  path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT')
            return res.status(400).json({
                error: "bad request"
            })
        }

        try {
            const targetUser = await login(email, psw)
            const token = encode({ id: targetUser.id })

            res.setHeader('set-cookie', `Authorization=Bearer ${token}; path=/;`)

            return res.status(200).json({
                data: targetUser
            })

        } catch (err) {
            res.setHeader('set-cookie', 'Authorization=;  path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT')
            return res.status(404).json({
                error: "user not found"
            })
        }
    } else if (Authorization) {
        try {
            const { id } = decode<IUser>(Authorization)
            const targetUser = await autoLogin(id)
            const newToken = encode(targetUser)
            res.setHeader("set-cookie", `Authorization=Bearer ${newToken}; path=/;`)
            return res.status(200).json({
                data: targetUser
            })
        } catch (err) {
            console.error(err)
            res.setHeader('set-cookie', 'Authorization=;  path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT')
            return res.status(400).json({})
        }
    }

    return res.status(400).json({})
}

export default handler
