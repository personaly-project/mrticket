import { Event as PEvent } from '@prisma/client'
import React from 'react'

interface IProps {
    eventsPool: PEvent[],
    onSelection: (target: number) => void
}

const EventsList: React.FC<IProps> = ({ eventsPool, onSelection }) => {
    return (
        <div>
            {
                eventsPool.map((event, index) => {
                    return <p className='my-2 cursor-pointer' onClick={() => onSelection(index)} key={event.id} >{index + 1} - {event.title} </p>
                })
            }
        </div>
    )
}

export default EventsList