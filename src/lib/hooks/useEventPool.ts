import { Event as PEvent, Venue } from "@prisma/client";
import { useState, useEffect } from "react";

type EventPoolData = {
    eventPool: PEvent[] | undefined;
    error: undefined | any;
    loading: boolean;
};

export function useEventPool(venue: Venue | null): EventPoolData {
    const [eventPoolData, setEventPoolData] = useState({
        eventPool: undefined,
        loading: false,
        error: undefined,
    });

    useEffect(() => {
        if (!venue) return;
        setEventPoolData({ eventPool: undefined, loading: true, error: undefined });
        fetch(`/api/venues/${venue.id}/events`, {
            method: "GET",
            headers: {
                accept: "application/json",
            },
        })
            .then((resp) => resp.json())
            .then((events) => {
                setEventPoolData({
                    eventPool: events.eventPool,
                    loading: false,
                    error: undefined,
                });
            })
            .catch((err) =>
                setEventPoolData({ eventPool: undefined, loading: false, error: err })
            );
    }, [venue]);

    return eventPoolData;
}
