import React, { FC, useCallback, useState } from 'react'
import Input from '../ui/Input'
import emailValidator from "email-validator"
import { useLogin } from '@/lib/hooks'

interface IProps {
    dispatchLogin: (email: string, psw: string) => void
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

    } = useLogin(dispatchLogin)

    return (
        <form className='rounded w-96 space-y-2' onSubmit={dispatchSignUp} >
            <Input listener={updateEmail} value={email} title="Email" placeholder='Your email' type='email' required />
            <div className='mb-4 flex flex-col pb-4' >
                <Input listener={updatePsw} value={psw} title="Password" placeholder='Your secret password' type={getPswVisibility()} required />
                <sub className='cursor-pointer underline opacity-80 self-end mt-4' onClick={togglePswVisibility} > see psw </sub>
            </div>
            <div className='space-x-4' >
                <button className='bg-danger py-2 px-4 rounded text-white font-semibold'  >
                    Reset
                </button>
                <button className='bg-purple-medium disabled:bg-lightblue py-2 px-4 rounded text-white font-semibold' disabled={!getSubmitValidity()} >
                    Submit
                </button>
            </div>
        </form>
    )
}

export default Login