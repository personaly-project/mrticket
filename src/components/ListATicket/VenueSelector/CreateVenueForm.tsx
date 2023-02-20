import React, { useEffect, useState } from "react"
import { Venue } from "@prisma/client"
import { useCreateVenue } from "@/lib/hooks"
import Input from "@/components/ui/Input"
import { TbBuildingPavilon, TbLoader } from "react-icons/tb"

interface IProps {
  onSubmit: (venue: Venue) => void
}

const CreateVenueForm: React.FC<IProps> = ({ onSubmit }) => {
  const [loading, setIsLoading] = useState<boolean>(false)

  const {
    address,
    city,
    country,
    name,
    placeType,
    state,
    timezone,
    updateAddress,
    updateCity,
    updateCountry,
    updateName,
    updatePlaceType,
    updateState,
    updateTimezone,
    getVenue,
  } = useCreateVenue()

  const onVenueSubmitted = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const venueSrc = getVenue()
    if (venueSrc) {
      setIsLoading(true)
    }
  }

  useEffect(() => {
    const venueSrc = getVenue()
    if (loading && venueSrc) {
      fetch("/api/venues", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(venueSrc),
      })
        .then((resp) => resp.json())
        .then((parsed) => {
          console.log(parsed.data)
          onSubmit(parsed.data)
          setIsLoading(false)
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading])

  return (
    <div className="shadow rounded-2xl p-3 ">
      <div className="flex flex-row gap-2 items-center justify-center border-b mx-4 ">
        <h3 className="text-center text-lg font-semibold my-2  ">
          Create a venue{" "}
        </h3>
        <TbBuildingPavilon size={20} />
      </div>
      <form className="space-y-3 " onSubmit={onVenueSubmitted}>
        <Input
          title="Name"
          placeholder="Venue name"
          listener={updateName}
          value={name}
        />
        <Input
          title="Address"
          placeholder="Venue address"
          listener={updateAddress}
          value={address}
        />
        <Input
          title="City"
          placeholder="Venue city"
          listener={updateCity}
          value={city}
        />
        <Input
          title="State"
          placeholder="Venue state"
          listener={updateState}
          value={state}
        />
        <Input
          title="Country"
          placeholder="Venue country"
          listener={updateCountry}
          value={country}
        />
        <Input
          title="Timezone"
          placeholder="Venue timezone"
          listener={updateTimezone}
          value={timezone}
        />
        <Input
          title="Place type"
          placeholder="Venue type"
          listener={updatePlaceType}
          value={placeType}
        />
        {loading ? (
          <div className="flex flex-row gap 2">
            <TbLoader />
            Loading...
          </div>
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

export default CreateVenueForm
