import React, { useContext, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logo2 from "../../../images/logo2.jpg";
import { authCtx } from "@/lib/context/Auth/authContext";
import { AiOutlineMenu, AiOutlineClose, AiOutlineSearch } from "react-icons/ai";
import { GiTicket } from "react-icons/gi";
import { FiLogIn } from "react-icons/fi";

export default function Navbar() {
  const { user, logout } = useContext(authCtx);
  const [nav, setNav] = useState(false);

  return (
    <div className="max-w-[1640px] mx-auto flex items-center p-4 justify-between shadow-md  ">
      {/* Left side */}
      <Link href={'/'} className="flex items-center">
        <Image src={logo2} alt="" height={50}></Image>
      </Link>

      {/* Search input */}
      <div className="bg-white border-2 border-[#9187F4] rounded-full shadow hover:shadow-lg flex items-center px-2 w-[300px] sm:w-[500px] lg:w-[550px] ">
        <input
          className="p-2 w-[150px] sm:w-[250px] lg:w-[230px] rounded-full text-center text-[#9187F4]  placeholder-[#9187F4]  font-medium focus:outline-none"
          type="text"
          placeholder="What are you looking for?"
        />
        <input
          className="px-2 w-[80px] sm:w-[80px] lg:w-[110px] text-center text-[#9187F4]  placeholder-[#9187F4]  focus:outline-none border-2 border-x-[#9187F4]  font-medium border-y-0"
          type="text"
          placeholder="Anywhere"
        />
        <input
          className="p-2 w-[70px] sm:w-[60px] lg:w-[140px] rounded-full text-[#9187F4]  placeholder-[#9187F4] text-center focus:outline-none font-medium"
          type="date"
          placeholder="Any week"
        />
        <AiOutlineSearch className="mx-2" size={25} />
      </div>

      {/* Right side */}
      <div className="flex items-center">
        <Link href={'/listTicket'} >
          <p className="bg-[#9187F4] border-0 text-white rounded-full p-2 px-3 mr-2 font-medium">
            Sell my tickets
          </p>
        </Link>
        {
          user ? (
            <>
              <div className="self-center w-8 h-8 mx-1">
                <Image src={"https://picsum.photos/200"} alt="" width={50} height={50} className="rounded-full" />
              </div>
              <div onClick={() => setNav(!nav)} className="cursor-pointer">
                <AiOutlineMenu size={30} />
              </div>
            </>
          ) : (
            <Link href={'/login'}>
              <p className="bg-[#D2EBFA] border-0 text-[#9187F4] rounded-full p-2 px-3 mr-2 font-medium">
                Log in
              </p>
            </Link>
          )
        }
        {/* <Image src={userphoto} alt="" height={40}></Image> */}
      </div>

      {/*Mobile Menu */}
      {/*Overlay */}
      {nav ? (
        <div className="bg-black/80 fixed w-full h-screen z-10 top-0 left-0"></div>
      ) : (
        ""
      )}

      {/*Side drawer menu */}
      <div
        className={
          nav
            ? "fixed top-0 left-0 w-[300px] h-screen bg-white z-10 duration-300"
            : "fixed top-0 left-[-100%] w-[300px] h-screen bg-white z-10 duration-300"
        }
      >
        <div className="flex items-center p-4">
          <AiOutlineClose
            onClick={() => setNav(!nav)}
            size={30}
            className="absolute right-4 top-4 cursor-pointer"
          />
          <Image src={logo2} alt="" height={50}></Image>
        </div>
        <nav>
          <ul className="flex flex-col p-4 text-[#202020] ">
            <li className="text-xl py-4 flex cursor-pointer">
              <Link href={'/listTicket'} >
                <GiTicket size={25} className="mr-4" /> Sell My Tickets
              </Link>
            </li>
            <li onClick={() => {
              setNav(prev => !prev)
              logout()
            }} className="text-xl py-4 flex cursor-pointer">
              <FiLogIn size={25} className="mr-4" /> Log out
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
