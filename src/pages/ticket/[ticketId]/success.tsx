/** @format */

import Link from "next/link";
import React from "react";
import { s3 } from "@/services/aws";
import { GetServerSideProps } from "next";
import { ticketsApi, usersApi } from "@/services/prisma";
import { makeFilename } from "@/lib/utils";

interface IProps {
  signedUrl: string
}

const Success: React.FC<IProps> = ({ signedUrl }) => {

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
        <a href={signedUrl} target="_blank" rel="noreferrer" > download your file </a>
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

export const getServerSideProps: GetServerSideProps = async (context) => {

  const ticketId = context.params!.ticketId as string
  const ticket = await ticketsApi.getTicket(ticketId)
  const filename = makeFilename(ticket.sellerId, ticketId, 'png')
  const signedUrl = await s3.downloadFile(
    filename
  );

  return {
    props: {
      signedUrl: signedUrl,
    },
  };
};

export default Success;