/* eslint-disable @next/next/no-img-element */
import React from "react";
import Image from "next/image";
import crowd from "./images/crowd2.jpg";

export default function Hero() {
  return (
    <div className="max-w-[1640px] mx-auto px-4 ">
      <div className="max-h-[500px] relative">
        {/* Overlay */}
        <div className="absolute w-full h-full text-[#dfdfdf] max-h-[500px] bg-[#000]/60 flex flex-col justify-center text-center">
          <h1 className="px-4 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold">
            {" "}
            The <span className="text-purple-medium">Best</span> City{" "}
            <span className="text-purple-medium">Events </span>
          </h1>
          <h1 className="px-4 text-xs sm:text-xs md:text-sm lg:text-xl font-bold">
            {" "}
            Mister Ticket
          </h1>
        </div>
        <img
          className="w-full max-h-[500px] object-cover object-bottom  "
          src="https://images.pexels.com/photos/1120162/pexels-photo-1120162.jpeg"
          alt=""
        />
      </div>
    </div>
  );
}

{
  /* Overlay
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-black/50 z-[2]">
        <div className="p-60 text-white z-[2] ">
          <h2 className=" py-5  text-5xl font-bold ">
            {" "}
            WELCOME TO MISTER TICKET!
          </h2>
          <p className="py-5 text-xl"> Whereas you are, whenever you want!</p>
          <button className="px-8 py-2 border ">Start!</button>
        </div>
      </div> */
}
