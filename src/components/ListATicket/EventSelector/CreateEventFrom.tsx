import React, { useEffect, useState } from "react";
import { IEvent } from "@/lib/types";
import { useCreateEvent } from "@/lib/hooks/";
import Input from "@/components/ui/Input";

interface IProps {
  onSubmit: (event: IEvent, venueID: string) => void;
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
    e.preventDefault();
    const eventSrc = getEvent();
    if (eventSrc) {
      setIsLoading(true);
    }
  };

  useEffect(() => {
    const eventSrc = getEvent();
    if (loading && eventSrc && venueId) {
      fetch("/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventSrc),
      })
        .then((resp) => {
          if (resp.ok) {
            return resp.json()
          }
        })
        .then((parsed) => {
          onSubmit(parsed.data, venueId);
          setIsLoading(false);
        })
        .catch(err => console.log(err))
    }
    setIsLoading(false)
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
    <div className="shadow rounded p-4 w-96">
      <h3 className="text-lg font-semibold my-2 border-b border-b-slate-200">
        {" "}
        Create an event{" "}
      </h3>
      <form className="space-y-2" onSubmit={onEventSubmitted}>
        <select value={eventType} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => updateEventType(e.target.value)} >
          <option value={"concert"} >concert</option>
          <option value={"show"} >show</option>
          <option value={"stand-up"} >stand-up</option>
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
          <div className="flex flex-row items-center justify-center gap-4 pt-4">
            <button
              type="reset"
              className="py-2 px-4 bg-danger rounded-md shadow text-white w-32 self-end"
            >
              Reset
            </button>
            <button
              type="submit"
              className="py-2 px-4 bg-purple-medium rounded-md shadow text-white w-32 self-end"
            >
              Submit
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default CreateEventFrom;
