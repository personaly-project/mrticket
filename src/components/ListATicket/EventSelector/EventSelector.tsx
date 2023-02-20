import React, { useEffect, useState, useCallback } from "react"
import { useSelector } from "@/lib/hooks"
import EventsList from "./EventsList"
import CreateEventFrom from "./CreateEventFrom"
import { IEvent } from "@/lib/types"

interface IProps {
  eventsPool: IEvent[]
  venueID: string
  onSubmitEvent: (event: IEvent, venueID: string) => void
  reset: () => void
}

const EventSelector: React.FC<IProps> = ({
  eventsPool,
  onSubmitEvent,
  venueID,
}) => {
  const [event, selectFromExisting, makeNew, toggleMakeNew] =
    useSelector(eventsPool)
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
    <div className="mx-10 font-latoSans">
      <h2
        className="font-bold 
              text-2xl
              text-purple-dark"
      >
        Please, select the event!
      </h2>

      {event ? (
        <>
          <h3>
            {" "}
            Selected: {event.title} {confirmed ? "Confirmed" : null}{" "}
          </h3>
          <div className="flex flex-row justify-between gap-4 p-4">
            <button
              onClick={toggleMakeNew}
              className="border-0 py-2 px-4 
                rounded-md shadow w-32 self-end  
                bg-purple-dark font-semibold text-white
                hover:bg-lightblue hover:text-danger"
            >
              Reset
            </button>
            <button
              onClick={onExistingConfirmed}
              className="border-0 py-2 px-4 
                rounded-md shadow w-50 
                bg-purple-medium  font-semibold text-white  
                hover:bg-yellow"
            >
              Confirm
            </button>
          </div>
        </>
      ) : (
        <>
          {makeNew ? (
            <CreateEventFrom onSubmit={onSubmitEvent} venueId={venueID} />
          ) : (
            <EventsList
              eventsPool={eventsPool}
              onSelection={selectFromExisting}
            />
          )}
          <button
            onClick={toggleMakeNew}
            className="border-0 py-2 px-4 
                rounded-md shadow w-50 mt-6 
                bg-purple-medium  font-semibold text-white  
                hover:bg-yellow"
          >
            {makeNew ? "Use existing" : "Make a New Event"}
          </button>
        </>
      )}
    </div>
  )
}

export default EventSelector
