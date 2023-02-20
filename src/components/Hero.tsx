/* eslint-disable @next/next/no-img-element */
import React from "react";
import logoCircle from "../../public/logoCircleYellow.png";
import Image from "next/image";

export default function Hero() {
  return (
    <div className="min-w-screen mx-auto ">
      {/* Overlay */}
      <div className="absolute w-full h-full text-[#dfdfdf] max-h-[500px] bg-[#000]/60 flex flex-col justify-center text-center">
        <h1 className="px-4 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-shadow">
          {" "}
          The <span className="text-purple-medium">Best</span> City{" "}
          <span className="text-purple-medium">Events </span>
        </h1>
        <Image
          className="self-center pt-3"
          src={logoCircle}
          height={60}
          width={60}
          alt={""}
        />
        <h1 className="p-2 text-xs sm:text-xs md:text-sm lg:text-lg font-bold">
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
  );
}
