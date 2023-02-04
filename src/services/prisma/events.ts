/** @format */

import { Event as PEvent } from "@prisma/client";
import prisma from "./prisma";
import { ISearchQ, INewEventSrcData, IEvent } from "@/lib/types";
import { venuesApi } from "./venues";

const sampleEvent: PEvent = {
  date: new Date(Date.now()),
  eventType: "sample",
  id: "sampleId",
  performers: ["guest", "main"],
  startHour: new Date(Date.now()),
  title: "sample title",
  venueId: "venueSampleId",
  eventSpecs: null,
};

const getEvent = async (eventId: string): Promise<PEvent> => {
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
): Promise<PEvent[]> => {
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

const createEvent = async (src: INewEventSrcData): Promise<PEvent> => {
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
