import { Event as PEvent, Venue } from "@prisma/client";
import { useState, useEffect } from "react";

export function useEventPool(venue: Venue | null) {
    const [eventPool, setEventPool] = useState<PEvent[] | null>(null)
    const [isEventPoolLoading, setIsEventPoolLoading] = useState<boolean>(false)

    useEffect(() => {
        setIsEventPoolLoading(true)

        //async update event pool by fetching the events for the venue
    }, [venue])

    return [eventPool, isEventPoolLoading]
}