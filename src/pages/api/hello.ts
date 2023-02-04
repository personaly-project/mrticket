// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ticketsApi } from '@/services/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {

}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  const ticket = await ticketsApi.getTicket('019904b8-87ce-439e-867a-7a9af2c5d6d7')
  console.log(ticket)

  res.status(200).json({})


}
