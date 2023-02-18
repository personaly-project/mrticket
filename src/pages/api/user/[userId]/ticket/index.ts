import { enforceBearerToken } from "@/lib/middleware";
import type { NextApiRequest, NextApiResponse } from "next";
import { IApiResponse, INewTicketSrcData, ITicket } from "@/lib/types";
import { ticketsApi } from "@/services/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse<IApiResponse<ITicket>>) => {

    if (req.method !== 'POST') {
        return res.status(405).json({})
    }
    try {
        const src = JSON.parse(req.body) as INewTicketSrcData
        const { userId } = req.query
        if (!userId || !src) return res.status(400).json({
            error: "bad request"
        })

        const ticket = await ticketsApi.createNewTicket(src)
        return res.status(200).json({
            data: ticket
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            error: "unknown error"
        })
    }
}

export default enforceBearerToken(handler)
