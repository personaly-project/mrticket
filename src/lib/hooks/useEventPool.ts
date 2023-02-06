import { Event as PEvent, Venue } from "@prisma/client";
import { useState, useEffect } from "react";

export function useEventPool(venue: Venue | null): [PEvent[] | null, boolean,] {
    const [eventPool, setEventPool] = useState<PEvent[] | null>(null)
    const [isEventPoolLoading, setIsEventPoolLoading] = useState<boolean>(false)

    useEffect(() => {
        if (venue) {
            setIsEventPoolLoading(true)
            fetch(`/api/venues/${venue.id}/events`, {
                method: "GET",
                headers: {
                    "accept": "application/json"
                }
            })
                .then(resp => resp.json())
                .then(events => {
                    setEventPool(events.eventPool as PEvent[])
                    setIsEventPoolLoading(false)
                })
                .catch(err => console.log(err))
        }

    }, [venue])

    return [eventPool, isEventPoolLoading]
}