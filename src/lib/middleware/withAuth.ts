import { decode, encode } from "@/services/auth/jwt";
import type { NextApiRequest, NextApiResponse, NextApiHandler } from "next";
import { IApiResponse, IUser } from "../types";

export const enforceBearerToken = (handler: NextApiHandler) => {
    return async (req: NextApiRequest, res: NextApiResponse<IApiResponse<unknown>>) => {
        const { userId } = req.query
        const authorizationHeader = req.headers.authorization
        if (!userId || typeof userId !== "string" || !authorizationHeader) return res.status(401).json({ error: "missing authentication in request" })
        try {
            const decoded = decode<IUser>(authorizationHeader)
            if (decoded.id !== userId) return res.status(403).json({ error: "forbidden" })
            const newToken = encode(decoded)
            res.setHeader("Refreshed_Token", newToken)
            return handler(req, res)
        } catch (err) {
            res.status(401).json({ error: "invalid token" })
        }
    }
}