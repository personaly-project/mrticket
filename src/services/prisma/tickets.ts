import { Ticket } from "@prisma/client";
import prisma from "./prisma";
import { INewTicketSrcData, ISearchQ } from "@/lib/types";

const sampleTicket: Ticket = {
    buyerEmail: null,
    depositOn: "123456",
    eventId: "eventSampleId",
    id: "ticketSampleId",
    imgs: ["sampleImgUrl_1", "sampleImgUrl_2"],
    price: 100,
    sold: false,
    ticket: "sampleTicketDownloadUrl",
    title: "sampleTicketTitle"
}

const getTicket = async (ticketId: string): Promise<Ticket> => {
    const ticket = await prisma.ticket.findUniqueOrThrow({
        where: {
            id: ticketId
        }
    })
    return ticket
}

const createNewTicket = async (src: INewTicketSrcData): Promise<Ticket> => {
    const ticket = await prisma.ticket.create({
        data: src
    })
    return ticket
}

const getTicketByEvent = async (eventId: string): Promise<Ticket[]> => {
    const tickets = prisma.ticket.findMany({
        where: {
            eventId: eventId,
        }
    })
    return tickets
}

const onTicketSold = async (ticketId: string, buyerEmail: string) => {
    await prisma.ticket.update({
        where: {
            id: ticketId
        },
        data: {
            sold: true,
            buyerEmail: buyerEmail
        }
    })
}

const searchTickets = async (q: ISearchQ<string | Date | number | boolean>): Promise<Ticket[]> => {
    if (q.target === "id") throw new Error("this is the wrong method to make a get by id req, refer to getEvent")
    if (q.target in sampleTicket && q.target !== "sold" && q.target !== "ticket") {
        const tickets = await prisma.ticket.findMany({
            where: {
                [q.target]: q.value
            }
        })
        return tickets
    }
    throw new Error(`${q.target} is not a valid property`)
}

export const ticketsApi = {
    getTicket,
    createNewTicket,
    getTicketByEvent,
    onTicketSold,
    searchTickets
}