/** @format */

import { FC, ReactNode } from "react";
import { Navbar } from "./Navbar";

interface IProps {
  ticketSearch: string;
  setTicketSearch: (value: string) => void;
}

const Layout = (props: IProps) => {
  return (
    <div className="min-h-screen">
      <Navbar {...props} />
    </div>
  );
};

export default Layout;
