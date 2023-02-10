/** @format */

import { FC, ReactNode } from "react";
import Navbar from "./Navbar";

interface IProps {
  ticketSearch: string;
  setticketSearch: (ticketSearch: string) => void;
}

const Layout = ({ ticketSearch, setticketSearch }: IProps) => {
  return (
    <div className="p-8">
      <Navbar ticketSearch={ticketSearch} setTicketSearch={setticketSearch} />
      {}
    </div>
  );
};

export default Layout;
