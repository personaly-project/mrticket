import { authCtx } from "@/lib/context/Auth/authContext"
import { IEvent, INewTicketSrcData, ITicket, IVenue } from "@/lib/types"
import { FC, useEffect, useState, useContext } from "react"

interface IProps {
  venue: IVenue
  event: IEvent
  ticketSrc: INewTicketSrcData
  onTicketConfirmed: (ticket: ITicket) => void
}

const Confirmation: FC<IProps> = ({
  event,
  ticketSrc,
  venue,
  onTicketConfirmed,
}) => {

  const [confirmed, setConfirmed] = useState<boolean>(false)
  const { user } = useContext(authCtx)
  useEffect(() => {
    if (confirmed) {
      fetch(`api/user/${user!.id}/ticket`, {
        method: "POST",
        body: JSON.stringify(ticketSrc),
      })
        .then((res) => {
          if (res.ok) {
            return res.json()
          }
          throw new Error(res.statusText)
        })
        .then((parsed) => {
          onTicketConfirmed(parsed.data)
        })
        .catch((err) => {
          console.log(err)
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [confirmed])

  return (
    <div>
      <div>
        <h3>Where</h3>
        <p> {venue.placeType} </p>
        <p> {venue.name} </p>
        <p> {venue.address} </p>
        <p> {venue.city} </p>
        <p> {venue.state} </p>
        <p> {venue.country} </p>
      </div>
      <div>
        <h3>What and when</h3>
        <p> {event.title} </p>
        <p> {event.startHour} </p>
        <> {event.date} </>
        <p> {event.eventType} </p>
      </div>
      <div>
        <h3> Your offer </h3>
        <p> {ticketSrc.title} </p>
        <p> € {ticketSrc.price} </p>
      </div>
      <button
        className="bg-purple-dark text-white py-2 px-4"
        onClick={() => setConfirmed(true)}
      >
        Confirm
      </button>
    </div>
  )
}

export default Confirmation
