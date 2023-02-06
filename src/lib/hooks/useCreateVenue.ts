import { useState } from "react"
import { INewVenueSrcData } from "../types"

export const useCreateVenue = () => {
    const [country, setCountry] = useState<string>("")
    const [city, setCity] = useState<string>("")
    const [state, setState] = useState<string>("")
    const [address, setAddress] = useState<string>("")
    const [name, setName] = useState<string>("")
    const [placeType, setPlaceTYpe] = useState<string>("")
    const [timezone, setTimezone] = useState<string>("")

    const updateCountry = (src: string) => {
        setCountry(src)
    }

    const updateAddress = (src: string) => {
        setAddress(src)
    }

    const updateCity = (src: string) => {
        setCity(src)
    }

    const updateName = (src: string) => {
        setName(src)
    }

    const updatePlaceType = (src: string) => {
        setPlaceTYpe(src)
    }

    const updateState = (src: string) => {
        setState(src)
    }

    const updateTimezone = (src: string) => {
        setTimezone(src)
    }

    const getVenue = (): INewVenueSrcData | null => {
        if (name && address && city && country && placeType && state && timezone) {
            return {
                name,
                address,
                city,
                country,
                placeType,
                state,
                timezone,
                venueSpecs: null
            }
        }
        return null
    }

    return {
        state,
        updateState,
        country,
        updateCountry,
        city,
        updateCity,
        name,
        updateName,
        placeType,
        updatePlaceType,
        address,
        updateAddress,
        timezone,
        updateTimezone,
        getVenue
    }

}