import { FC } from 'react'
import { Ticket, Event, Venue } from '@prisma/client'
import { venuesApi } from "@/services/prisma/venues"
import { eventsApi } from "@/services/prisma/events"
import { ticketsApi } from "@/services/prisma/tickets"
import { GetServerSideProps } from 'next'
import Link from 'next/link'

interface IPageProps {
  ticketData: Ticket,
  eventData: Event,
  venueData: Venue
}

const TicketPage: FC<IPageProps> = ({ ticketData, eventData, venueData }) => {
  return <div>
    <ul>
      <li> Ticket: {ticketData.title} </li>
      <li>Venue: {venueData.name} | Place Type: {venueData.placeType} </li>
      <li>Address: {venueData.address} {venueData.city} {venueData.state} | {venueData.country} </li>
      <br />
      <li>Event: {eventData.title} | Event Type: {eventData.eventType}  </li>
      <li>When : {eventData.date.toString()} @ {eventData.startHour.toTimeString()} </li>
      <li>Performers: {eventData.performers}  </li>
      <li> {ticketData.price} </li>

      <Link href={'/checkout'} >
        <p> Pay now </p>
      </Link>

    </ul>
  </div>
}

// This gets called on every request

export const getServerSideProps: GetServerSideProps = async (context) => {
  // Fetch data from external API
  const ticketData = await ticketsApi.getTicket(context.params!.ticket as string)
  const eventData = await eventsApi.getEvent(ticketData.eventId)
  const venueData = await venuesApi.getVenue(eventData.venueId)

  // Pass data to the page via props
  return { props: { ticketData, eventData, venueData } }
}

export default TicketPage

