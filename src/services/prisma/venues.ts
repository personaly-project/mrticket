import prisma from "./prisma";
import { Ticket, Venue, Event as PEvent } from "@prisma/client";
import { INewTicketSrcData, INewVenueSrcData, ISearchQ } from "@/lib/types";

const sampleVenue: Venue = {
    address: "sampleVenueAddress",
    city: "sampleCity",
    country: "sampleCountry",
    id: "sampleId",
    name: "name",
    placeType: "placeType",
    state: "state",
    timezone: "timezone",
    venueSpecs: null
}

const createVenue = async (src: INewVenueSrcData): Promise<Venue> => {
    const venue = await prisma.venue.create({
        data: src
    })
    return venue
}

const getVenue = async (venueId: string): Promise<Venue & {
    events: PEvent[]
}> => {
    const venue = await prisma.venue.findUniqueOrThrow({
        where: {
            id: venueId
        },
        include: {
            events: true
        }
    })
    return venue
}

const getVenuesOnCity = async (city: string, country: string) => {
    const venues = await prisma.venue.findMany({
        where: {
            city: city,
            AND: {
                country: country
            }
        },
        include: {
            events: true
        }
    })
    return venues
}

const getVenuesSearch = async (q: ISearchQ<string>): Promise<Venue[]> => {
    if (q.target === "id") throw new Error("this is the wrong method to make a get by id req, refer to getEvent")
    if (q.target in sampleVenue) {
        const venues = await prisma.venue.findMany({
            where: {
                [q.target]: q.value
            },
            include: {
                events: true
            }
        })
        return venues
    }
    throw new Error(`${q.target} is not a valid property`)
}

const updateTicket = async (update: INewTicketSrcData, ticketId: string): Promise<Ticket> => {
    const updated = await prisma.ticket.update({
        where: {
            id: ticketId
        },
        data: update
    })
    return updated
}

const getAllVenues = async (): Promise<Venue[]> => {
    const venues = await prisma.venue.findMany({})
    return venues
}

export const venuesApi = {
    createVenue,
    getVenue,
    getVenuesOnCity,
    getVenuesSearch,
    updateTicket,
    getAllVenues
}