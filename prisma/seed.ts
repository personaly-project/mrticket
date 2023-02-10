import { PrismaClient, Venue, Event, Ticket } from "@prisma/client";
import { faker } from "@faker-js/faker";
import { INewEventSrcData, INewTicketSrcData, INewUserSrcData, INewVenueSrcData, IUser } from "@/lib/types";

const eventTypes = ["show", "stand-up", "concert"];

const getGenNumber = (max: number) => faker.datatype.number({ min: 0, max });

const prisma = new PrismaClient();

const createRandomUser = (): INewUserSrcData => {
  return {
    avatarUrl: faker.internet.url(),
    buyHistory: [],
    email: faker.internet.email(),
    username: faker.internet.userName(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    psw: faker.internet.password(),
  }
}

const createRandomVenue = (): INewVenueSrcData => {
  return {
    address: faker.address.streetAddress(),
    city: faker.address.cityName(),
    country: faker.address.country(),
    name: "Venue Name: " + faker.lorem.words(3),
    placeType: "Place Type: " + faker.lorem.words(2),
    state: faker.address.state(),
    timezone: faker.address.timeZone(),
    venueSpecs: null,
  };
};

const createRandomEvent = (venueID: string): INewEventSrcData => {
  return {
    date: faker.date.future(),
    eventSpecs: "Event Specs: " + faker.lorem.sentences(3),
    eventType: "Event Type: " + eventTypes[getGenNumber(2)],
    performers: faker.helpers.uniqueArray(() => {
      return `performer: ${faker.random.word()}`;
    }, getGenNumber(2)),
    startHour: faker.date.future(),
    title: "Title: " + faker.lorem.words(getGenNumber(5)),
    venueId: venueID,
  };
};

const createRandomTicket = (eventId: string, sellerId: string): INewTicketSrcData => {
  return {
    sellerId,
    eventId,
    sold: false,
    imgs: faker.helpers.uniqueArray(() => {
      return `img: ${faker.random.word()}`;
    }, getGenNumber(2)),
    price: parseInt(faker.finance.amount()),
    ticket: "Ticket: " + faker.lorem.words(getGenNumber(5)),
    title: "Title of Ticket: " + faker.lorem.words(getGenNumber(4)),
    buyerId: ""
  };
};

async function main() {
  const venues: Venue[] = [];
  const events: Event[] = [];
  const tickets: Ticket[] = [];
  const users: IUser[] = [];

  for (let i = 0; i < 5; i++) {
    const src = createRandomUser()
    const user = await prisma.user.create({
      data: src
    })
    users.push(user)
  }

  for (let i = 0; i < 3; i++) {
    const source = createRandomVenue();
    const venue = await prisma.venue.create({
      data: source,
    });
    venues.push(venue);

    for (let j = 0; j < 3; j++) {
      const source = createRandomEvent(venue.id);
      const event = await prisma.event.create({
        data: source,
      });
      events.push(event);

      for (let h = 0; h < 4; h++) {
        const source = createRandomTicket(event.id, users[getGenNumber(4)].id);
        const ticket = await prisma.ticket.create({
          data: source,
        });
        tickets.push(ticket);
      }
    }
  }
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
