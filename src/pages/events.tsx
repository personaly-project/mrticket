import { FC, useEffect, useState } from "react";
import { Ticket, Event, Venue } from "@prisma/client";
import { venuesApi } from "@/services/prisma/venues";
import { eventsApi } from "@/services/prisma/events";
import { ticketsApi } from "@/services/prisma/tickets";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { ApiError } from "next/dist/server/api-utils";

interface IPageProps {
  ticketData: Ticket;
  eventData: Event;
  venueData: Venue;
}

function getEvents() {}
