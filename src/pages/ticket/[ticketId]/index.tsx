/** @format */

import { FC, useContext } from "react";
import { ITicket, IEvent, IVenue } from "@/lib/types";
import { venuesApi } from "@/services/prisma/venues";
import { eventsApi } from "@/services/prisma/events";
import { ticketsApi } from "@/services/prisma/tickets";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { authCtx } from "@/lib/context/Auth/authContext";
import { AiOutlineCalendar } from "react-icons/ai";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { TbBuildingPavilon } from "react-icons/tb";
import { GrLocation } from "react-icons/gr";
import { GiMicrophone } from "react-icons/gi";

interface IPageProps {
  ticketData: ITicket;
  eventData: IEvent;
  venueData: IVenue;
}

const TicketPage: FC<IPageProps> = ({ ticketData, eventData, venueData }) => {
  const { user } = useContext(authCtx);

  return (
    // {/* title */}
    <div className="bg-purple-dark flex h-screen">
      <div className="m-auto ">
        <ul className="flex flex-col bg-white rounded-2xl p-8 text-start ">
          <li className="font-extrabold text-2xl uppercase tracking-wide">
            {eventData.title}
          </li>
          <li className="flex flex-row gap-2 items-center font-bold text-xl uppercase tracking-wide">
            <AiOutlineCalendar size={25} />
            {eventData.date.getDate()}/{eventData.date.getMonth()}/
            {eventData.date.getFullYear()} - {eventData.startHour}
          </li>
          <li className="font-medium text-sm uppercase tracking-wide">
            {eventData.eventType}{" "}
          </li>
          <br />

          {/* more details */}
          <div className="flex flex-row items-center gap-2 pt-2">
            <p className="underline font-semibold">More details </p>
            <MdOutlineDriveFileRenameOutline size={20} />
          </div>

          <li className="pl-4 flex flex-row items-end gap-2 pt-2">
            <TbBuildingPavilon size={25} />
            {venueData.name} | {venueData.placeType}
          </li>
          <li className="pl-4 flex flex-row items-end gap-2 pt-2">
            <GrLocation size={25} />
            {venueData.address} {venueData.city} {venueData.state} |{" "}
            {venueData.country}{" "}
          </li>
          <li className="pl-4 flex flex-row items-end gap-2 pt-2">
            <GiMicrophone size={25} />
            {eventData.performers}
          </li>

          {/* price */}
          <li className="flex justify-end">
            <div className="flex flex-col gap-2">
              <div className=" flex justify-end text-lg font-medium ">
                $ {ticketData.price}
              </div>
              {user?.id !== ticketData.sellerId ? (
                <Link href={`/ticket/${ticketData.id}/checkout`}>
                  <button className="bg-yellow font-bold mt-2 p-2 rounded-md border-0">
                    Buy Now
                  </button>
                </Link>
              ) : null}
            </div>
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
    console.error(err);
    return {
      notFound: true,
    };
  }
};

export default TicketPage;
