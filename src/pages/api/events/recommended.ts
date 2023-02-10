import { venuesApi } from "@/services/prisma";
import { Event as PEvent } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { IVenue, IEvent } from "@/lib/types";

interface IData {
  venues?: (IVenue & {
    events: IEvent[];
  })[];
}

const handler = async (req: NextApiRequest, resp: NextApiResponse<IData>) => {
  if (req.method !== "GET") {
    resp.status(405).json({});
  }

  const target = req.query.venueId as string;

  try {
    const venues = await venuesApi.getVenuesOnCity("barcelona", "spain");
    return resp.status(200).json({ venues });
  } catch (err) {
    console.log(err);
    resp.status(500).json({});
  }
};

export default handler;
