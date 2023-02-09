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

const TARGET_ID_WITH_EVENTS = "withEvents"
const TARGET_ID_WITH_NO_EVENTS = "withNoEvents"


beforeAll(() => {

    sampleVenueWithNoEvents = { ...createRandomVenue(), id: "1" }

    sampleVenueWithEvents = { ...createRandomVenue(), id: "2" }

    const successHandler = createGetHandler(`/api/venues/${TARGET_ID_WITH_EVENTS}/events`, sampleVenueWithEvents)
    const server = createServer([successHandler])
    server.listen()
})

afterAll(() => {
    if (server) server.close()
})

describe("useEventPool hook", () => {
    beforeEach(() => {



    })

    it("initialize the eventPool based on the venue passed", async () => {
        const { result, waitForNextUpdate } = renderHook(() => useEventPool(sampleVenueWithEvents))
        const [pool, loadingState] = result.current
        console.log(pool)
        expect(pool).toBeNull()
        await waitForNextUpdate()
        expect(result.current[0]).toBeTruthy()
    })
})

