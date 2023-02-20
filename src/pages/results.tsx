/** @format */

import { IVenue, IEvent, ITicket } from "@/lib/types";
import { getAllEvents } from "@/services/prisma/events";
import { getAllTickets } from "@/services/prisma/tickets";
import { getAllVenues } from "@/services/prisma/venues";
import { GetServerSideProps } from "next";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import logoWhite from "../../public/logoWhite.png";
import { AiOutlineMenu } from "react-icons/ai";
import { filterEventsBasedOnDate, filterObject } from "@/lib/searchFunction";

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
  const [tickets, setTickets] = useState<ITicket[]>(allTickets);
  useEffect(() => {
    const setTheTicketsToSearch = () => {
      const url = window.location.href;
      const params = url.split("?")[1];
      const param1 = params.split("=")[1];
      const param1Value = param1.split("-")[0];
      const param2 = params.split("from=")[1];
      const param2Value = param2.split("-to")[0];
      const param3 = params.split("=")[3];
      const param3Value = param3.split("-").join("-");

      const filteredTicketsByDate: any[] = filterEventsBasedOnDate(
        allEvents,
        allTickets,
        param2Value,
        param3Value
      );

      const objectToStructure = filteredTicketsByDate[0];
      console.log(filteredTicketsByDate, objectToStructure, param1Value);
      const filteredTickets = filterObject(
        filteredTicketsByDate,
        objectToStructure,
        param1Value
      );
      console.log(filteredTickets);
      setTickets(filteredTickets);
    };
    setTheTicketsToSearch();
  }, [allEvents, allTickets]);

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
        <div className="text-white text-center font-light text-xs">
          SEARCH RESULTS
        </div>
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
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const allVenues = await getAllVenues();
  const allEvents = await getAllEvents();
  const allTickets = await getAllTickets();

  return { props: { allVenues, allEvents, allTickets } };
};
