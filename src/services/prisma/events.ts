import { Event } from "@prisma/client";
import prisma from "./prisma";
import { IEventSearchQ } from "@/lib/types";

const getEvent = async (eventId: string): Promise<Event> => {

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

const getEventsSearch = async (q: IEventSearchQ<number | string | boolean | Date>): Promise<Event[]> => {
    if (q.target === "id") throw new Error("this is the wrong method to make a get by id req, refer to getEvent")
    if (q.target in Event) {
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


export const eventsApi = {
    getEvent,
    getEventsSearch
}