import React, { useEffect, useState } from "react"
import { IEvent } from "@/lib/types"
import { useCreateEvent } from "@/lib/hooks/"
import Input from "@/components/ui/Input"
import { BiCalendarEvent } from "react-icons/bi"

interface IProps {
  onSubmit: (event: IEvent, venueID: string) => void
  venueId: string
}

const CreateEventFrom: React.FC<IProps> = ({ onSubmit, venueId }) => {
  const [loading, setIsLoading] = useState<boolean>(false)
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
  } = useCreateEvent(venueId)

  const onEventSubmitted = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const eventSrc = getEvent()
    if (eventSrc) {
      setIsLoading(true)
    }
  }

  useEffect(() => {
    const eventSrc = getEvent()
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
          onSubmit(parsed.data, venueId)
          setIsLoading(false)
        })
        .catch((err) => console.log(err))
    }
    setIsLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading])

  const [performers, setPerformers] = useState<string[]>([])
  const [newPerformer, setNewPerformer] = useState<string>("")

  const handleAddPerformer = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setPerformers([...performers, newPerformer])
    setNewPerformer("")
  }

  return (
    <div className="shadow rounded-2xl p-3 ">
      <div className="flex flex-row gap-2 items-center justify-center border-b mx-4">
        <h3 className="text-center text-lg font-semibold my-2 ">
          Create an event{" "}
        </h3>
        <BiCalendarEvent size={20} />
      </div>
      <form className="space-y-5 text-med p-6" onSubmit={onEventSubmitted}>
        <select
          className=" "
          value={eventType}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            updateEventType(e.target.value)
          }
        >
          <h2>event type</h2>
          <option value={"concert"}>concert</option>
          <option value={"show"}>show</option>
          <option value={"stand-up"}>stand-up</option>
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
          <div className="flex flex-row justify-between gap-4 pt-4">
            <button
              type="reset"
              className="border-0 py-2 px-4 
                rounded-md shadow w-32 self-end  
                bg-purple-dark font-semibold text-white
                hover:bg-lightblue hover:text-danger"
            >
              Reset
            </button>
            <button
              type="submit"
              className="border-0 py-2 px-4 
                rounded-md shadow w-32 self-end  
                bg-purple-medium  font-semibold text-white  
                hover:bg-yellow"
            >
              Submit
            </button>
          </div>
        )}
      </form>
    </div>
  )
}

export default CreateEventFrom
