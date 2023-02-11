import React, { FC, useCallback, useState } from 'react'
import Input from '../ui/Input'
import emailValidator from "email-validator"

interface IProps {
    dispatchLogin: (email: string, psw: string) => void
}

const Login: FC<IProps> = ({ dispatchLogin }) => {

    const [email, setEmail] = useState<string>()
    const [psw, setPsw] = useState<string>()
    const [seePsw, setSeePsw] = useState<boolean>(false)

    const updateEmail = (update: string) => {
        setEmail(update)
    }

    const updatePsw = (update: string) => {
        setPsw(update)
    }

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (email && psw) {
            dispatchLogin(email, psw)
        }
    }

    const togglePswVisibility = () => {
        setSeePsw(prev => !prev)
    }

    const getPswVisibility = useCallback(() => {
        if (seePsw) return "text"
        return "password"
    }, [seePsw])

    const getSubmitValidity = useCallback((): boolean => {
        if (email && emailValidator.validate(email) && psw && psw.length > 6) return true
        return false
    }, [email, psw])

    return (
        <form className='rounded w-96 space-y-2' onSubmit={onSubmit} >
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