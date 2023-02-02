import { Event as PEvent } from "@prisma/client";
import prisma from "./prisma";
import { ISearchQ, INewEventSrcData } from "@/lib/types";

const sampleEvent: PEvent = {
    date: new Date(Date.now()),
    eventType: "sample",
    id: "sampleId",
    performers: ["guest", "main"],
    startHour: new Date(Date.now()),
    title: "sample title",
    venueId: "venueSampleId",
    eventSpecs: null
}

const getEvent = async (eventId: string): Promise<PEvent> => {

    const event = await prisma.event.findUniqueOrThrow({
        where: {
            id: eventId
        },
        include: {
            venue: {
                select: {
                    city: true,
                    country: true,
                    timezone: true,
                    state: true,
                    name: true,
                    placeType: true,
                    id: true,
                    venueSpecs: true
                }
            },
            tickets: {
                select: {
                    buyerEmail: true,
                    depositOn: true,
                    id: true,
                    eventId: true,
                    imgs: true,
                    price: true,
                    title: true
                },
                where: {
                    sold: false
                }
            }
        }
    })

    return event
}

const getEventsSearch = async (q: ISearchQ<number | string | boolean | Date>): Promise<PEvent[]> => {
    if (q.target === "id") throw new Error("this is the wrong method to make a get by id req, refer to getEvent")
    if (q.target in sampleEvent) {
        try {
            const events = prisma.event.findMany({
                where: {
                    [q.target]: q.value
                }
            })
            return events
        } catch (err) {
            console.log(err)
            throw new Error("invalid operation")
        }
    }
    throw new Error(`${q.target} is not a valid property`)
}

const createEvent = async (src: INewEventSrcData): Promise<PEvent> => {
    const newEvent = prisma.event.create({
        data: src
    })

    return newEvent
}


export const eventsApi = {
    getEvent,
    getEventsSearch,
    createEvent
}