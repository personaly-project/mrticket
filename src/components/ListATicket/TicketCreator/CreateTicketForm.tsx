import Input from '@/components/ui/Input'
import { authCtx } from '@/lib/context/Auth/authContext'
import { useCreateTicket } from '@/lib/hooks'
import { INewTicketSrcData } from '@/lib/types'
import React, { FC, useContext, useEffect, useState } from 'react'
import CurrencyInput from "react-currency-format"

interface IProps {
    onSubmit: (ticket: INewTicketSrcData) => void,
    eventId: string
}

const CreateTicketForm: FC<IProps> = ({ onSubmit, eventId }) => {
    const { user } = useContext(authCtx)
    const [loading, setIsLoading] = useState<boolean>(false)

    const {
        price,
        updatePrice,
        title,
        updateTitle,
        getTicketSrcData,
    } = useCreateTicket(eventId, user!.id)

    const onTicketSrcSubmitted = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const src = getTicketSrcData()
        if (src) {
            setIsLoading(true)
        }
    }

    useEffect(() => {
        const ticketSrc = getTicketSrcData()
        if (loading && ticketSrc) {
            onSubmit(ticketSrc)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading])

    return (
        <form className='my-2 shadow rounded p-4 w-fit' onSubmit={onTicketSrcSubmitted} >
            <h2 className='text-lg font-semibold mb-4' > Set your ticket details </h2>
            <Input listener={updateTitle} title={"Title"} placeholder={"Set a catchy selling tittle for your ticket"} value={title} required />
            <div className='' >
                <label htmlFor='price' > Price </label>
                <div className='w-96 flex flex-row'>
                    <input className='w-full mr-2' type="range" min={0} max={5000} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updatePrice(parseInt(e.target.value))} />
                    <p>€{price}</p>
                </div>
            </div>
            <div className="flex flex-row items-center justify-center gap-4 pt-4">
                <button
                    type="reset"
                    className="py-2 px-4 bg-danger rounded-md shadow text-white w-32 self-end"
                >
                    Reset
                </button>
                <button
                    type="submit"
                    className="py-2 px-4 bg-purple-medium rounded-md shadow text-white w-32 self-end"
                >
                    Submit
                </button>
            </div>
        </form>
    )
}

export default CreateTicketForm