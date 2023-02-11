import React, { useContext, useEffect } from 'react'
import { authCtx } from '@/lib/context/Auth/authContext'
import { useRouter } from 'next/router'

interface IProps {
    children: React.ReactNode,
    disabled?: boolean,
}

const ProtectedRoute: React.FC<IProps> = ({ children, disabled }) => {

    const { user, isLoading } = useContext(authCtx)
    const router = useRouter()

    if (!user && !disabled) {
        router.push('/login')
    }

    useEffect(() => {
        if (!isLoading && !user) {
            router.push('/login')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading, user])

    return (
        <>
            {children}
        </>
    )
}

export default ProtectedRoute