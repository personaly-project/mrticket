import { rest } from "msw"
import { faker } from "@faker-js/faker"
import { Event as PEvent } from "@prisma/client"

const getGenNumber = (max: number) => faker.datatype.number({ min: 0, max })

const createRandomEvent = (venueID: string): PEvent => {
    return {
        date: faker.date.future(),
        eventSpecs: faker.lorem.sentences(3),
        eventType: "concert",
        performers: faker.helpers.uniqueArray(faker.random.word, getGenNumber(2)),
        startHour: faker.date.future(),
        title: faker.lorem.words(getGenNumber(5)),
        venueId: venueID,
        id: "742"
    }
}

const handlers = [
    rest.get('/api/venues/15/events', async (req, res, ctx) => {
        return res(ctx.json({ eventPool: [createRandomEvent("15")] }))
    })
]

export {
    handlers
}