/** @format */

import { FC, ReactNode } from "react";
import Navbar from "./Navbar";
interface IProps {
  children: ReactNode;
  ticketSearch: string;
  setTicketSearch: (ticketSearch: string) => void;
}

export default function Layout({ ticketSearch, setTicketSearch }: IProps) {
  return (
    <div className="p-8">
      <Navbar ticketSearch={ticketSearch} setTicketSearch={setTicketSearch} />
      {}
    </div>
  );
}
