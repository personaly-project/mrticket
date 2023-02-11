/** @format */

import { FC } from "react";
import { Ticket, Event, Venue } from "@prisma/client";
import { venuesApi } from "@/services/prisma/venues";
import { eventsApi } from "@/services/prisma/events";
import { ticketsApi } from "@/services/prisma/tickets";
import { GetServerSideProps } from "next";
import Link from "next/link";

interface IPageProps {
  ticketData: Ticket;
  eventData: Event;
  venueData: Venue;
}

const TicketPage: FC<IPageProps> = ({ ticketData, eventData, venueData }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <ul
        style={{
          fontWeight: "bold",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",

          backgroundColor: "white",
          padding: "25px",
          borderRadius: "10px",
          fontKerning: "normal",
          wordBreak: "break-word",
          fontSize: "24px",
          boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
        }}
      >
        <li> Ticket: {ticketData.title} </li>
        <li>
          Venue: {venueData.name} | Place Type: {venueData.placeType}{" "}
        </li>
        <li>
          Address: {venueData.address} {venueData.city} {venueData.state} |{" "}
          {venueData.country}{" "}
        </li>
        <br />
        <li>
          Event: {eventData.title} | Event Type: {eventData.eventType}{" "}
        </li>
        <li>
          When : {eventData.date.toString()} @{" "}
          {eventData.startHour.toTimeString()}{" "}
        </li>
        <li>Performers: {eventData.performers} </li>
        <li> Price: ${ticketData.price} </li>

        <Link href={`/checkout?${ticketData.price}`}>
          <button
            style={{
              marginTop: "10px",
              backgroundColor: "green",
              color: "white",
              padding: "10px",
              borderRadius: "5px",
              border: "none",
            }}
          >
            {" "}
            Pay now{" "}
          </button>
        </Link>
      </ul>
    </div>
  );
};

// This gets called on every request

export const getServerSideProps: GetServerSideProps = async (context) => {
  // Fetch data from external API
  try {
    const ticketData = await ticketsApi.getTicket(
      context.params!.ticket as string
    );
    const eventData = await eventsApi.getEvent(ticketData.eventId);
    const venueData = await venuesApi.getVenue(eventData.venueId);


    // Pass data to the page via props
    return { props: { ticketData, eventData, venueData } };
  }
  catch (err) {
    return {
      notFound: true,
    }
  }

};

export default TicketPage;
