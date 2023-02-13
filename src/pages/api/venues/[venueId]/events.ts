import { IApiResponse, IEvent } from "@/lib/types";
import { venuesApi } from "@/services/prisma";
import type { NextApiRequest, NextApiResponse } from "next";


const handler = async (req: NextApiRequest, resp: NextApiResponse<IApiResponse<IEvent[]>>) => {
    if (req.method !== 'GET') {
        return resp.status(400).json({
            error: "bad request"
        })
    }
    try {
        const target = req.query.venueId as string
        const venue = await venuesApi.getVenue(target)
        return resp.status(200).json({ data: venue.events })
    } catch (err) {
        return resp.status(500).json({
            error: "unknown error "
        })
    }
}

export default handler