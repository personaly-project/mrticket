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
    return user
}

const login = async (email: string, psw: string): Promise<IUser> => {
    const targetUser = await usersApi.getUserByEmail(email)
    const isValid = await comparePswWithHash(psw, targetUser.psw)
    if (!isValid) {
        throw new Error("403")
    } else {
        return targetUser
    }
}

const autoLogin = async (email: string, hashed: string): Promise<IUser> => {
    const targetUser = await usersApi.getUserByEmail(email)
    if (hashed !== targetUser.psw) {
        throw new Error("403")
    } else {
        return targetUser
    }
}

export {
    signUp,
    login,
    autoLogin
}
