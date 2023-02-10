/** @format */
import { useEffect, useState } from "react";
import filterObject from "@/lib/filterObject";

interface IProps {
  ticketSearch: string;
  setTicketSearch: (ticketSearch: string) => void;
}

export default function Search({ ticketSearch, setTicketSearch }: IProps) {
  const [venues, setVenues] = useState<any>([]);
  const handleChange = (e: any) => {
    setTicketSearch(e.target.value);
    // console.log keys from venues
    // get all the keys from an object
    console.log(filterObject(venues.venue, venues.venue[0], ticketSearch));
  };

  useEffect(() => {
    const venuesLocally = fetch("http://localhost:3000/api/getallvenues")
      .then((res) => res.json())
      .then((data) => {
        setVenues(data);
        console.log(data);
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
