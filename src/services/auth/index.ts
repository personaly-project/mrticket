import { INewUserSrcData, IUser } from "@/lib/types"
import { usersApi } from "../prisma"
import { hashPsw, comparePswWithHash } from "./hasher"

const signUp = async (src: INewUserSrcData) => {
    const hash = await hashPsw(src.psw)
    src = {
        ...src,
        psw: hash
    }
    const user = await usersApi.createUser(src)
    console.log(user)
    return user
}

const login = async (email: string, psw: string): Promise<IUser> => {
    console.log("here")
    const targetUser = await usersApi.getUserByEmail(email)
    console.log(targetUser)
    const isValid = await comparePswWithHash(psw, targetUser.psw)
    if (!isValid) {
        throw new Error("403")
    } else {
        console.log("valid")
        return targetUser
    }
}

export {
    signUp,
    login
}