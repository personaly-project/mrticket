import { renderHook, act } from "@testing-library/react-hooks";
import { IEvent } from "@/lib/types";
import { Venue } from "@prisma/client";
import { useEventPool } from "@/lib/hooks";
import { server } from "./helpers/server"
import "whatwg-fetch"

let sampleVenueWithNoEvents: Venue
let sampleVenueWithEvents: Venue

beforeAll(() => server.listen())

afterAll(() => server.close())

describe("useEventPool hook", () => {
    beforeEach(() => {
        sampleVenueWithNoEvents = {
            id: "sampleID",
            address: "address",
            city: "city",
            country: "country",
            state: "state",
            timezone: "timezone",
            placeType: "placeType",
            name: "name",
            venueSpecs: null
        }
        sampleVenueWithEvents = {
            id: "15",
            address: "937 Halie Stravenue",
            city: "Sunrise Manor",
            country: "French Southern Territories",
            state: "Idaho",
            timezone: "America/Caracas",
            placeType: "nisi temporibus",
            name: "corrupti sit accusantium",
            venueSpecs: null
        }


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

