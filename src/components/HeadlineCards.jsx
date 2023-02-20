/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import React from "react";
import beyonce from "../../public/beyonce.jpg";
import tomorrowland from "../../public/tomorrowland.jpeg";
import mandanga from "../../public/mandanga.jpeg";
import weekendBeach from "../../public/weekendBeach.jpeg";
import colorRun from "../../public/colorRun.jpeg";
import campNou from "../../public/campNou.jpeg";

const HeadlineCards = () => {
  return (
    <div className="font-latoSans flex flex-col">
      <div className="pt-10 tracking-wider uppercase font-semibold text-2xl text-center text-purple-medium">
        Popular searches 🔍
      </div>

      <div
        className="min-w-screen mx-auto p-3
    grid 
    md:grid-cols-3 gap-6"
      >
        {/* Card */}
        <div className="rounded-xl relative">
          {/* Overlay */}
          <div className="absolute w-full h-full bg-black/50 rounded-xl text-white">
            <p className="font-bold text-2xl px-2 pt-4">Beyonce</p>
            <p className="px-2">Palau Sant Jordi, Barcelona</p>
            <button className="border-white bg-white text-black mx-2 absolute bottom-4">
              Buy now
            </button>
          </div>
          <Image
            className="max-h-[190px] md:h-full w-full object-cover rounded-xl"
            src={beyonce}
            alt=""
          />
        </div>

        {/* Card */}
        <div className="rounded-xl relative">
          {/* Overlay */}
          <div className="absolute w-full h-full bg-black/50 rounded-xl text-white">
            <p className="font-bold text-2xl px-2 pt-4">Tomorrowland 2023</p>
            <p className="px-2">Boom, Belgium</p>
            <button className="border-white bg-white text-black mx-2 absolute bottom-4">
              Buy now
            </button>
          </div>
          <Image
            className="max-h-[190px] md:h-full  w-full object-cover rounded-xl"
            src={tomorrowland}
            alt=""
          />
        </div>

        {/* Card */}
        <div className="rounded-xl relative">
          {/* Overlay */}
          <div className="absolute w-full h-full bg-black/50 rounded-xl text-white">
            <p className="font-bold text-2xl px-2 pt-4">Mandanga</p>
            <p className="px-2">Sala Razzmatazz, Barcelona</p>
            <button className="border-white bg-white text-black mx-2 absolute bottom-4">
              Buy now
            </button>
          </div>
          <Image
            className="max-h-[190px] md:h-full w-full object-cover rounded-xl"
            src={mandanga}
            alt=""
          />
        </div>

        {/* Card */}
        <div className="rounded-xl relative">
          {/* Overlay */}
          <div className="absolute w-full h-full bg-black/50 rounded-xl text-white">
            <p className="font-bold text-2xl px-2 pt-4">
              Weekend Beach Festival
            </p>
            <p className="px-2">Torre del mar, Spain</p>
            <button className="border-white bg-white text-black mx-2 absolute bottom-4">
              Buy now
            </button>
          </div>
          <Image
            className="max-h-[190px] md:h-full  w-full object-cover rounded-xl"
            src={weekendBeach}
            alt=""
          />
        </div>

        {/* Card */}
        <div className="rounded-xl relative">
          {/* Overlay */}
          <div className="absolute w-full h-full bg-black/50 rounded-xl text-white">
            <p className="font-bold text-2xl px-2 pt-4">Final Barça - Madrid</p>
            <p className="px-2">Spotify Camp Nou, Barcelona</p>
            <button className="border-white bg-white text-black mx-2 absolute bottom-4">
              Buy now
            </button>
          </div>
          <Image
            className="max-h-[190px] md:h-full  w-full object-cover rounded-xl"
            src={campNou}
            alt=""
          />
        </div>

        {/* Card */}
        <div className="rounded-xl relative">
          {/* Overlay */}
          <div className="absolute w-full h-full bg-black/50 rounded-xl text-white">
            <p className="font-bold text-2xl px-2 pt-4">Color Run April 2023</p>
            <p className="px-2">Barcelona</p>
            <button className="border-white bg-white text-black mx-2 absolute bottom-4">
              Buy now
            </button>
          </div>
          <Image
            className="max-h-[190px] md:h-full  w-full object-cover rounded-xl"
            src={colorRun}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default HeadlineCards;
