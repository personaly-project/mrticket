import { Event as PEvent } from "@prisma/client"
import React from "react"
import Image from "next/image"
import bsStarFill from "../../../../public/BsStarFill.png"
import moment from "moment"

interface IProps {
  eventsPool: PEvent[]
  onSelection: (target: number) => void
}

const EventsList: React.FC<IProps> = ({ eventsPool, onSelection }) => {
  return (
    <div>
      {eventsPool.map((event, index) => {
        return (
          <p
            className="hover:bg-purple-light rounded-md h-5 my-2 cursor-pointer flex flex-row"
            onClick={() => onSelection(index)}
            key={event.id}
          >
            {moment(event.date).format("Do - MMM YYYY, hA ddd ")} |{" "}
            {event.eventType} | {event.title}
            <Image
              src={bsStarFill}
              className="object-scale-down h-5 w-5 my-2 mx-5"
              alt=""
            />
            {" Featuring: "} {event.performers} {"   "}
          </p>
        )
      })}
    </div>
  )
}

export default EventsList
