import { act, renderHook } from "@testing-library/react-hooks";
import { useCreateVenue } from "@/lib/hooks";
import { INewVenueSrcData } from "@/lib/types";

let sampleVenue: INewVenueSrcData
const SAMPLE_ADDRESS = "sample-address"
const SAMPLE_CITY = "sample-city"
const SAMPLE_COUNTRY = "sample-country"
const SAMPLE_PLACE_TYPE = "sample-country"
const SAMPLE_NAME = "sample-name"
const SAMPLE_STATE = "sample-state"
const SAMPLE_TIMEZONE = "sample-timezone"

describe("useCreate hook", () => {
    beforeEach(() => {
        sampleVenue = {
            address: SAMPLE_ADDRESS,
            city: SAMPLE_CITY,
            country: SAMPLE_COUNTRY,
            placeType: SAMPLE_PLACE_TYPE,
            name: SAMPLE_NAME,
            state: SAMPLE_STATE,
            timezone: SAMPLE_TIMEZONE,
            venueSpecs: null
        }
    })

    it("defaults to empty values", () => {
        const { result } = renderHook(() => useCreateVenue())
        const { address, city, country, name, placeType, state, timezone } = result.current
        expect(address).toEqual("")
        expect(city).toEqual("")
        expect(country).toEqual("")
        expect(name).toEqual("")
        expect(placeType).toEqual("")
        expect(state).toEqual("")
        expect(timezone).toEqual("")
    })

    it("updates the values", () => {
        const { result } = renderHook(() => useCreateVenue())
        const { updateAddress, updateCity, updateCountry, updateName, updatePlaceType, updateState, updateTimezone } = result.current

        act(() => updateAddress(SAMPLE_ADDRESS))
        act(() => updateCity(SAMPLE_CITY))
        act(() => updateCountry(SAMPLE_COUNTRY))
        act(() => updateName(SAMPLE_NAME))
        act(() => updatePlaceType(SAMPLE_PLACE_TYPE))
        act(() => updateState(SAMPLE_STATE))
        act(() => updateTimezone(SAMPLE_TIMEZONE))

        const { address, city, country, name, placeType, state, timezone } = result.current
        expect(address).toEqual(SAMPLE_ADDRESS)
        expect(city).toEqual(SAMPLE_CITY)
        expect(country).toEqual(SAMPLE_COUNTRY)
        expect(name).toEqual(SAMPLE_NAME)
        expect(placeType).toEqual(SAMPLE_PLACE_TYPE)
        expect(state).toEqual(SAMPLE_STATE)
        expect(timezone).toEqual(SAMPLE_TIMEZONE)
    })

    describe("getVenue method", () => {
        it("returns null if an the venue data is incomplete", () => {
            const { result } = renderHook(() => useCreateVenue())
            const venue = result.current.getVenue()
            expect(venue).toBeNull()
        })
        it("returns the formatted venue src data when it is completed", () => {
            const { result } = renderHook(() => useCreateVenue())
            const { updateAddress, updateCity, updateCountry, updateName, updatePlaceType, updateState, updateTimezone, getVenue } = result.current

            act(() => updateAddress(SAMPLE_ADDRESS))
            act(() => updateCity(SAMPLE_CITY))
            act(() => updateCountry(SAMPLE_COUNTRY))
            act(() => updateName(SAMPLE_NAME))
            act(() => updatePlaceType(SAMPLE_PLACE_TYPE))
            act(() => updateState(SAMPLE_STATE))
            act(() => updateTimezone(SAMPLE_TIMEZONE))

            let venue: INewVenueSrcData | null

            act(() => { venue = result.current.getVenue() })

            expect(venue!).toEqual(sampleVenue)
        })
    })
})