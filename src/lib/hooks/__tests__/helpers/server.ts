import { DefaultBodyType, MockedRequest, rest, RestHandler } from "msw";
import { setupServer } from "msw/node"
import { handlers as defaultHandlers } from "./server-handlers";

// const server = setupServer(...handlers)

const createServer = (handlers?: RestHandler<MockedRequest<DefaultBodyType>>[]) => {
    if (!handlers) {
        handlers = defaultHandlers
    }
    return setupServer(...handlers)
}

export {
    createServer,
    rest
}