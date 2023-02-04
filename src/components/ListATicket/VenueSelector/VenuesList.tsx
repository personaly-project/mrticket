import { Venue } from '@prisma/client'
import React from 'react'

interface IProps {
    venuesSrc: Venue[],
    onSelection: (target: number) => void,
}

const VenuesList: React.FC<IProps> = ({ venuesSrc, onSelection }) => {
    return (
        <div>
            {
                venuesSrc.map((venue, index) => <p className='my-2 cursor-pointer' onClick={() => onSelection(index)} key={venue.id} >{index + 1}- {venue.name} </p>)
            }
        </div>
    )
}

export default VenuesList