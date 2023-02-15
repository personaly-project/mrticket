/** @format */

import { FormEvent, useEffect, useState } from "react";
import searchFunction from "../lib/searchFunction";
export default function SearchFeature() {
  const [tickets, setTickets] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  useEffect(() => {
    const search = async () => {
      const allTickets = await fetch("/api/getalltickets");
      return allTickets.json();
    };
    search().then((tickets) => setTickets(tickets["data"]));
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const objectToStructure = tickets[0];
    const filteredTickets = searchFunction(
      tickets,
      objectToStructure,
      searchTerm
    );
    setTickets(filteredTickets);
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        left: "50%",
        transform: "translateX(-50%)",
        bottom: "80%",
        justifyContent: "center",
        height: "100px",
        width: "70%",
        position: "absolute",
      }}
    >
      <form
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <input
          style={{
            width: "60%",
            lineHeight: "2rem",
            border: "1px solid lightgray",
            height: "3rem",
            borderColor: "black",
            borderRadius: "5px",
            padding: "0 1rem",
          }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          type="text"
          placeholder="Search"
        />
        <input
          type="date"
          style={{
            width: "20%",
            lineHeight: "2rem",
            border: "1px solid lightgray",
            padding: "0 1rem",
            height: "3rem",
            borderColor: "black",
          }}
          placeholder="From"
        />
        <input
          type="date"
          style={{
            width: "20%",
            lineHeight: "2rem",
            border: "1px solid lightgray",
            padding: "0 1rem",
            height: "3rem",
            borderColor: "black",
          }}
          placeholder="To"
        />
        <button
          type="submit"
          style={{
            width: "10%",
            height: "3rem",
            border: "1px solid lightgray",
            borderRadius: "5px",
            padding: "0 1rem",
            marginLeft: "1rem",
            backgroundColor: "black",
            color: "white",
          }}
        >
          Search
        </button>
      </form>

      <ul
        style={{
          display: "flex",
          flexDirection: "column",
          width: "1500px",
          height: "700px",
          fontSize: "1.5rem",
          color: "black",
          top: "150%",
          position: "absolute",
          border: "1px solid lightgray",

          overflow: "scroll",
          gap: "1rem",
        }}
      >
        {tickets.length > 0 &&
          tickets.map((ticket: any, index: number) => (
            <div
              key={index}
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
                height: "100px",
                padding: "0 1rem",
                alignItems: "center",
              }}
            >
              <li
                key={index}
                style={{
                  fontSize: "1.5rem",
                  display: "flex",
                  flexDirection: "column",

                  color: "black",
                }}
              >
                {ticket.title} {ticket.price}
              </li>
              <li>
                <button
                  style={{
                    marginTop: "1rem",
                    width: "6rem",
                    height: "3rem",
                    borderRadius: "5px",
                    marginRight: "1rem",
                    fontSize: "1rem",
                    padding: "0 1rem",
                    backgroundColor: "black",
                    color: "white",
                  }}
                >
                  Buy Now
                </button>
              </li>
            </div>
          ))}
      </ul>
    </div>
  );
}

interface Ticket {
  data: {
    id: number;
    title: string;
    description: string;
  };
}
