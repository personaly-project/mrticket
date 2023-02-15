/** @format */
import SearchFeature from "@/components/SearchFeataure";
import { ITicket, IEvent, IVenue } from "@/lib/types";
import { venuesApi } from "@/services/prisma";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { getAllEvents } from "@/services/prisma/events";
import { ticketsApi } from "@/services/prisma";

interface IPageProps {
  venueData: IVenue;
  allEvents: IEvent[];
  allTickets: ITicket[];
}

export default function Home({ venueData, allEvents, allTickets }: IPageProps) {
  return (
    <>
      <main>
        <Link href={`/ticket/05c4af58-389d-408b-a017-6725d4b97766`}>
          see ticket
        </Link>
      </main>
      <SearchFeature
        venuedata={venueData}
        allevents={allEvents}
        alltickets={allTickets}
      />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const venueData = await venuesApi.getAllVenues();

  const allEvents = await getAllEvents();
  const allTickets = await ticketsApi.getAllTickets();

  return { props: { venueData, allEvents, allTickets } };
};
