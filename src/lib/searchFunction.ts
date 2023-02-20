/** @format */
import React from "react";

export function filterObject<T>(
  inputArray: Array<T>,
  objectExample: T,
  searchQuery: string
) {
  let result: T[] = [];
  if (typeof objectExample !== "object") {
    return [];
  }
  if (!objectExample) {
    return [];
  }

  const keys: string[] = Object.keys(objectExample);

  for (let i = 0; i < inputArray.length; i++) {
    let objectToSearch: T = inputArray[i];

    // compare each key value to the objectSearch
    for (let j = 0; j < keys.length; j++) {
      let key: string = keys[j];

      let value: any = (objectToSearch as { [key: string]: any })[key];

      // if the value is a string
      if (typeof value === "string") {
        if (value.toLowerCase().includes(searchQuery.toLowerCase())) {
          result.push(objectToSearch);
          break;
        }
      }
    }
  }
  return result;
}

export const filterEventsBasedOnDate = (
  events: any[],
  tickets: any[],
  fromDate: string,
  toDate: string
) => {
  if (fromDate === "" && toDate === "") {
    return tickets;
  }
  if (fromDate.length < 1) {
    const currentDate = new Date();
    fromDate = `${currentDate.getFullYear()}-${currentDate.getMonth()}-${currentDate.getDate()}`;
  }
  if (toDate.length < 1) {
    const currentDate = new Date();
    toDate = `${
      currentDate.getFullYear() + 5
    }-${currentDate.getMonth()}-${currentDate.getDate()}`;
  }

  let fromArray: any[] = fromDate.split("-");
  let toArray: any[] = toDate.split("-");
  fromArray = fromArray.map((element) => parseInt(element));
  toArray = toArray.map((element) => parseInt(element));
  let res: any[] = [];
  events.forEach((element) => {
    return res.push({
      date: element.date.getDate(),
      month: element.date.getMonth(),
      year: element.date.getFullYear(),
      id: element.id,
    });
  });
  let filteredVenues = res.filter((element) => {
    if (
      element.year >= fromArray[0] &&
      element.year <= toArray[0] &&
      element.month >= fromArray[1] &&
      element.month <= toArray[1]
    ) {
      if (
        fromArray[1] === element.month ||
        (toArray[1] === element.month &&
          element.date >= fromArray[2] &&
          element.date <= toArray[2])
      ) {
        return element;
      }
      return element;
    }
  });
  let filteredTickets = tickets.filter((element) => {
    let found = false;
    filteredVenues.forEach((venue) => {
      if (venue.id === element.eventId) {
        found = true;
      }
    });
    if (found) {
      return element;
    }
  });
  return filteredTickets;
};
