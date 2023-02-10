import { hash, compare } from "bcrypt"

const ROUNDS = 20

export const hashPsw = async (psw: string) => {
    const hashed = await hash(psw, ROUNDS)
    return hashed
}

export const comparePswWithHash = async (psw: string, hashedPsw: string) => {
    return await compare(psw, hashedPsw)
}