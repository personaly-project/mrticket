import { Event as PEvent } from "@prisma/client"
import React from "react"
import Image from "next/image"
import bsStarFill from "../../../../public/BsStarFill.png"
import moment from "moment"
import { AiOutlineCalendar } from "react-icons/ai"

interface IProps {
  eventsPool: PEvent[]
  onSelection: (target: number) => void
}

const EventsList: React.FC<IProps> = ({ eventsPool, onSelection }) => {
  return (
    <div>
      {eventsPool.map((event, index) => {
        return (
          <div
            className="hover:bg-purple-light items-center gap-2 rounded-xl my-2 cursor-pointer flex flex-col
             p-3 bg-[#f1f1f1] "
            onClick={() => onSelection(index)}
            key={event.id}
          >
            <div className="flex flex-row items-center gap-2">
              <AiOutlineCalendar size={20} />
              <span className="font-bold">
                {moment(event.date).format("Do - MMM YYYY, dddd @ hA  ")}
              </span>{" "}
            </div>
            {event.title} | {event.eventType}
            <div className="flex flex-row items-center gap-3 align-middle">
              <Image
                src={bsStarFill}
                className="object-scale-down h-5 w-5  items-center"
                alt=""
              />
              {" Featuring: "} {event.performers.join("  |  ")}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default EventsList
