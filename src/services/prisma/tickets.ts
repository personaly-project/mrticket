/** @format */

import prisma from "./prisma"
import { INewTicketSrcData, ISearchQ, ITicket, ITicketUpdate } from "@/lib/types"
import { createRandomTicket } from "@/lib/utils"

const sampleTicket: ITicket = {
  ...createRandomTicket("event-sample-id", "sample-user-id"),
  id: "sample-ticket-id",
}

const getTicket = async (ticketId: string): Promise<ITicket> => {

  const ticket = await prisma.ticket.findUniqueOrThrow({
    where: {
      id: ticketId,
    },
  })
  return ticket
}

const createNewTicket = async (src: INewTicketSrcData): Promise<ITicket> => {
  const ticket = await prisma.ticket.create({
    data: src,
  })
  return ticket
}

const getTicketByEvent = async (eventId: string): Promise<ITicket[]> => {
  const tickets = prisma.ticket.findMany({
    where: {
      eventId: eventId,
    },
  })
  return tickets
}

const onTicketSold = async (
  ticketId: string,
  buyerId: string
): Promise<ITicket> => {
  await prisma.ticket.update({
    where: {
      id: ticketId,
    },
    data: {
      sold: true,
      buyerId,
    },
  })
  return await getTicket(ticketId)
}

const searchTickets = async (
  q: ISearchQ<string | Date | number | boolean>
): Promise<ITicket[]> => {
  if (q.target === "id")
    throw new Error(
      "this is the wrong method to make a get by id req, refer to getEvent"
    )
  if (
    q.target in sampleTicket &&
    q.target !== "sold" &&
    q.target !== "ticket"
  ) {
    const tickets = await prisma.ticket.findMany({
      where: {
        [q.target]: q.value,
      },
    })
    return tickets
  }
  throw new Error(`${q.target} is not a valid property`)
}

const updateTicket = async (
  update: ITicketUpdate,
  ticketId: string
): Promise<ITicket> => {
  const updated = await prisma.ticket.update({
    where: {
      id: ticketId,
    },
    data: update,
  })
  return updated
}

export const getAllTickets = async (): Promise<ITicket[]> => {
  const date = new Date()

  const tickets = await prisma.ticket.findMany({
    where: {
      sold: false,
    },
  })
  return tickets
}

export const ticketsApi = {
  getTicket,
  createNewTicket,
  getTicketByEvent,
  onTicketSold,
  searchTickets,
  updateTicket,
  getAllTickets,
}
