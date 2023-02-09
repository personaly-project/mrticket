import { PrismaClient, Venue, Event, Ticket } from "@prisma/client";
import { faker } from "@faker-js/faker";

const eventTypes = ["show", "stand-up", "concert"];

const getGenNumber = (max: number) => faker.datatype.number({ min: 0, max });

const prisma = new PrismaClient();

const createRandomVenue = () => {
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

const createRandomEvent = (venueID: string) => {
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

const createRandomTicket = (eventID: string) => {
  return {
    buyerEmail: "Buyer Email: " + faker.internet.email(),
    depositOn: "Credit Card: " + faker.finance.creditCardNumber(),
    imgs: faker.helpers.uniqueArray(() => {
      return `img: ${faker.random.word()}`;
    }, getGenNumber(2)),
    price: parseInt(faker.finance.amount()),
    sold: false,
    eventId: eventID,
    ticket: "Ticket: " + faker.lorem.words(getGenNumber(5)),
    title: "Title of Ticket: " + faker.lorem.words(getGenNumber(5)),
  };
};

async function main() {
  const venues: Venue[] = [];
  const events: Event[] = [];
  const tickets: Ticket[] = [];
  for (let i = 0; i < 3; i++) {
    console.log("creating venue ", i);
    const source = createRandomVenue();
    const venue = await prisma.venue.create({
      data: source,
    });
    venues.push(venue);

    for (let j = 0; j < 3; j++) {
      console.log("creating event ", j);
      const source = createRandomEvent(venue.id);
      const event = await prisma.event.create({
        data: source,
      });
      events.push(event);

      for (let h = 0; h < 4; h++) {
        console.log("creating ticket ", h);
        const source = createRandomTicket(event.id);
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
