import { eventsApi } from "@/services/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { IApiResponse, IEvent, INewEventSrcData } from "@/lib/types"
import { withBearerToken } from "@/lib/middleware";

const handler = async (req: NextApiRequest, res: NextApiResponse<IApiResponse<IEvent>>) => {
    if (req.method !== "POST") {
        res.status(405).json({
            error: "not allowed"
        });
    }
    try {
        const src = req.body as INewEventSrcData
        const event = await eventsApi.createEvent(src);
        return res.status(200).json({ data: event });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "internal error" });
    }
};

export default handler;
