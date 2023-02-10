/** @format */

import { prismaMock as prisma } from "../../../../singleton";
import { IEvent, INewEventSrcData } from "@/lib/types";

const sampleEventSrc: INewEventSrcData = {
  date: new Date(Date.now()),
  eventType: "sample",
  performers: ["guest", "main"],
  startHour: new Date(Date.now()),
  title: "sample title",
  venueId: "venueSampleId",
  eventSpecs: null,
};

const sampleEvent: IEvent = {
  date: new Date(Date.now()),
  eventType: "sample",
  id: "1",
  performers: ["guest", "main"],
  startHour: new Date(Date.now()),
  title: "sample title",
  venueId: "venueSampleId",
  eventSpecs: null,
};

describe("Event API", () => {
  test("should create a new event", async () => {
    prisma.event.create.mockResolvedValue(sampleEvent);

    await expect(
      prisma.event.create({ data: sampleEventSrc })
    ).resolves.toEqual(sampleEvent); //createEvent(sampleEventSrc)).resolves.toEqual(sampleEvent)

    test("should get an event by id", async () => {
      prisma.event.findUnique.mockResolvedValue(sampleEvent);
      await expect(
        prisma.event.findUnique({ where: { id: sampleEvent.id } })
      ).resolves.toEqual(sampleEvent);
    });
  });
});
