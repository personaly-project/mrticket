import { venuesApi } from "@/services/prisma";
import { Event as PEvent } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { IVenue, IEvent, IApiResponse } from "@/lib/types";


const handler = async (req: NextApiRequest, resp: NextApiResponse<IApiResponse<(IVenue & {
  events: IEvent[];
})[]>>) => {
  if (req.method !== "GET") {
    resp.status(405).json({});
  }

  try {
    const venues = await venuesApi.getVenuesOnCity("barcelona", "spain");
    return resp.status(200).json({ data: venues });
  } catch (err) {
    console.log(err);
    resp.status(500).json({});
  }
};

export default handler;
