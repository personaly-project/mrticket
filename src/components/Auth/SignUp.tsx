import { INewUserSrcData } from "@/lib/types";
import React, { FC } from "react";
import { useSignUp } from "@/lib/hooks";
import Input from "../ui/Input";
import Image from "next/image";
import logoTicketDiagonalShadow from "../../../public/logoTicketDiagonalShadow.png";

interface IProps {
  dispatchRegister: (src: INewUserSrcData) => void;
}

const SignUp: FC<IProps> = ({ dispatchRegister }) => {
  const {
    username,
    email,
    firstName,
    lastName,
    psw,
    validateSignUpIntent,
    dispatchSubmit,
    updateEmail,
    updateFirstName,
    updateLastName,
    updatePsw,
    updateUsername,
    getPswVisibility,
    togglePswVisibility,
  } = useSignUp(dispatchRegister);

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
        <div className="flex justify-center">
          <Image src={logoTicketDiagonalShadow} alt="" height={75}></Image>
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="my-10 max-w-3xl">
            <h1
              className="
              font-extrabold
              text-3xl
              text-purple-dark
              text-center"
            >
              Please, sign up!
            </h1>
          </div>
        </div>
      </div>
      <form
        className="rounded w-96 space-y-2 relative"
        onSubmit={dispatchSubmit}
      >
        <Input
          listener={updateUsername}
          value={username}
          title="Username"
          placeholder="Create user name"
          required
        />
        <Input
          listener={updateFirstName}
          value={firstName}
          title="First name"
          placeholder="Your first name"
          required
        />
        <Input
          listener={updateLastName}
          value={lastName}
          title="Last name"
          placeholder="Your last name"
          required
        />
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
            disabled={!validateSignUpIntent()}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
