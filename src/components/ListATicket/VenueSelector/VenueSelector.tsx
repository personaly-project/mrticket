import React, { useCallback, useEffect, useState } from "react";
import { Venue } from "@prisma/client";
import { useSelector } from "@/lib/hooks";
import CreateVenueForm from "./CreateVenueForm";
import VenuesList from "./VenuesList";

interface IProps {
  venuesSrc: Venue[];
  onSubmitVenue: (venue: Venue) => void;
  reset: () => void;
}

const VenueSelector: React.FC<IProps> = ({ venuesSrc, onSubmitVenue }) => {
  const [venue, selectFromExisting, makeNew, toggleMakeNew] =
    useSelector(venuesSrc);
  const [confirmed, setConfirmed] = useState<boolean>(false);

  useEffect(() => {
    if (!venue) {
      setConfirmed(false);
    }
  }, [venue]);

  const onExistingConfirmed = useCallback(() => {
    if (venue) {
      setConfirmed(true);
      onSubmitVenue(venue);
    }
  }, [venue, onSubmitVenue]);

  return (
    <div className="mx-10 font-latoSans">
      <br />
      <div
        className="font-bold
              text-2xl
              text-purple-dark"
      >
        Please, choose a venue!
      </div>
      <br />
      {venue ? (
        <>
          <h3 className="my-10">
            Venue selected: {"  "}
            {venue.name} {confirmed ? "Confirmed" : null}
          </h3>

          <div className="flex flex-row justify-between gap-4 pt-4">
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
                rounded-md shadow w-32 self-end 
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
            <CreateVenueForm onSubmit={onSubmitVenue} />
          ) : (
            <VenuesList
              venuesSrc={venuesSrc}
              onSelection={selectFromExisting}
            />
          )}
          <button
            onClick={toggleMakeNew}
            className="border-0 py-2 px-4 
                rounded-md shadow w-50  
                bg-purple-medium  font-semibold text-white  
                hover:bg-yellow mt-6"
          >
            {makeNew ? "Use existing" : "Create New Venue"}
          </button>
        </>
      )}
    </div>
  );
};

export default VenueSelector;
