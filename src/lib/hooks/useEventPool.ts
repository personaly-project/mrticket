import { Venue } from "@prisma/client";
import { useState, useEffect } from "react";
import { IEvent } from "../types";

interface IEventPoolData {
    eventPool?: IEvent[] | undefined;
    error?: undefined | any;
    loading: boolean;
};

export function useEventPool(venue: Venue | null): IEventPoolData {
    const [eventPoolData, setEventPoolData] = useState<IEventPoolData>({
        loading: false,
    });

    useEffect(() => {
        if (!venue) return;
        setEventPoolData({ loading: true });
        fetch(`/api/venues/${venue.id}/events`, {
            method: "GET",
            headers: {
                accept: "application/json",
            },
        })
            .then((resp) => resp.json())
            .then((parsed) => {
                if (parsed.error) {
                    setEventPoolData({
                        eventPool: [],
                        loading: false,
                        error: parsed.error
                    })
                } else {
                    setEventPoolData({
                        eventPool: parsed.data,
                        loading: false,
                        error: parsed.error,
                    });
                }

            })
            .catch((err) => {
                setEventPoolData({ eventPool: [], loading: false, error: err })
            });
    }, [venue]);

    return eventPoolData;
}
