import { venuesApi } from "@/services/prisma";
import { Event as PEvent } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

interface IData {
    eventPool?: PEvent[]
}

const handler = async (req: NextApiRequest, resp: NextApiResponse<IData>) => {

    if (req.method !== 'GET') {
        resp.status(405).json({})
    }

    const target = req.query.venueId as string

    try {
        const venue = await venuesApi.getVenue(target)
        return resp.status(200).json({ eventPool: venue.events })

    } catch (err) {
        console.log(err)
        resp.status(500).json({})
    }
}

export default handler