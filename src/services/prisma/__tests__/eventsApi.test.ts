import { prismaMock as prisma } from "../../../../singleton";
import { IEvent, INewEventSrcData } from "@/lib/types";
import { createRandomEvent } from "@/lib/utils";
import { eventsApi } from "../events";

const TEST_ID_VENUE = "sample-venue-id"
const TEST_ID_EVENT = "venue-sample-id"

const sampleEventSrc: INewEventSrcData = createRandomEvent(TEST_ID_VENUE)
const sampleEvent: IEvent = { ...createRandomEvent(TEST_ID_VENUE), id: TEST_ID_EVENT }

describe("eventsApi", () => {
    it("should create a new event", async () => {
        prisma.event.create.mockResolvedValueOnce(sampleEvent)
        await expect(eventsApi.createEvent(sampleEventSrc)).resolves.toEqual(sampleEvent) //createEvent(sampleEventSrc)).resolves.toEqual(sampleEvent)
    })
})