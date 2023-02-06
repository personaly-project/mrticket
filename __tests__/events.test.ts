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
import { venuesApi } from "@/services/prisma/venues";
// import { eventsApi } from "@/services/prisma";
import { AxiosInstance } from "axios";
import { ticketsApi } from "../src/services/prisma/tickets";

const prisma = new PrismaClient();
let server: Server;
let api: AxiosInstance;

// test tickets

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
});
