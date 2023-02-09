import { response, rest } from "msw"
import { createRandomEvent } from "@/lib/utils"

const handlers = [
    rest.get('/api/venues/15/events', async (req, res, ctx) => {
        return res(ctx.json({ eventPool: [createRandomEvent("15")] }))
    })
]

function createGetHandler(endpoint: string, responseBody: any, status = 200, err?: string) {
    return rest.get(endpoint, async (_, res, ctx) => {
        return res(ctx.status(status), ctx.json({ ...responseBody, err }))
    })
}

export {
    handlers,
    createGetHandler
}