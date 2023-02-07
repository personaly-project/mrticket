import { eventsApi } from "./events";
import { ticketsApi } from "./tickets"
import { venuesApi } from "./venues";

const prismaService = {
    eventsApi,
    ticketsApi,
    venuesApi
}

export default prismaService

