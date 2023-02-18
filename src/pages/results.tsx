/** @format */

import { IVenue, IEvent, ITicket } from "@/lib/types";
import { getAllEvents } from "@/services/prisma/events";
import { getAllTickets } from "@/services/prisma/tickets";
import { getAllVenues } from "@/services/prisma/venues";
import { GetServerSideProps } from "next";
import Link from "next/link";
import React, { useState } from "react";
interface IPageProps {
  allVenues: IVenue;
  allEvents: IEvent[];
  allTickets: ITicket[];
}
export default function Results({
  allVenues,
  allEvents,
  allTickets,
}: IPageProps) {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [tickets, setTickets] = useState<ITicket[]>(allTickets);
  const handleClick = () => {};
  return (
    <div>
      <ul style={{}}>
        {tickets.map((ticket: ITicket) => (
          <div
            key={ticket.id}
            style={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              height: "100px",
              padding: "0 1rem",
              color: "black",
              alignItems: "center",
            }}
          >
            <li
              key={ticket.id}
              style={{
                fontSize: "1.5rem",
                display: "flex",
                flexDirection: "column",

                color: "black",
              }}
            >
              {ticket.title} {ticket.price}
            </li>
            <li>
              <Link href={`/ticket/${ticket.id}`}>
                <button
                  style={{
                    marginTop: "1rem",
                    width: "6rem",
                    height: "3rem",
                    borderRadius: "5px",
                    marginRight: "1rem",
                    fontSize: "1rem",
                    padding: "0 1rem",
                    backgroundColor: "black",
                    color: "white",
                  }}
                >
                  Buy Now
                </button>
              </Link>
            </li>
          </div>
        ))}
      </ul>
      <button onClick={handleClick}>click me</button>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const allVenues = await getAllVenues();
  const allEvents = await getAllEvents();
  const allTickets = await getAllTickets();

  return { props: { allVenues, allEvents, allTickets } };
};
