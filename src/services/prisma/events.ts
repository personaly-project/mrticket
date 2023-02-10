/** @format */

import prisma from "./prisma";
import { ISearchQ, INewEventSrcData, IEvent } from "@/lib/types";
import { venuesApi } from "./venues";
import { createRandomEvent } from "@/lib/utils";

const sampleEvent: IEvent = { ...createRandomEvent("sample-venue-id"), id: "sample-event-id" }

const getEvent = async (eventId: string): Promise<IEvent> => {
  const event = await prisma.event.findUniqueOrThrow({
    where: {
      id: eventId,
    },
    include: {
      venue: true,
      tickets: {
        where: {
          sold: false,
        },
      },
    },
  });
  return event;
};

const getEventsSearch = async (
  q: ISearchQ<number | string | boolean | Date>
): Promise<IEvent[]> => {
  if (q.target === "id")
    throw new Error(
      "this is the wrong method to make a get by id req, refer to getEvent"
    );
  if (q.target in sampleEvent) {
    try {
      const events = prisma.event.findMany({
        where: {
          [q.target]: q.value,
        },
      });
      return events;
    } catch (err) {
      console.log(err);
      throw new Error("invalid operation");
    }
  }
  throw new Error(`${q.target} is not a valid property`);
};

const createEvent = async (src: INewEventSrcData): Promise<IEvent> => {
  const newEvent = prisma.event.create({
    data: src,
  });

  return newEvent;
};

const getEventsOnCity = async (
  city: string,
  country: string
): Promise<IEvent[]> => {
  const venuesOnCity = await venuesApi.getVenuesOnCity(city, country);
  return venuesOnCity.reduce((acc: IEvent[], current: { events: any }) => {
    return [...acc, ...current.events];
  }, []);
};

export const eventsApi = {
  getEvent,
  getEventsSearch,
  createEvent,
  getEventsOnCity,
};
