import { useState, useCallback } from "react"
import emailValidator from "email-validator"

export const useLogin = (dispatchLogin: (email: string, psw: string) => void) => {
    const [email, setEmail] = useState<string>("")
    const [psw, setPsw] = useState<string>("")
    const [pswVisibility, setPswVisibility] = useState<boolean>(false)

    const updateEmail = (update: string) => {
        setEmail(update)
    }

    const updatePsw = (update: string) => {
        setPsw(update)
    }

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (email && psw && emailValidator.validate(email)) {
            dispatchLogin(email, psw)
        }
    }

    const togglePswVisibility = () => {
        setPswVisibility(prev => !prev)
    }

    const getPswVisibility = useCallback(() => {
        if (pswVisibility) return "text"
        return "password"
    }, [pswVisibility])

    const getSubmitValidity = useCallback((): boolean => {
        if (email && emailValidator.validate(email) && psw && psw.length > 6) return true
        return false
    }, [email, psw])

    return {
        email,
        psw,
        pswVisibility,
        updateEmail,
        updatePsw,
        dispatchSignUp: onSubmit,
        togglePswVisibility,
        getPswVisibility,
        getSubmitValidity
    }
}