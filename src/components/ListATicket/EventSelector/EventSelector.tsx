import React, { useEffect, useState, useCallback } from 'react'
import { useSelector } from '@/lib/hooks'
import { Event as PEvent } from '@prisma/client'
import EventsList from './EventsList'
import CreateEventFrom from './CreateEventFrom'

interface IProps {
    eventsPool: PEvent[],
    venueID: string,
    onSubmitEvent: (event: PEvent, venueID: string) => void,
    reset: () => void
}

const EventSelector: React.FC<IProps> = ({ eventsPool, onSubmitEvent, venueID }) => {

    const [event, selectFromExisting, makeNew, toggleMakeNew] = useSelector(eventsPool)
    const [confirmed, setConfirmed] = useState<boolean>(false)

    useEffect(() => {
        if (!event) {
            setConfirmed(false)
        }
    }, [event])

    const onExistingConfirmed = useCallback(() => {
        if (event) {
            setConfirmed(true)
            onSubmitEvent(event, venueID)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [event])

    return (
        <div>
            {
                event ? (
                    <>
                        <h3> Selected: {event.title} {confirmed ? "Confirmed" : null} </h3>
                        <div className='flex flex-row items-center justify-around' >
                            <button onClick={toggleMakeNew} className='m-4 p-4 bg-red-500 rounded-md shadow text-white' >
                                Reset
                            </button>
                            <button onClick={onExistingConfirmed} className='m-4 p-4 bg-blue-500 rounded-md shadow text-white' >
                                confirm
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <button onClick={toggleMakeNew} className='m-4 p-4 bg-blue-500 rounded-md shadow text-white' >
                            {
                                makeNew ? "Use existing" : "Make new"
                            }
                        </button>
                        {
                            makeNew ? (
                                <CreateEventFrom onSubmit={onSubmitEvent} venueId={venueID} />
                            ) : (
                                <EventsList eventsPool={eventsPool} onSelection={selectFromExisting} />
                            )
                        }
                    </>
                )
            }
        </div>
    )
}

export default EventSelector