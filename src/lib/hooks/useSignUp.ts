import React, { useState, useCallback } from "react"
import { INewUserSrcData } from "../types"
import emailValidator from "email-validator"

export const useSignUp = (dispatchRegister: (src: INewUserSrcData) => void) => {
    const [username, setUsername] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [firstName, setFirstName] = useState<string>("")
    const [lastName, setLastName] = useState<string>("")
    const [psw, setPsw] = useState<string>("")
    const [pswVisibility, setPswVisibility] = useState<boolean>(false)

    const togglePswVisibility = () => {
        setPswVisibility(prev => !prev)
    }

    const getPswVisibility = useCallback(() => {
        if (pswVisibility) return "text"
        return "password"
    }, [pswVisibility])

    const updateUsername = (update: string) => {
        setUsername(update)
    }
    const updateEmail = (update: string) => {
        setEmail(update)
    }
    const updateFirstName = (update: string) => {
        setFirstName(update)
    }
    const updateLastName = (update: string) => {
        setLastName(update)
    }
    const updatePsw = (update: string) => {
        setPsw(update)
    }

    const validateSignUpIntent = useCallback(() => {
        if (email && psw && psw.length > 6 && emailValidator.validate(email) && username && username.length > 4 && firstName && lastName) return true
        return false
    }, [email, firstName, lastName, psw, username])

    const getSrcData = useCallback((): INewUserSrcData | null => {
        if (validateSignUpIntent()) {
            return {
                avatarUrl: "https://picsum.photos/200",
                email: email!,
                firstName: firstName!,
                lastName: lastName!,
                psw: psw!,
                username: username!
            }
        }
        return null
    }, [email, firstName, lastName, psw, username, validateSignUpIntent])


    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const src = getSrcData()
        if (src) dispatchRegister(src)
    }

    return {
        username,
        email,
        firstName,
        lastName,
        psw,
        updateUsername,
        updateEmail,
        updateFirstName,
        updateLastName,
        updatePsw,
        validateSignUpIntent,
        dispatchSubmit: onSubmit,
        togglePswVisibility,
        getPswVisibility
    }
}