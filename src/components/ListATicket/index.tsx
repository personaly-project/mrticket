import { useEventPool } from "@/lib/hooks/useEventPool";
import { INewTicketSrcData } from "@/lib/types";
import TicketPage from "@/pages/ticket/[ticket]";
import { Event as PEvent, Ticket, Venue } from "@prisma/client";
import { debug } from "console";
import { useRouter } from "next/router";
import React, { useCallback, useState } from "react";
import EventSelector from "./EventSelector/EventSelector";
import MainForm from "./MainForm";
import Step from "./Step";
import VenueSelector from "./VenueSelector/VenueSelector";

const STEPS = ["venue", "event", "ticket", "confirmation"];

interface IProps {
  venues: Venue[];
}

const ListATicket: React.FC<IProps> = ({ venues }) => {
  const router = useRouter();

  const [venue, setVenue] = useState<Venue | null>(null);
  const {
    eventPool,
    loading: isEventPoolLoading,
    error: eventPoolError,
  } = useEventPool(venue);
  const [event, setEvent] = useState<PEvent | null>(null);
  const [ticket, setTicket] = useState<INewTicketSrcData | null>(null);

  const resetVenue = () => {
    setVenue(null);
  };

  const resetEvent = () => {
    setEvent(null);
  };

  const onSubmitVenue = (venue: Venue) => {
    setVenue(venue);
  };

  const onSubmitEvent = (event: PEvent) => {
    setEvent(event);
  };

  const onTicketConfirmed = (ticket: Ticket) => {
    router.push(`/tickets/${ticket.id}`);
  };

  const ticketStep = (target: number) => (
    <Step next={() => {}} tittle={STEPS[target]}>
      {" "}
      <div>ticket</div>{" "}
    </Step>
  );
  const confirmationStep = (target: number) => (
    <Step next={() => {}} tittle={STEPS[target]}>
      {" "}
      <div>confirmation</div>{" "}
    </Step>
  );

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
            onSubmitEvent={onSubmitEvent} //{(event) => console.log(event)}
            reset={() => {}}
          />
        );
      if (eventPoolError) return <div>Error!</div>;
    }
    // if(!ticket)return <>Ticket Placeholder</>
    return <div>Step Placeholder</div>;
  }

  return (
    <div className="p-4 rounded-md shadow">
      <h1 className="text-xl font-semibold"> List a ticket </h1>
      <MainForm tittle={"Title Placeholder"}>{displayStep()}</MainForm>
      <button
        onClick={() => {}}
        className="p-2 bg-blue-600 rounded-md shadow text-white w-32 self-end"
      >
        Next
      </button>
    </div>
  );
};

export default ListATicket;
