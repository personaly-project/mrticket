import React, { useEffect, useState } from "react"
import { Venue } from "@prisma/client"
import { useCreateVenue } from "@/lib/hooks"
import Input from "@/components/ui/Input"

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
    <div className="shadow rounded">
      <h3 className="text-center text-lg font-semibold my-2 border-b">
        {" "}
        Create a venue{" "}
      </h3>
      <form className="space-y-2 " onSubmit={onVenueSubmitted}>
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
          <p> Loading </p>
        ) : (
          <div className="flex flex-row justify-between gap-4 pt-4">
            <button
              type="reset"
              className="py-2 px-4 rounded-md shadow w-32 self-end  bg-lightblue  text-black hover:text-danger"
            >
              Reset
            </button>
            <button
              type="submit"
              className="py-2 px-4 rounded-md shadow w-32 self-end  bg-purple-light  text-black hover:bg-yellow"
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
