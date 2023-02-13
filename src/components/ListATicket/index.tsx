import { useEventPool } from "@/lib/hooks/useEventPool";
import { IVenue, ITicket, IEvent, INewTicketSrcData } from "@/lib/types";
import { useRouter } from "next/router";
import React, { useState } from "react";
import EventSelector from "./EventSelector/EventSelector";
import CreateTicketForm from "./TicketCreator/CreateTicketForm";
import VenueSelector from "./VenueSelector/VenueSelector";
import Confirmation from "./Confirmation";

interface IProps {
  venues: IVenue[];
}

const ListATicket: React.FC<IProps> = ({ venues }) => {
  const router = useRouter();

  const [venue, setVenue] = useState<IVenue | null>(null);
  const {
    eventPool,
    loading: isEventPoolLoading,
    error: eventPoolError,
  } = useEventPool(venue);
  const [event, setEvent] = useState<IEvent | null>(null);
  const [ticket, setTicket] = useState<INewTicketSrcData | null>(null)

  const resetVenue = () => {
    setVenue(null);
  };

  const resetEvent = () => {
    setEvent(null);
  };

  const onSubmitVenue = (venue: IVenue) => {
    setVenue(venue);
  };

  const onSubmitEvent = (event: IEvent) => {
    console.log(event)
    setEvent(event);
  };

  const onSubmitTicket = (ticket: INewTicketSrcData) => {
    setTicket(ticket)
  }
  const onTicketConfirmed = (ticket: ITicket) => {
    router.push(`/ticket/${ticket.id}`);
  };

  function displayStep() {
    if (!venue)
      return (
        <VenueSelector
          onSubmitVenue={onSubmitVenue}
          reset={resetVenue}
          venuesSrc={venues}
        />
      );
    if (!event) {
      if (isEventPoolLoading) return <>Loading...</>;
      if (eventPool)
        return (
          <EventSelector
            venueID={venue.id}
            eventsPool={eventPool}
            onSubmitEvent={onSubmitEvent}
            reset={resetEvent}
          />
        );
      if (eventPoolError) return <div>Error!</div>;
    }
    if (event && !ticket) return <CreateTicketForm eventId={event.id} onSubmit={onSubmitTicket} />
    else if (ticket) return <Confirmation event={event!} onTicketConfirmed={onTicketConfirmed} ticketSrc={ticket} venue={venue} />
    return null
  }

  return (
    <div className="p-4 rounded-md shadow mt-20">
      <h1 className="text-xl font-semibold"> List a ticket </h1>
      {displayStep()}
    </div>
  );
};

export default ListATicket;
