/** @format */

import Head from "next/head";
import { StripeCheckout } from "@/services/stripe/stripeCheckout";
import { GetServerSideProps } from "next";
import { ticketsApi } from "@/services/prisma";
import { ITicket } from "@/lib/types";

interface IPageProps {
  ticketid?: string;
  allticket?: ITicket[];
}

const Home: React.FC<IPageProps> = ({ ticketid, allticket }) => {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <StripeCheckout ticketId={ticketid} allTickets={allticket} />
      </main>
    </>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const ticketId = context.query.ticketId as string;
  const AllTickets = await ticketsApi.getAllTickets();
  if (!ticketId) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      ticketid: ticketId,
      allticket: AllTickets,
    },
  };
};