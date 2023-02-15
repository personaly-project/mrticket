/** @format */

import prisma from "./prisma"
import { IEvent, IVenue } from "@/lib/types"
import { INewVenueSrcData, ISearchQ } from "@/lib/types"
import { createRandomVenue } from "@/lib/utils"

const sampleVenue: IVenue = {
  ...createRandomVenue(),
  id: "sample-id",
  events: [],
}

const createVenue = async (src: INewVenueSrcData): Promise<IVenue> => {
  const venue = await prisma.venue.create({
    data: src,
  })
  return venue as IVenue
}

const getVenue = async (
  venueId: string
): Promise<
  IVenue & {
    events: IEvent[]
  }
> => {
  const venue = await prisma.venue.findUniqueOrThrow({
    where: {
      id: venueId,
    },
    include: {
      events: true,
    },
  })
  return venue as unknown as IVenue & { events: IEvent[] }
}

const getVenuesOnCity = async (
  city: string,
  country: string
): Promise<(IVenue & { events: IEvent[] })[]> => {
  const venues = await prisma.venue.findMany({
    where: {
      city: city,
      AND: {
        country: country,
      },
    },
    include: {
      events: true,
    },
  })
  return venues as unknown as (IVenue & { events: IEvent[] })[]
}

const getVenuesSearch = async (
  q: ISearchQ<string>
): Promise<(IVenue & { events: IEvent[] })[]> => {
  if (q.target === "id")
    throw new Error(
      "this is the wrong method to make a get by id req, refer to getEvent"
    )
  if (q.target in sampleVenue) {
    const venues = await prisma.venue.findMany({
      where: {
        [q.target]: q.value,
      },
      include: {
        events: true,
      },
    })
    return venues as unknown as (IVenue & { events: IEvent[] })[]
  }
  throw new Error(`${q.target} is not a valid property`)
}

export const getAllVenues = async (): Promise<IVenue[]> => {
  const venues = await prisma.venue.findMany({})
  return venues
}

export const venuesApi = {
  createVenue,
  getVenue,
  getVenuesOnCity,
  getVenuesSearch,
  getAllVenues,
}
