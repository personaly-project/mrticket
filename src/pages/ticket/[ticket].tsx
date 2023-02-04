import { venuesApi } from "@/services/prisma/venues"
import { eventsApi } from "@/services/prisma/events"
import { ticketsApi } from "@/services/prisma/tickets"

function Ticket({ ticketData, eventData, venueData }) {
  return <div>
    <ul>
      <li>Venue: {venueData.name} | Place Type: {venueData.placeType} </li>
      <li>Address: {venueData.address} {venueData.city} {venueData.state} | {venueData.country} </li>
      <br />
      <li>Event: {eventData.title} | Event Type: {eventData.eventType}  </li>
      <li>When : {eventData.date.toString()} @ {eventData.startHour.toTimeString()} </li>
      <li>Performers: {eventData.performers}  </li>


    </ul>
  </div>
}

// This gets called on every request

export async function getServerSideProps(context) {
  // Fetch data from external API
  const ticketData = await ticketsApi.getTicket(context.params.ticket)
  const eventData = await eventsApi.getEvent(ticketData.eventId)
  const venueData = await venuesApi.getVenue(eventData.venueId)

  // Pass data to the page via props
  return { props: { ticketData, eventData, venueData } }
}

export default Ticket

