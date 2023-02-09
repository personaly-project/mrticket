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
  depositOn: string;
  price: number;
  imgs: string[];
  buyerEmail?: string;
  eventId: string;
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

export interface ICity {
  name: string;
  events: IEvent[];
}

export interface ICountry {
  name: string;
  cities: ICity[];
}
