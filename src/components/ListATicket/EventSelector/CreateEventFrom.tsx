import React, { useEffect, useState } from "react";
import { Event } from "@prisma/client";
import { useCreateEvent } from "@/lib/hooks/";
import Input from "@/components/ui/Input";

interface IProps {
  onSubmit: (event: Event, venueID: string) => void;
  venueId: string;
}

const CreateEventFrom: React.FC<IProps> = ({ onSubmit, venueId }) => {
  const [loading, setIsLoading] = useState<boolean>(false);
  const {
    eventType,
    updateEventType,
    startHour,
    updateStartHour,
    date,
    updateDate,
    title,
    updateTitle,
    updatePerformers,
    eventSpecs,
    updateEventSpecs,
    getEvent,
  } = useCreateEvent(venueId);

  const onEventSubmitted = async (e: React.FormEvent<HTMLFormElement>) => {
    debugger;
    e.preventDefault();
    const eventSrc = getEvent();
    if (eventSrc) {
      setIsLoading(true);
    }
  };

  useEffect(() => {
    const eventSrc = getEvent();
    if (loading && eventSrc) {
      fetch("/api/tickets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventSrc),
      })
        .then((resp) => resp.json())
        .then((event) => {
          onSubmit(event, venueId);
          setIsLoading(false);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  const [performers, setPerformers] = useState<string[]>([]);
  const [newPerformer, setNewPerformer] = useState<string>("");

  const handleAddPerformer = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPerformers([...performers, newPerformer]);
    setNewPerformer("");
  };

  return (
    <div className="shadow rounded p-4">
      <h3 className="text-lg font-semibold my-2 border-b border-b-slate-200">
        {" "}
        Create an event{" "}
      </h3>
      <form className="space-y-2" onSubmit={onEventSubmitted}>
        <select>
          <option>concert</option>
          <option>show</option>
          <option>stand-up</option>
        </select>
        <Input title="date" value={date} type="date" listener={updateDate} />
        <Input
          title="time"
          value={startHour}
          type="time"
          listener={updateStartHour}
        />
        <Input
          title="Title of the Event"
          value={title}
          type="text"
          placeholder="Title of the Event"
          listener={updateTitle}
        />

        <Input
          title="Specs of the Event"
          value={eventSpecs}
          type="text"
          placeholder="Specs of the Event"
          listener={updateEventSpecs}
        />
        {loading ? (
          <p> Loading </p>
        ) : (
          <>
            <button
              type="submit"
              className="p-2 bg-blue-600 rounded-md shadow text-white w-32 self-end"
            >
              Submit
            </button>
            <button
              type="reset"
              className="p-2 bg-red-600 rounded-md shadow text-white w-32 self-end"
            >
              Reset
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default CreateEventFrom;
