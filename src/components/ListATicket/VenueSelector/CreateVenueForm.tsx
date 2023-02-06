import React, { useEffect, useState } from 'react'
import { Venue } from '@prisma/client'
import { useCreateVenue } from '@/lib/hooks'
import Input from '@/components/ui/Input'

interface IProps {
    onSubmit: (venue: Venue) => void
}

const CreateVenueForm: React.FC<IProps> = ({ onSubmit }) => {

    const [loading, setIsLoading] = useState<boolean>(false)

    const {
        address,
        city,
        country,
        name,
        placeType,
        state,
        timezone,
        updateAddress,
        updateCity,
        updateCountry,
        updateName,
        updatePlaceType,
        updateState,
        updateTimezone,
        getVenue
    } = useCreateVenue()

    const onVenueSubmitted = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const venueSrc = getVenue()
        if (venueSrc) {
            setIsLoading(true)
        }
    }

    useEffect(() => {
        const venueSrc = getVenue()
        if (loading && venueSrc) {
            fetch('/api/tickets', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(venueSrc)
            })
                .then(resp => resp.json())
                .then(venue => {
                    onSubmit(venue)
                    setIsLoading(false)
                })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading])

    return (
        <div className='shadow rounded p-4' >
            <h3 className='text-lg font-semibold my-2 border-b border-b-slate-200' > Create a venue </h3>
            <form className='space-y-2' onSubmit={onVenueSubmitted} >
                <Input title="Name" placeholder='Venue name' listener={updateName} value={name} />
                <Input title="Address" placeholder='Venue address' listener={updateAddress} value={address} />
                <Input title='City' placeholder='Venue city' listener={updateCity} value={city} />
                <Input title='State' placeholder='Venue state' listener={updateState} value={state} />
                <Input title='Country' placeholder='Venue country' listener={updateCountry} value={country} />
                <Input title='Timezone' placeholder='Venue timezone' listener={updateTimezone} value={timezone} />
                <Input title='Place type' placeholder='Venue type' listener={updatePlaceType} value={placeType} />
                {
                    loading ? <p> Loading </p> : (
                        <>
                            <button type='submit' className='p-2 bg-blue-600 rounded-md shadow text-white w-32 self-end'>
                                Submit
                            </button>
                            <button type='reset' className='p-2 bg-red-600 rounded-md shadow text-white w-32 self-end'>
                                Reset
                            </button>
                        </>
                    )
                }
            </form>
        </div>
    )
}

export default CreateVenueForm