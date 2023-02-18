/** @format */
import { useEffect, useState } from "react";
import React from "react";

interface IProps {
  ticketSearch: string;
  setTicketSearch: (ticketSearch: string) => void;
}

export default function Search({ ticketSearch, setTicketSearch }: IProps) {
  const [venues, setVenues] = useState<any>([]);
  const handleChange = (e: any) => {
    setTicketSearch(e.target.value);
  };

  useEffect(() => {
    const venuesLocally = fetch("http://localhost:3000/api/getallvenues")
      .then((res) => res.json())
      .then((data) => {
        setVenues(data);
      });
  }, []);

  return (
    <div>
      Find your Ticket
      <input
        style={{
          width: "auto",
          height: "100%",
          backgroundColor: "transparent",
          border: "none",
          outline: "none",
          marginLeft: "10px",
          color: "black",
        }}
        type="text"
        value={ticketSearch}
        onChange={(e) => handleChange(e)}
        placeholder="Enter your search here"
      />
    </div>
  );
}
