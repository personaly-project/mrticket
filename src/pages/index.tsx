/** @format */
import Hero from "@/components/Hero";
import { IEvent, ITicket, IVenue } from "@/lib/types";
import { getAllEvents } from "@/services/prisma/events";
import { getAllTickets } from "@/services/prisma/tickets";
import { getAllVenues } from "@/services/prisma/venues";
import { GetServerSideProps } from "next";

interface IPageProps {
  allVenues: IVenue;
  allEvents: IEvent[];
  allTickets: ITicket[];
}

export default function Home({ allVenues, allEvents, allTickets }: IPageProps) {
  return (
    <>
      <main>
        <Hero />
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const allVenues = await getAllVenues();
  const allEvents = await getAllEvents();
  const allTickets = await getAllTickets();

  return { props: { allVenues, allEvents, allTickets } };
};

// <Link href={`/ticket/05c4af58-389d-408b-a017-6725d4b97766`}>
// see ticket
// </Link>
