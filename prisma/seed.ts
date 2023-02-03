import { PrismaClient, Venue, Event, Ticket } from "@prisma/client";
import { faker } from '@faker-js/faker';

const eventTypes = ['show', 'stand-up', 'concert']

const getGenNumber = (max: number) => faker.datatype.number({ min: 0, max })

const prisma = new PrismaClient()


const createRandomVenue = () => {
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


const createRandomEvent = (venueID: string) => {
  return {
    date: faker.date.future(),
    eventSpecs: faker.lorem.sentences(3),
    eventType: eventTypes[getGenNumber(2)],
    performers: faker.helpers.uniqueArray(faker.random.word, getGenNumber(2)),
    startHour: faker.date.future(),
    title: faker.lorem.words(getGenNumber(5)),
    venueId: venueID
  }
}

const createRandomTicket = (eventID: string) => {
  return {
    buyerEmail: faker.internet.email(),
    depositOn: faker.finance.creditCardNumber(),
    imgs: faker.helpers.uniqueArray(faker.random.word, getGenNumber(2)),
    price: parseInt(faker.finance.amount()),
    sold: false,
    eventId: eventID,
    ticket: faker.lorem.words(getGenNumber(5)),
    title: faker.lorem.words(getGenNumber(5))

  }
}

async function main() {
  const venues: Venue[] = []
  const events: Event[] = []
  const tickets: Ticket[] = []
  for (let i = 0; i < 3; i++) {
    const source = createRandomVenue()
    const venue = await prisma.venue.create({
      data: source
    })
    venues.push(venue)

    for (let i = 0; i < 3; i++) {
      const source = createRandomEvent(venue.id)
      const event = await prisma.event.create({
        data: source
      })
      events.push(event)

      for (let i = 0; i < 4; i++) {
        const source = createRandomTicket(event.id)
        const ticket = await prisma.ticket.create({
          data: source
        })
        tickets.push(ticket)
      }

    }

  }
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })


