import React, { useContext, useState } from 'react'
import { Login } from '@/components/Auth'
import { authCtx } from '@/lib/context/Auth/authContext'

const LoginPage = () => {

    const { login, signUp, isLoading } = useContext(authCtx)
    const [register, setRegister] = useState<boolean>(false)

    const toggleRegister = () => {
        setRegister(prev => !prev)
    }

    return (
        <div className='min-h-screen flex items-center justify-center' >
            <div className='shadow flex flex-col gap-4 p-8 rounded' >
                <Login dispatchLogin={login} />
                <sub onClick={toggleRegister} className='cursor-pointer underline opacity-80' >
                    {
                        register ? "Have an account? Login!" : "New here? Register!"
                    }
                </sub>
            </div>
        </div>
    )
}

export default LoginPage