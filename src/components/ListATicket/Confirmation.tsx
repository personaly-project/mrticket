import { authCtx } from "@/lib/context/Auth/authContext"
import { IEvent, INewTicketSrcData, ITicket, IVenue } from "@/lib/types"
import { FC, useEffect, useState, useContext } from "react"
import { GrLocation } from "react-icons/gr"
import { BiTime } from "react-icons/bi"
import { HiOutlineTicket } from "react-icons/hi"
import moment from "moment"

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
    <div className="font-latoSans p-4">
      <div className="">
        <div className="flex gap-2 items-center font-bold text-2xl">
          <GrLocation size={25} />
          <h3>Where</h3>
        </div>
        <div className="px-9 space-y-1 pb-3">
          <p> {venue.placeType} </p>
          <p> {venue.name} </p>
          <p> {venue.address} </p>
          <p> {venue.city} </p>
          <p> {venue.state} </p>
          <p> {venue.country} </p>
        </div>
      </div>

      <div>
        <div className="flex gap-2 items-center font-bold text-2xl">
          <BiTime size={25} />
          <h3>What and when</h3>
        </div>
        <div className="px-9 space-y-1 pb-3">
          <p> {event.title} </p>
          <p> {event.eventType} </p>
          <p> {moment(event.date).format("Do - MMM YYYY, dddd @ hA")} </p>
        </div>
      </div>

      <div>
        <div className="flex gap-2 items-center font-bold text-2xl">
          <HiOutlineTicket size={25} />
          <h3> Your ticket </h3>
        </div>
        <div className="px-9 space-y-1 pb-3">
          <p> {ticketSrc.title} </p>
          <p> $ {ticketSrc.price} </p>
        </div>
      </div>
      <div className="flex justify-center">
        <button
          onClick={() => setConfirmed(true)}
          type="submit"
          className="
                items-center
                border-0 p-4
                rounded-md shadow w-32 
                bg-purple-medium  font-semibold text-white  
                hover:bg-yellow hover:grow"
        >
          Confirm
        </button>
      </div>
    </div>
  )
}

export default Confirmation
