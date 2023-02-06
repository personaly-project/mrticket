import { INewVenueSrcData } from "@/lib/types";
import { venuesApi } from "@/services/prisma";
import { Venue } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

interface IData {
    venue?: Venue
}

const handler = async (req: NextApiRequest, resp: NextApiResponse<IData>) => {

    if (req.method !== 'POST') {
        resp.status(405).json({})
    }
    const body = req.body as INewVenueSrcData

    try {
        const venue = await venuesApi.createVenue(body)
        return resp.status(200).json({ venue })
    } catch (err) {
        console.log(err)
        resp.status(500).json({})
    }
}

export default handler