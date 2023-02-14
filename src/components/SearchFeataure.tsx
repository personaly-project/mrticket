/** @format */

import { useEffect, useState } from "react";
export default function SearchFeature() {
  const [tickets, setTickets] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  useEffect(() => {
    const search = async () => {
      const allTickets = await fetch("/api/getalltickets");
      return allTickets.json();
    };
    search().then((tickets) => setTickets(tickets["data"]));
    console.log(tickets);
  }, []);

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
          width: "1000px",
          height: "700px",
          position: "absolute",
          fontSize: "1.5rem",
          color: "black",
          backgroundColor: "red",
          opacity: "0.1",
          top: "100px",
          overflow: "scroll",
        }}
      >
        {tickets.length > 0 &&
          tickets.map((ticket: any) => (
            <li
              key={ticket.id}
              style={{
                fontSize: "1.5rem",
                position: "absolute",
                display: "flex",
                flexDirection: "column",
                width: "1000px",
                colorAdjust: "exact",

                height: "100px",
                top: "100px",

                backgroundColor: "red",

                transform: "translateX(-50%)",
                color: "black",
              }}
            >
              hello beatiful world
              {ticket.title} {ticket.description}
            </li>
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
