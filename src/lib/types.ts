export interface ISearchQ<T> {
    target: string
    value: T
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
    title: string,
    ticket: string,
    sold: boolean,
    depositOn: number,
    price: number,
    imgs: string[],
    buyerEmail?: string,
    eventId: string
}

