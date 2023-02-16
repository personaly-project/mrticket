import React, { useCallback, useEffect, useState } from "react"
import { Venue } from "@prisma/client"
import { useSelector } from "@/lib/hooks"
import CreateVenueForm from "./CreateVenueForm"
import VenuesList from "./VenuesList"

interface IProps {
  venuesSrc: Venue[]
  onSubmitVenue: (venue: Venue) => void
  reset: () => void
}

const VenueSelector: React.FC<IProps> = ({ venuesSrc, onSubmitVenue }) => {
  const [venue, selectFromExisting, makeNew, toggleMakeNew] =
    useSelector(venuesSrc)
  const [confirmed, setConfirmed] = useState<boolean>(false)

  useEffect(() => {
    if (!venue) {
      setConfirmed(false)
    }
  }, [venue])

  const onExistingConfirmed = useCallback(() => {
    if (venue) {
      setConfirmed(true)
      onSubmitVenue(venue)
    }
  }, [venue, onSubmitVenue])

  return (
    <div className="mx-10">
      <br />
      <h2 className=""> Choose a venue </h2>
      <br />
      {venue ? (
        <>
          <h3>
            Selected: {venue.name} {confirmed ? "Confirmed" : null}{" "}
          </h3>
          <div className="flex flex-row items-center my-4 gap-4">
            <button
              onClick={onExistingConfirmed}
              className="px-4 py-2 bg-purple-medium rounded-md shadow text-white"
            >
              Confirm
            </button>
            <button
              onClick={toggleMakeNew}
              className="px-4 py-2 mx-10 bg-purple-dark rounded-md shadow text-white"
            >
              Reset
            </button>
          </div>
        </>
      ) : (
        <>
          {makeNew ? (
            <CreateVenueForm onSubmit={onSubmitVenue} />
          ) : (
            <VenuesList
              venuesSrc={venuesSrc}
              onSelection={selectFromExisting}
            />
          )}
          <button
            onClick={toggleMakeNew}
            className="my-4 px-4 py-2 rounded-md shadow bg-purple-light  text-black hover:bg-yellow"
          >
            {makeNew ? "Use existing" : "Create new venue"}
          </button>
        </>
      )}
    </div>
  )
}

export default VenueSelector
