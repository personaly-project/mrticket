import { INewUserSrcData, INewEventSrcData, INewTicketSrcData } from "./types"
import { faker } from "@faker-js/faker"

export const eventTypes = ['show', 'stand-up', 'concert']

export const getGenNumber = (max: number) => faker.datatype.number({ min: 0, max })

export const createRandomVenue = () => {
    return {
        address: faker.address.streetAddress(),
        city: faker.address.cityName(),
        country: faker.address.country(),
        name: faker.lorem.words(3),
        placeType: faker.lorem.words(2),
        state: faker.address.state(),
        timezone: faker.address.timeZone(),
        venueSpecs: null
    }
}

export const createRandomEvent = (venueID: string): INewEventSrcData => {
    return {
        date: faker.date.future(),
        eventSpecs: faker.lorem.sentences(3),
        eventType: eventTypes[getGenNumber(2)],
        performers: faker.helpers.uniqueArray(faker.random.word, getGenNumber(2)),
        startHour: faker.date.future().toDateString(),
        title: faker.lorem.words(getGenNumber(5)),
        venueId: venueID,
    }
}

export const createRandomTicket = (eventID: string, sellerId: string): INewTicketSrcData => {
    return {
        imgs: faker.helpers.uniqueArray(faker.random.word, getGenNumber(2)),
        price: parseInt(faker.finance.amount()),
        sold: false,
        eventId: eventID,
        ticket: faker.lorem.words(getGenNumber(5)),
        title: faker.lorem.words(getGenNumber(5)),
        sellerId,
    }
}

export const createRandomUser = (): INewUserSrcData => {
    return {
        avatarUrl: faker.internet.url(),
        email: faker.internet.email(),
        username: faker.internet.userName(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        psw: faker.internet.password(),
    }
}