import React, { useContext, useState } from "react";
import { Login, SignUp } from "@/components/Auth";
import { authCtx } from "@/lib/context/Auth/authContext";
import Image from "next/image";
import logo from "../../public/logoWordsPurple.png";

const LoginPage = () => {
  const { login, signUp, isLoading } = useContext(authCtx);
  const [register, setRegister] = useState<boolean>(false);

  const toggleRegister = () => {
    setRegister((prev) => !prev);
  };

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        {" "}
        Loading{" "}
      </div>
    );

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="shadow flex flex-col gap-4 p-8 rounded relative">
        {register ? (
          <SignUp dispatchRegister={signUp} />
        ) : (
          <Login dispatchLogin={login} />
        )}
        <sub
          onClick={toggleRegister}
          className="cursor-pointer underline opacity-80"
        >
          {register ? "Have an account? Login!" : "New here? Register!"}
        </sub>
        <Image className="-z-50 opacity-10" src={logo} alt="" fill />
      </div>
    </div>
  );
};

export default LoginPage;
