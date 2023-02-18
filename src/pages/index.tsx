/** @format */
import SearchFeature from "@/components/SearchFeataure"
import { ITicket, IEvent, IVenue } from "@/lib/types"
import { venuesApi, eventsApi, ticketsApi } from "@/services/prisma"
import { GetServerSideProps } from "next"
import Link from "next/link"
import { getAllVenues } from "@/services/prisma/venues"
import { getAllEvents } from "@/services/prisma/events"
import { getAllTickets } from "@/services/prisma/tickets"

interface IPageProps {
  allVenues: IVenue
  allEvents: IEvent[]
  allTickets: ITicket[]
}

export default function Home({ allVenues, allEvents, allTickets }: IPageProps) {
  return (
    <>
      <main className="pt-20" >
        <Link href={`/test`}>
          see ticket
        </Link>
      </main>
      <SearchFeature
        allvenues={allVenues}
        allevents={allEvents}
        alltickets={allTickets}
      />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const allVenues = await getAllVenues()
  const allEvents = await getAllEvents()
  const allTickets = await getAllTickets()

  return { props: { allVenues, allEvents, allTickets } }
}
