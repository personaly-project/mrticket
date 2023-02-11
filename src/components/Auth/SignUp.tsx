import { INewUserSrcData } from '@/lib/types'
import React, { FC } from 'react'
import { useSignUp } from '@/lib/hooks'
import Input from '../ui/Input'

interface IProps {
    dispatchRegister: (src: INewUserSrcData) => void
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
        togglePswVisibility
    } = useSignUp(dispatchRegister)

    return (
        <form className='rounded w-96 space-y-2 relative' onSubmit={dispatchSubmit} >
            <Input listener={updateUsername} value={username} title="Username" placeholder='Name that other users will see' required />
            <Input listener={updateFirstName} value={firstName} title="First name" placeholder='Your first name' required />
            <Input listener={updateLastName} value={lastName} title="Last name" placeholder='Your last name' required />
            <Input listener={updateEmail} value={email} title="Email" placeholder='Your email' type='email' required />
            <div className='mb-4 flex flex-col pb-4' >
                <Input listener={updatePsw} value={psw} title="Password" placeholder='Your secret password' type={getPswVisibility()} required />
                <sub className='cursor-pointer underline opacity-80 self-end mt-4' onClick={togglePswVisibility} > see psw </sub>
            </div>
            <div className='space-x-4' >
                <button className='bg-danger py-2 px-4 rounded text-white font-semibold'  >
                    Reset
                </button>
                <button className='bg-purple-medium disabled:bg-lightblue py-2 px-4 rounded text-white font-semibold' disabled={!validateSignUpIntent()} >
                    Submit
                </button>
            </div>
        </form>
    )
}

export default SignUp

/* 
  psw: string,
  email: string,
  username: string,
  firstName: string,
  lastName: string,
  avatarUrl: string,
*/