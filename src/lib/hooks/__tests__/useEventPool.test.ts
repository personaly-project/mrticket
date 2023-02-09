import { renderHook, act } from "@testing-library/react-hooks";
import { IEvent } from "@/lib/types";
import { Venue } from "@prisma/client";
import { useEventPool } from "@/lib/hooks";
import { createServer } from "./helpers/server"
import "whatwg-fetch"
import { createGetHandler } from "./helpers/server-handlers";
import { SetupServerApi } from "msw/lib/node";
import { createRandomEvent, createRandomVenue } from "@/lib/utils";

let sampleVenueWithNoEvents: Venue
let sampleVenueWithEvents: Venue
let server: SetupServerApi
let error: string

const generateEvents = (venueId: string, amount: number = 2): IEvent[] => {
    const events: IEvent[] = []
    for (let i = 0; i < amount; i++) {
        events.push({
            ...createRandomEvent(venueId),
            id: "event-id-1"
        })
    }
    return events
}

describe("useEventPool hook", () => {

    beforeEach(() => {

        sampleVenueWithEvents = { ...createRandomVenue(), id: "venue" }

        const successHandler = createGetHandler(`/api/venues/${sampleVenueWithEvents.id}/events`, {
            eventPool: generateEvents(sampleVenueWithEvents.id),

        })
        server = createServer([successHandler])
        server.listen()
    })

    afterEach(() => {
        if (server) server.close()
    })

    it("should default to undefined eventPool and error and loading to true while is fetching the eventPool for the venue", () => {
        const { result, unmount } = renderHook(() => useEventPool(sampleVenueWithEvents))
        const { error, eventPool, loading } = result.current
        expect(error).toBeUndefined()
        expect(eventPool).toBeUndefined()
        expect(loading).toEqual(true)
        unmount()
    })

    it("should get the eventPool for the given venue and set the loading flag to false", async () => {
        const { result, waitForNextUpdate, unmount } = renderHook(() => useEventPool(sampleVenueWithEvents))
        await waitForNextUpdate()
        expect(result.current.eventPool).toBeDefined()
        expect(result.current.eventPool).toHaveLength(2)
        expect(result.current.loading).toEqual(false)
        expect(result.current.error).toBeUndefined()
        unmount()
    })

    describe("on request error", () => {
        beforeEach(() => {
            if (server) {
                server.close()
            }
            error = "not found"
            sampleVenueWithNoEvents = { ...createRandomVenue(), id: "venue" }
            const failedHandler = createGetHandler(`/api/venues/${sampleVenueWithEvents.id}/events`, {
                error
            }, 404)
            server = createServer([failedHandler])
            server.listen()
        })

        afterEach(() => {
            if (server) server.close()
        })

        it("should set the error obtained from the response and an empty array for the event pool", async () => {
            const { result, waitForNextUpdate, unmount } = renderHook(() => useEventPool(sampleVenueWithNoEvents))
            await waitForNextUpdate()
            expect(result.current.eventPool).toBeDefined()
            expect(result.current.eventPool).toHaveLength(0)
            expect(result.current.loading).toEqual(false)
            expect(result.current.error).toEqual(error)
        })
    })
})

