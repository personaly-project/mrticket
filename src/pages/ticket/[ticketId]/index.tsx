/** @format */

import { FC } from "react";
import { ITicket, IEvent, IVenue } from "@/lib/types";
import { venuesApi } from "@/services/prisma/venues";
import { eventsApi } from "@/services/prisma/events";
import { ticketsApi } from "@/services/prisma/tickets";
import { GetServerSideProps } from "next";
import Link from "next/link";

interface IPageProps {
  ticketData: ITicket;
  eventData: IEvent;
  venueData: IVenue;
}

const TicketPage: FC<IPageProps> = ({ ticketData, eventData, venueData }) => {
  return (
    <div className="bg-purple-dark font-anekbangla">
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
          <li className="font-bold">
            Event: {eventData.title} | Event Type: {eventData.eventType}{" "}
          </li>
          <li>
            When : {eventData.date.getDate()}/{eventData.date.getMonth()}/
            {eventData.date.getFullYear()} - {eventData.startHour}
          </li>
          <br />
          <li>
            Venue: {venueData.name} | Place Type: {venueData.placeType}{" "}
          </li>
          <li>
            Address: {venueData.address} {venueData.city} {venueData.state} |{" "}
            {venueData.country}{" "}
          </li>
          <br />

          <li>Performers: {eventData.performers} </li>
          <li>
            {" "}
            Price: ${ticketData.price}
            <Link href={`/ticket/${ticketData.id}/checkout`}>
              <button
                className="bg-yellow font-anekbangla font-bold"
                style={{
                  marginTop: "10px",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "none",
                }}
              >
                {" "}
                buy now{" "}
              </button>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

// This gets called on every request

export const getServerSideProps: GetServerSideProps = async (context) => {
  // Fetch data from external API
  try {
    const ticketData = await ticketsApi.getTicket(
      context.params!.ticketId as string
    );
    const eventData = await eventsApi.getEvent(ticketData.eventId);
    const venueData = await venuesApi.getVenue(eventData.venueId);

    // Pass data to the page via props
    return { props: { ticketData, eventData, venueData } };
  } catch (err) {
    return {
      notFound: true,
    };
  }
};

export default TicketPage;
