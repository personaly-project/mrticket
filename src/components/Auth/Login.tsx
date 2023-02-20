import React, { FC, useCallback, useState } from "react";
import Input from "../ui/Input";
import emailValidator from "email-validator";
import { useLogin } from "@/lib/hooks";
import Image from "next/image";
import logoTicketDiagonalShadow from "../../../public/logoTicketDiagonalShadow.png";

interface IProps {
  dispatchLogin: (email: string, psw: string) => void;
}

const Login: FC<IProps> = ({ dispatchLogin }) => {
  const {
    psw,
    email,
    updatePsw,
    updateEmail,
    togglePswVisibility,
    dispatchSignUp,
    getPswVisibility,
    getSubmitValidity,
  } = useLogin(dispatchLogin);

  return (
    <div
      className="shadow 
            flex flex-col 
            gap-4 p-8 
            rounded 
            relative
            bg-white"
    >
      <div>
        <div
          className="mx-auto max-w-7xl 
              px-4 sm:px-6 lg:px-6"
        >
          <div className="flex justify-center">
            <Image src={logoTicketDiagonalShadow} alt="" height={75}></Image>
          </div>

          <div className="my-10 max-w-3xl ">
            <h1
              className="
                        font-extrabold 
                          text-3xl text-purple-dark text-center"
            >
              Please, log in!{" "}
            </h1>
          </div>
        </div>
        <form onSubmit={dispatchSignUp}>
          <Input
            listener={updateEmail}
            value={email}
            title="Email"
            placeholder="Your email"
            type="email"
            required
          />
          <div className="mb-4 flex flex-col pb-4">
            <Input
              listener={updatePsw}
              value={psw}
              title="Password"
              placeholder="Your secret password"
              type={getPswVisibility()}
              required
            />
            <sub
              className="cursor-pointer underline opacity-80 self-end mt-4"
              onClick={togglePswVisibility}
            >
              {" "}
              see psw{" "}
            </sub>
          </div>
          <div className="flex flex-row justify-between gap-4 pt-4">
            <button
              className="border-0 py-2 px-4 
                        rounded-md shadow w-32 self-end  
                        bg-purple-dark font-semibold text-white
                        hover:bg-lightblue hover:text-danger"
            >
              Reset
            </button>
            <button
              className="border-0 py-2 px-4 
                    rounded-md shadow w-32 self-end  
                    bg-purple-medium  font-semibold text-white  
                    hover:bg-yellow"
              disabled={!getSubmitValidity()}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
