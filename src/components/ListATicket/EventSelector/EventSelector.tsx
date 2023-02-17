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
    <div className="mx-10">
      <h2>Select the event</h2>

      {event ? (
        <>
          <h3>
            {" "}
            Selected: {event.title} {confirmed ? "Confirmed" : null}{" "}
          </h3>
          <div className="flex flex-row items-center my-4 gap-4">
            <button
              onClick={toggleMakeNew}
              className=" px-4 py-2 rounded-md shadow bg-lightblue text-black hover:text-danger"
            >
              Reset
            </button>
            <button
              onClick={onExistingConfirmed}
              className="px-4 py-2 rounded-md shadow  bg-purple-light text-black hover:bg-yellow"
            >
              confirm
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
            className="my-4 px-4 py-2 rounded-md shadow bg-purple-light  text-black hover:bg-yellow"
          >
            {makeNew ? "Use existing" : "Make new"}
          </button>
        </>
      )}
    </div>
  )
}

export default EventSelector
