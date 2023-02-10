/** @format */

import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "@/components/Layout";
import { useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const [ticketSearch, setTicketSearch] = useState<string>("");

  return (
    <Layout ticketSearch={ticketSearch} setTicketSearch={setTicketSearch}>
      <Component {...pageProps} />
    </Layout>
  );
}
