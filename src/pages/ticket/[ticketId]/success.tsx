/** @format */

import Link from "next/link";
import React from "react";
import { s3 } from "@/services/aws";
import { GetServerSideProps } from "next";
import { ticketsApi, usersApi } from "@/services/prisma";
import { makeFilename } from "@/lib/utils";
import { FaFileDownload } from 'react-icons/fa'

interface IProps {
  signedUrl: string
}

const Success: React.FC<IProps> = ({ signedUrl }) => {

  return (
    <div className="min-h-screen bg-purple-dark text-white flex flex-row justify-center font-latoSans">
      <div className="flex flex-col justify-center m-auto min-w-full " >
        <div className="bg-white rounded-2xl text-center flex flex-col items-center gap-4 text-black p-10 m-auto">
          <div className="text-3xl text-yellow mb-3 uppercase font-black px-10">
            Congratulations on your new purchase! 🥳
          </div>
          <div className="text-xs text-[#bdbdbd]">
            This is all the confirmation
            you will get for now.
          </div>

          <div className="flex items-center gap-2 bg-[#f7f5e0] rounded-lg p-2 w-52 cursor-pointer underline">
            <a href={signedUrl} target="_blank" rel="noreferrer" className="flex flex-row items-center gap-2 ">
              <FaFileDownload className="bg-[#ffe358b7] rounded-2xl p-2 text-black " size={40} />

              Download your file </a>
          </div>
          <Link href="/">
            <button className="bg-lightblue font-semibold text-purple-medium border-0 rounded-lg" > Go Back To Home
            </button>
          </Link>
        </div>
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