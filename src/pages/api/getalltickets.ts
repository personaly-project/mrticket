/** @format */

import { ticketsApi } from "@/services/prisma";
import { ITicket } from "@/lib/types";
import { NextApiRequest, NextApiResponse } from "next";
import { IApiResponse } from "@/lib/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IApiResponse<ITicket[]>>
) {
  if (req.method !== "GET") {
    return res.status(400).json({
      error: "bad request",
    });
  }
  try {
    const tickets = await ticketsApi.getAllTickets();
    return res.status(200).json({ data: tickets });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: "unknown error",
    });
  }
}
