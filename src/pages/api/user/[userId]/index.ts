import type { NextApiRequest, NextApiResponse } from "next";
import { IApiResponse, IPublicProfile } from "@/lib/types";
import { usersApi } from "@/services/prisma";
import { withBearerToken } from "@/lib/middleware";

const handler = async (req: NextApiRequest, res: NextApiResponse<IApiResponse<IPublicProfile>>) => {

    if (req.method !== 'GET') {
        return res.status(405).json({})
    }

    try {
        const { userId } = req.query
        if (!userId || typeof userId !== "string") return res.status(400).json({
            error: "bad request"
        })

        const profile = await usersApi.getUser(userId)
        const publicProfile: IPublicProfile = {
            avatarUrl: profile.avatarUrl,
            email: profile.email,
            tickets: profile.tickets,
            username: profile.username
        }

        return res.status(200).json({
            data: publicProfile,
        })
    } catch (err) {
        return res.status(500).json({
            error: "unknown error"
        })
    }
}

export default withBearerToken(handler)
