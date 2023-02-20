import { Venue } from "@prisma/client"
import React from "react"
import Image from "next/image"
import bsStarFill from "../../../../public/BsStarFill.png"

interface IProps {
  venuesSrc: Venue[]
  onSelection: (target: number) => void
}

const VenuesList: React.FC<IProps> = ({ venuesSrc, onSelection }) => {
  return (
    <div>
      {venuesSrc.map((venue, index) => (
        <p
          className={`rounded-md my-2 cursor-pointer 
            flex flex-row
            px-3 items-center
            hover:px-3 hover:bg-purple-light`}
          onClick={() => onSelection(index)}
          key={venue.id}
        >
          <Image
            src={bsStarFill}
            className="object-scale-down h-5 w-5 my-2 mr-5"
            alt=""
          />
          {venue.country} | {venue.state} | {venue.city} | {venue.name}{" "}
        </p>
      ))}
    </div>
  )
}

export default VenuesList
