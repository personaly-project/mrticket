import { prismaMock as prisma } from "../../singleton";
import { IEvent, INewEventSrcData } from "@/lib/types";

const sampleEventSrc: INewEventSrcData = {
    date: new Date(Date.now()),
    eventType: "sample",
    performers: ["guest", "main"],
    startHour: new Date(Date.now()),
    title: "sample title",
    venueId: "venueSampleId",
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

test('should create a new event', async () => {

    prisma.event.create.mockResolvedValue(sampleEvent)

    await expect(prisma.event.create({ data: sampleEventSrc })).resolves.toEqual(sampleEvent) //createEvent(sampleEventSrc)).resolves.toEqual(sampleEvent)
})