/** @format */
import { venuesApi } from "@/services/prisma";
import { Event as PEvent } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

interface IData {
  eventPool?: PEvent[] | object;
}

const handler = async (req: NextApiRequest, resp: NextApiResponse<any>) => {
  if (req.method === "GET") {
    try {
      const venue = await venuesApi.getAllVenues();
      const venueObject = { venue: venue };
      return resp.status(200).json(venueObject);
    } catch (err) {
      console.log(err);
      resp.status(500).json({ err });
    }
  }
};

export default handler;
