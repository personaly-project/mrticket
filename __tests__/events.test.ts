/** @format */
import { PrismaClient, Ticket } from "@prisma/client";
import {
  jest,
  describe,
  test,
  expect,
  beforeAll,
  afterAll,
} from "@jest/globals";
import { INewTicketSrcData, ISearchQ } from "@/lib/types";

import { Server } from "http";
import { venuesApi } from "../src/services/prisma/venues";
import { eventsApi } from "../src/services/prisma/events";
import { AxiosInstance } from "axios";
import { ticketsApi } from "../src/services/prisma/tickets";

const prisma = new PrismaClient();
let server: Server;
let api: AxiosInstance;

// TICKET TESTS

describe("API", () => {
  describe("tickets", () => {
    test("Make a request for the info of 1 ticket", async () => {
      const ticket = await ticketsApi.getTicket(
        "04add0d7-8d6f-489a-8b4e-500992146db5"
      );
      expect(ticket).toHaveProperty("id");
      expect(ticket).toHaveProperty("title");
    });

    test("List a new ticket", async () => {
      const newTicket = await ticketsApi.createNewTicket({
        buyerEmail: "test@email.com",
        depositOn: "2021-09-01T00:00:00.000Z",
        imgs: ["testImgUrl_1", "testImgUrl_2"],
        price: 100,
        sold: false,
        ticket: "testTicketDownloadUrl",
        title: "testTicketTitle",
        eventId: "020258ec-2224-4591-a3ee-fd3a274c4c34",
      });
      expect(newTicket).toHaveProperty("id");
      expect(newTicket).toHaveProperty("title");
      expect(newTicket).toHaveProperty("price");
      expect(newTicket).toHaveProperty("sold");
      expect(newTicket).toHaveProperty("depositOn");
      expect(newTicket).toHaveProperty("eventId");
      expect(newTicket.sold).toEqual(false);
      expect(newTicket.price).toBe(100);
      expect(newTicket.title.length).toBeGreaterThan(0);
    });

    test("Sell a ticket", async () => {
      const SoldTicket = await ticketsApi.onTicketSold(
        "2e384380-b1c5-426d-afc0-ffd0c36ba8b3",
        "test@Email.com"
      );
      expect(SoldTicket).toHaveProperty("id");
      expect(SoldTicket).toHaveProperty("title");
      expect(SoldTicket).toHaveProperty("price");
      expect(SoldTicket).toHaveProperty("sold");
      expect(SoldTicket.sold).toEqual(true);
    });

    test("Get ticket by event", async () => {
      const getTicketByEvent = await ticketsApi.getTicketByEvent(
        "70f1e465-981e-4a3f-b37c-e6e1c45b459b"
      );
      expect(getTicketByEvent).toBeInstanceOf(Array);
      expect(getTicketByEvent[0].eventId).toEqual(
        "70f1e465-981e-4a3f-b37c-e6e1c45b459b"
      );
    });
    test("Search tickets", async () => {
      const searchTickets = await ticketsApi.searchTickets({
        target: "",
        value: "",
      });
      expect(searchTickets).toBeInstanceOf(Array);
      expect(searchTickets[0].price).toBe(false);
      expect(searchTickets[0].sold).toEqual(false);
      expect(searchTickets.length).toBe(0);
    });

    test("Search tickets by title", async () => {
      const searchTickets = await ticketsApi.searchTickets({
        target: "a sunt",
        value: "100",
      });
      expect(searchTickets).toBeInstanceOf(Array);
      expect(searchTickets[0].title).toEqual("testTicketTitle");
      expect(searchTickets[0].price).toBeLessThan(101);
      expect(searchTickets[0].sold).toEqual(false);
      expect(searchTickets.length).toBeGreaterThan(0);
    });
  });

  // EVENTS TESTS
  describe("venues", () => {
    test("Make a request for the info of 1 venue", async () => {
      const venue = await venuesApi.getVenue(
        "04add0d7-8d6f-489a-8b4e-500992146db5"
      );
      expect(venue).toHaveProperty("id");
      expect(venue).toHaveProperty("name");
    });
    test("List a new venue", async () => {
      const newVenue = await venuesApi.createVenue({
        placeType: "testPlaceType",
        address: "testAddress",
        city: "testCity",
        country: "testCountry",
        name: "testName",
        timezone: "testTimezone",
        state: "testState",
        venueSpecs: null,
      });
      expect(newVenue).toHaveProperty("id");
      expect(newVenue).toHaveProperty("name");
      expect(newVenue).toHaveProperty("address");
      expect(newVenue).toHaveProperty("city");
      expect(newVenue).toHaveProperty("state");
      expect(newVenue).toHaveProperty("country");
      expect(newVenue.name.length).toBeGreaterThan(0);
      expect(newVenue.address.length).toBeGreaterThan(0);
      expect(newVenue.city.length).toBeGreaterThan(0);
      expect(newVenue.state.length).toBeGreaterThan(0);
      expect(newVenue.country.length).toBeGreaterThan(0);
    });
    test("Search venues", async () => {
      const searchVenues = await venuesApi.getVenuesSearch({
        target: "",
        value: "",
      });
      expect(searchVenues).toBeInstanceOf(Array);
      expect(searchVenues[0].name).toEqual("testName");
      expect(searchVenues[0].address).toEqual("testAddress");
      expect(searchVenues[0].city).toEqual("testCity");
      expect(searchVenues[0].state).toEqual("testState");
      expect(searchVenues[0].country).toEqual("testCountry");
      expect(searchVenues.length).toBeGreaterThan(0);
    });
  });

  // EVENTS TESTS
  describe("events", () => {
    test("Make a request for the info of 1 event", async () => {
      const event = await eventsApi.getEvent(
        "04add0d7-8d6f-489a-8b4e-500992146db5"
      );
      expect(event).toHaveProperty("id");
      expect(event).toHaveProperty("name");
    });
    test("List a new event", async () => {
      const newEvent = await eventsApi.createEvent({
        title: "testEventTitle",
        eventType: "testEventType",
        venueId: "04add0d7-8d6f-489a-8b4e-500992146db5",
        performers: [],
        startHour: "12:00",
        date: "2020-12-12",
        description: "testDescription",
      });
      expect(newEvent).toHaveProperty("id");
      expect(newEvent).toHaveProperty("title");
      expect(newEvent).toHaveProperty("date");
      expect(newEvent).toHaveProperty("venueId");
      expect(newEvent.venueId.length).toBeGreaterThan(0);
      expect(newEvent.date).toContain("-");
      expect(newEvent.startHour).toContain(":");
    });
    test("Search events", async () => {
      const searchEvents = await eventsApi.getEventsSearch({
        target: "",
        value: "",
      });
      expect(searchEvents).toBeInstanceOf(Array);
      expect(searchEvents.length).toBeGreaterThan(0);
    });
    test("Get event by city", async () => {
      const getEventByCity = await eventsApi.getEventsOnCity("Spain", "Madrid");
      expect(getEventByCity).toBeInstanceOf(Array);
    });
  });
});
