import { response, rest } from "msw"
import { createRandomEvent } from "@/lib/utils"

const handlers: any[] = []

function createGetHandler(endpoint: string, responseBody: any, status = 200, err?: string) {
    return rest.get(endpoint, async (_, res, ctx) => {
        return res(ctx.status(status), ctx.json({ ...responseBody, err }))
    })
}

export {
    handlers,
    createGetHandler
}