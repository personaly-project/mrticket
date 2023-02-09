import { useState } from "react";
import { INewEventSrcData } from "../types";

export const useCreateEvent = (venueId: string) => {
  const [eventType, setEventType] = useState<string>("");
  const [startHour, setStartHour] = useState<Date>();
  const [date, setDate] = useState<Date>();
  const [title, setTitle] = useState<string>("");
  const [performers, setPerformers] = useState<string[]>([]);
  const [eventSpecs, setEventSpecs] = useState<string>("");

  const updateEventType = (src: string) => {
    setEventType(src);
  };

  const updateStartHour = (src: Date) => {
    setStartHour(src);
  };

  const updateDate = (src: Date) => {
    setDate(src);
  };

  const updateTitle = (src: string) => {
    setTitle(src);
  };

  const updatePerformers = (src: string[]) => {
    setPerformers(src);
  };

  const updateEventSpecs = (src: string) => {
    setEventSpecs(src);
  };

  const getEvent = (): INewEventSrcData | null => {
    if (performers && title && startHour && eventType && date) {
      return {
        eventType,
        startHour,
        date,
        title,
        performers,
        eventSpecs: null,
        venueId,
      };
    }
    return null;
  };

  return {
    eventType,
    updateEventType,
    startHour,
    updateStartHour,
    date,
    updateDate,
    title,
    updateTitle,
    performers,
    updatePerformers,
    eventSpecs,
    updateEventSpecs,
    getEvent,
  };
};
