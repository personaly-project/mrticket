/** @format */

import { IApiResponse, INewVenueSrcData, IVenue } from "@/lib/types";
import { venuesApi } from "@/services/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { withBearerToken } from "@/lib/middleware";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<IApiResponse<IVenue>>
) => {
  if (req.method !== "POST") {
    return res.status(405).json({});
  }
  const body = req.body as INewVenueSrcData;

  try {
    const venue = await venuesApi.createVenue(body);
    return res.status(200).json({ data: venue });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: "unknown error",
    });
  }
};

export default withBearerToken(handler);
