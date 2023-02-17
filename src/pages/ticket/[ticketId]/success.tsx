/** @format */

import Link from "next/link";
import React from "react";
import { GetServerSideProps } from "next";
import { ticketsApi } from "@/services/prisma";
import { ITicket } from "@/lib/types";
import Image from "next/image";

interface IPageProps {
  ticket: ITicket
}

const Success: React.FC<IPageProps> = ({ ticket }) => {

  const downloadQR = () => {

  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "100px",
      }}
    >
      <div
        style={{
          fontWeight: "bold",
          fontSize: "24px",
          flexDirection: "column",
        }}
      >
        <p
          style={{
            fontWeight: "bold",
            fontSize: "24px",
            flexDirection: "column",
            width: "500px",
          }}
        >
          Congratulations on your new purchase - this is all the confirmation
          you will get for now
        </p>
        <button className="bg-purple-dark px-4 py-2" onClick={downloadQR}>
          download
        </button>
        <Link href="/">
          <button
            style={{
              backgroundColor: "black",
              fontWeight: "bold",
              color: "white",
              padding: "10px",
              borderRadius: "5px",
              textDecoration: "none",
              marginTop: "50px",
            }}
          >
            To Home
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Success;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const ticketId = context.query.ticketId as string
  const ticket = await ticketsApi.getTicket(ticketId)

  if (!ticketId) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      ticket: ticket
    },
  }
}
