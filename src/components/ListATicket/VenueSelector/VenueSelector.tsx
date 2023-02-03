import React, { useEffect, useState } from 'react'
import { Venue } from '@prisma/client'
import { useSelector } from '@/lib/hooks/useSelector'
import CreateVenueForm from './CreateVenueForm'
import VenuesList from './VenuesList'

interface IProps {
    venuesSrc: Venue[],
    onSubmitVenue: (venue: Venue) => void,
    reset: () => void
}

const VenueSelector: React.FC<IProps> = ({ venuesSrc, onSubmitVenue }) => {

    const [venue, selectFromExisting, makeNew, toggleMakeNew] = useSelector(venuesSrc)
    const [confirmed, setConfirmed] = useState<boolean>(false)

    useEffect(() => {
        if (!venue) {
            setConfirmed(false)
        }
    }, [venue])

    const onExistingConfirmed = () => {
        if (venue) {
            setConfirmed(true)
            onSubmitVenue(venue)
        }
    }

    return (
        <div>
            {
                venue ? (
                    <>
                        <h3> Selected: {venue.name} {confirmed ? "Confirmed" : null} </h3>
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
                                <CreateVenueForm onSubmit={onSubmitVenue} />
                            ) : (
                                <VenuesList venuesSrc={venuesSrc} onSelection={selectFromExisting} />
                            )
                        }
                    </>
                )
            }
        </div>
    )
}

export default VenueSelector