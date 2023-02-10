/** @format */

export interface IEvent {
  id: string;
  eventType: string;
  startHour: Date;
  date: Date;
  title: string;
  performers: string[];
  eventSpecs: string | null;
  venueId: string;
}

export interface ISearchQ<T> {
  target: string;
  value: T;
}

export interface INewEventSrcData {
  eventType: string;
  startHour: Date;
  date: Date;
  title: string;
  performers: string[];
  eventSpecs: string | null;
  venueId: string;
}

export interface INewTicketSrcData {
  title: string;
  ticket: string;
  sold: boolean;
  price: number;
  imgs: string[];
  eventId: string;
  sellerId: string;
  buyerId: string
}

export interface INewVenueSrcData {
  address: string;
  city: string;
  country: string;
  name: string;
  placeType: string;
  state: string;
  timezone: string;
  venueSpecs: string | null;
}

export interface INewUserSrcData {
  psw: string,
  email: string,
  username: string,
  firstName: string,
  lastName: string,
  avatarUrl: string,
  buyHistory: []
}

export interface ICity {
  name: string;
  events: IEvent[];
}

export interface ICountry {
  name: string;
  cities: ICity[];
}

export interface IUser {
  id: string,
  psw: string,
  email: string,
  username: string,
  firstName: string,
  lastName: string,
  avatarUrl: string,
  buyHistory: string[]
}

export interface ITicket {
  id: string
  title: string
  ticket: string
  sold: string
  seller: string
  sellerId: string
  price: string
  imgs: string[]
  eventId: string
}
