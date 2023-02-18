/** @format */

import { IVenue, IEvent, ITicket } from "@/lib/types";
import { getAllEvents } from "@/services/prisma/events";
import { getAllTickets } from "@/services/prisma/tickets";
import { getAllVenues } from "@/services/prisma/venues";
import { GetServerSideProps } from "next";
import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import logoWhite from "../../public/logoWhite.png";
import { AiOutlineMenu } from "react-icons/ai";

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
    <div className="h-100%">
      {/* small banner */}
      <div className="flex flex-col text-center place-items-center mt-10 mb-6 gap-3 ">
        <Image src={logoWhite} alt="" width={90} />
        <h1 className="text-yellow font-medium text-2xl tracking-wide">
          Mister Ticket. The Best City Events.
        </h1>
      </div>

      {/* filters */}
      <div className="flex flex-row items-center gap-3">
        <div className="flex flex-row items-center my-4">
          <button className="bg-[#9187F4] border-0 text-white rounded-full p-1 px-4 mr-2 font-medium flex flex-row gap-1 items-center">
            FILTERS
            <AiOutlineMenu size={15} />
          </button>
        </div>
        <h2 className="text-white text-center font-light text-xs">
          SEARCH RESULTS
        </h2>
      </div>

      {/* list */}
      <div className="bg-white rounded-2xl p-2">
        <ul className=" " style={{}}>
          {tickets.map((ticket: ITicket) => (
            <div
              className="bg-[#f1f1f1] justify-between p-4 items-center h-20 rounded-2xl flex flex-row m-3 w-100%"
              key={ticket.id}
            >
              <li className="text-sm flex flex-col font-medium" key={ticket.id}>
                <p className="font-bold">{ticket.title}</p>
                <p className="font-light"> {ticket.price}€</p>
              </li>
              <li>
                <Link href={`/ticket/${ticket.id}`}>
                  <button className="text-sm bg-purple-medium text-whitehover:shadow-lg border-0 text-white rounded-full p-1 px-4 mr-2 font-medium ">
                    More Info +
                  </button>
                </Link>
              </li>
            </div>
          ))}
        </ul>
      </div>
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
