import { prismaMock as prisma } from "../../../../singleton";
import { IUser, INewUserSrcData } from "@/lib/types";
import { usersApi } from "../users";
import { createRandomUser } from "@/lib/utils";

const SAMPLE_USER_ID = "sample-user-id"

const sampleUserSrc: INewUserSrcData = createRandomUser()
const sampleUser: IUser = {
    ...createRandomUser(),
    id: SAMPLE_USER_ID
}
const sampleUserUpdated: IUser = {
    ...sampleUser,
    email: "changed email",
    username: "changed password"
}

const sampleUserUpdate: INewUserSrcData = {
    ...sampleUserSrc,
    email: "changed email",
    username: "changed password"
}

describe("usersApi", () => {

    it("should create a new user", async () => {
        prisma.user.create.mockResolvedValueOnce(sampleUser)
        await expect(usersApi.createUser(sampleUserSrc)).resolves.toEqual(sampleUser)
    })
    it("should get the targeted user", async () => {
        prisma.user.findUniqueOrThrow.mockResolvedValueOnce(sampleUser)
        await expect(usersApi.getUser(SAMPLE_USER_ID)).resolves.toEqual(sampleUser)
    })
    it("should update the targeted user", async () => {
        prisma.user.update.mockResolvedValueOnce(sampleUserUpdated)
        await expect(usersApi.updateUser(sampleUser.id, sampleUserUpdate)).resolves.toEqual(sampleUserUpdated)
    })
})


