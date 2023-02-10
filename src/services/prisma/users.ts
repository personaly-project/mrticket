import prisma from "./prisma";
import { IUser, INewUserSrcData, ITicket } from "@/lib/types";


const getUser = async (userId: string): Promise<IUser & { tickets: ITicket[] }> => {
    const user = await prisma.user.findUniqueOrThrow({
        where: {
            id: userId
        },
        include: {
            tickets: true
        }
    })
    return user as IUser & { tickets: ITicket[] }
}

const createUser = async (src: INewUserSrcData): Promise<IUser> => {
    const user = await prisma.user.create({
        data: src
    })
    return user
}

const updateUser = async (userId: string, update: INewUserSrcData): Promise<IUser> => {
    const user = await prisma.user.update({
        where: {
            id: userId
        },
        data: update
    })
    return user
}

export const usersApi = {
    getUser,
    createUser,
    updateUser
}