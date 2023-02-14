/** @format */

import React, { useContext } from "react";
import Link from "next/link";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, StarIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import logoMustache from "../../images/logoCircleYellow.png";
import logoWordsPurple from "../../images/logoWordsPurple.png";
import { authCtx } from "@/lib/context/Auth/authContext";
import Profile from "./Profile";
import { useState } from "react";
import searchFunction from "@/lib/searchFunction";

const navigation = [
  { name: "Events", href: "#", current: false },
  { name: "Cities", href: "#", current: false },
  { name: "Sell My Tickets", href: "/listTicket", current: true },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface IProps {
  ticketSearch: string;
  setTicketSearch: (value: string) => void;
}

export default function Navbar({ ticketSearch, setTicketSearch }: IProps) {
  const { user, logout } = useContext(authCtx);

  return (
    <Disclosure as="nav" className="">
      {({ open }) => (
        <>
          <div className="w-full z-20 top-0 left-0 px-2 sm:px-6 lg:px-8 bg-white border-b border-[#d0d0d0] fixed shadow-md">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 justify-end sm:items-stretch sm:justify-start">
                <Link href="/">
                  <div className="flex flex-shrink-0 items-center space-x-3">
                    <div className="h-10 w-10 lg:block">
                      <Image src={logoMustache} alt="" />
                    </div>
                    <div className="h-9 w-14 lg:block">
                      <Image src={logoWordsPurple} alt="" />
                    </div>
                  </div>
                </Link>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? "bg-[#9187F4] text-white  hover:bg-[#FFC200] hover:text-black"
                            : "text-black hover:bg-purple-light hover:text-white",
                          "px-3 py-2 rounded-3xl text-m font-medium "
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}
                    <div className="flex items-center space-x-3">
                      <input
                        className="bg-[#F2F2F2] rounded-3xl px-3 py-2"
                        placeholder="Search  Here"
                        type="text"
                        value={ticketSearch}
                        onChange={(e) => setTicketSearch(e.target.value)}
                      />
                      <button className="bg-[#FFC200] text-black rounded-3xl px-3 py-2">
                        Search
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* Profile dropdown */}
                {user ? (
                  <>
                    <button
                      type="button"
                      className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                      <span className="sr-only">View notifications</span>
                      <StarIcon
                        className="h-6 w-6 fill-yellow"
                        aria-hidden="true"
                      />
                    </button>
                    <Profile logout={logout} />
                  </>
                ) : (
                  <Link href={"/login"}>
                    <p className="cursor-pointer">Login / SignUp</p>
                  </Link>
                )}
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block px-3 py-2 rounded-md text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
