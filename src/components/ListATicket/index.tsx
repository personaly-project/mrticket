import { useEventPool } from '@/lib/hooks/useEventPool'
import { INewTicketSrcData } from '@/lib/types'
import { Event as PEvent, Ticket, Venue } from '@prisma/client'
import { useRouter } from 'next/router'
import React, { useCallback, useState } from 'react'
import MainForm from './MainForm'
import Step from './Step'
import VenueSelector from './VenueSelector/VenueSelector'

const STEPS = ["venue", "event", "ticket", "confirmation"]

interface IProps {
    venues: Venue[]
}

const ListATicket: React.FC<IProps> = ({ venues }) => {
    const router = useRouter()

    const [venue, setVenue] = useState<Venue | null>(null)
    const eventPool = useEventPool(venue)
    const [event, setEvent] = useState<PEvent | null>(null)
    const [ticket, setTicket] = useState<INewTicketSrcData | null>(null)
    const [step, setStep] = useState<number>(0)

    const onTicketConfirmed = (ticket: Ticket) => {
        router.push(`/tickets/${ticket.id}`)
    }

    const resetVenue = () => {
        setVenue(null)
    }

    const nextStep = () => {
        setStep(prev => {
            if (prev >= STEPS.length) return STEPS.length
            return prev + 1
        })
    }

    const venueStep = (target: number) => <Step next={() => { if (venue) nextStep() }} tittle={STEPS[target]} > <VenueSelector onSubmitVenue={(venue) => setVenue(venue)} reset={resetVenue} venuesSrc={venues} /> </Step>

    const eventStep = useCallback((target: number) => {
        return (
            <Step next={nextStep} tittle={STEPS[target]} >
                <div>events</div>
            </Step>
        )
    }, [eventPool])

    const ticketStep = (target: number) => <Step next={nextStep} tittle={STEPS[target]}> <div>ticket</div> </Step>
    const confirmationStep = (target: number) => <Step next={nextStep} tittle={STEPS[target]}> <div>confirmation</div> </Step>

    const steps = [venueStep(0), eventStep(1), ticketStep(2), confirmationStep(3)]

    return (
        <div className='p-4 rounded-md shadow' >
            <h1 className='text-xl font-semibold' > List a ticket </h1>
            <MainForm tittle={STEPS[step]} >
                {steps[step]}
            </MainForm>
        </div>
    )
}

export default ListATicket