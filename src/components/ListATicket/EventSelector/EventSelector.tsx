import React, { useEffect, useState, useCallback } from 'react'
import { useSelector } from '@/lib/hooks'
import EventsList from './EventsList'
import CreateEventFrom from './CreateEventFrom'
import { IEvent } from '@/lib/types'

interface IProps {
    eventsPool: IEvent[],
    venueID: string,
    onSubmitEvent: (event: IEvent, venueID: string) => void,
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
        <div className='flex flex-col w-fit' >
            Select the event
            {
                event ? (
                    <>
                        <h3> Selected: {event.title} {confirmed ? "Confirmed" : null} </h3>
                        <div className='flex flex-row items-center my-4 gap-4' >
                            <button onClick={toggleMakeNew} className=' px-4 py-2 bg-danger rounded-md shadow text-white' >
                                Reset
                            </button>
                            <button onClick={onExistingConfirmed} className='px-4 py-2 bg-purple-dark rounded-md shadow text-white' >
                                confirm
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <button onClick={toggleMakeNew} className='my-4 px-4 py-2 bg-purple-dark rounded-md shadow text-white' >
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