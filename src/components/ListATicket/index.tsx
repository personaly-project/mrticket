import { useEventPool } from "@/lib/hooks/useEventPool"
import { IVenue, ITicket, IEvent, INewTicketSrcData } from "@/lib/types"
import { useRouter } from "next/router"
import React, { useContext, useState } from "react"
import EventSelector from "./EventSelector/EventSelector"
import CreateTicketForm from "./TicketCreator/CreateTicketForm"
import VenueSelector from "./VenueSelector/VenueSelector"
import Confirmation from "./Confirmation"
import NavigationCircles from "../ui/NavigationCircles"
import { authCtx } from "@/lib/context/Auth/authContext"

interface IProps {
  venues: IVenue[]
}

const steps = [
  { name: "Venue", href: "#", status: "upcoming" },
  { name: "Event", href: "#", status: "upcoming" },
  { name: "Ticket", href: "#", status: "upcoming" },
  { name: "Review", href: "#", status: "upcoming" },
]

const ListATicket: React.FC<IProps> = ({ venues }) => {
  const router = useRouter()

  const [venue, setVenue] = useState<IVenue | null>(null)
  const [file, setFile] = useState<File[]>([])
  const { user } = useContext(authCtx)

  const {
    eventPool,
    loading: isEventPoolLoading,
    error: eventPoolError,
  } = useEventPool(venue)
  const [event, setEvent] = useState<IEvent | null>(null)
  const [ticket, setTicket] = useState<INewTicketSrcData | null>(null)

  const resetVenue = () => {
    setVenue(null)
  }

  const resetEvent = () => {
    setEvent(null)
  }

  const resetTicket = () => {
    setTicket(null)
  }

  const onSubmitVenue = (venue: IVenue) => {
    setVenue(venue)
  }

  const onSubmitEvent = (event: IEvent) => {
    setEvent(event)
  }

  const onSubmitTicket = (ticket: INewTicketSrcData) => {
    setTicket(ticket)
  }
  const onTicketConfirmed = async (ticket: ITicket) => {
    if (file[0]) {
      const data = new FormData();
      data.append("image", file[0]);
      data.append("ticketId", ticket.id);
      const resp = await fetch(`/api/user/${user?.id}/ticket/images`, {
        method: "POST",
        body: data,
      });
      console.log(resp.ok)
      router.push(`/ticket/${ticket.id}`)
    }
  }

  function evaluateStepNumber() {
    if (!venue) return 0
    if (!event) return 1
    if (event && !ticket) return 2
    if (ticket) return 3
    return 0
  }

  function displayStep() {
    if (stepNumber === 0)
      return (
        <VenueSelector
          onSubmitVenue={onSubmitVenue}
          reset={resetVenue}
          venuesSrc={venues}
        />
      )
    if (stepNumber === 1) {
      if (isEventPoolLoading) return <>Loading...</>
      if (eventPool)
        return (
          <EventSelector
            venueID={venue!.id}
            eventsPool={eventPool}
            onSubmitEvent={onSubmitEvent}
            reset={resetEvent}
          />
        )
      if (eventPoolError) return <div>Error!</div>
    }
    if (stepNumber === 2)
      return (
        <CreateTicketForm
          onImageUploaded={(file) => setFile([file])}
          eventId={event!.id}
          onSubmit={onSubmitTicket}
          reset={resetTicket}
        />
      )
    if (stepNumber === 3)
      return (
        <Confirmation
          event={event!}
          onTicketConfirmed={onTicketConfirmed}
          ticketSrc={ticket!}
          venue={venue!}
        />
      )
    return null
  }
  const stepNumber = evaluateStepNumber()
  return (
    <>
      <div
        className=" bg-purple-dark font-latoSans"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          paddingTop: "80px",
        }}
      >
        <ul
          className=" bg-white flex flex-col justify-center p-5"
          style={{
            borderRadius: "10px",
            wordBreak: "break-word",
            overflow: "auto",
          }}
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl">
              <h1
                className="
              font-extrabold
              text-3xl
              text-purple-dark"
              >
                {" "}
                Sell a Ticket{" "}
              </h1>
            </div>
          </div>

          <NavigationCircles
            currentStepIndex={stepNumber}
            numberOfSteps={steps.length}
          />
          {displayStep()}
        </ul>
      </div>
    </>
  )
}

export default ListATicket
