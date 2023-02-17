import Input from "@/components/ui/Input"
import { authCtx } from "@/lib/context/Auth/authContext"
import { useCreateTicket } from "@/lib/hooks"
import { INewTicketSrcData } from "@/lib/types"
import React, { FC, useContext, useEffect, useState } from "react"
import CurrencyInput from "react-currency-format"

interface IProps {
  onSubmit: (ticket: INewTicketSrcData) => void
  eventId: string
  reset: () => void
}

const CreateTicketForm: FC<IProps> = ({ onSubmit, eventId }) => {
  const { user } = useContext(authCtx)
  const [loading, setIsLoading] = useState<boolean>(false)

  const { price, updatePrice, title, updateTitle, getTicketSrcData } =
    useCreateTicket(eventId, user!.id)

  const onTicketSrcSubmitted = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const src = getTicketSrcData()
    if (src) {
      setIsLoading(true)
    }
  }

  useEffect(() => {
    const ticketSrc = getTicketSrcData()
    if (loading && ticketSrc) {
      onSubmit(ticketSrc)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading])

  return (
    <form
      className="my-2 shadow rounded p-4 w-fit items-center "
      onSubmit={onTicketSrcSubmitted}
    >
      <h2 className="text-xxl font-bold mb-4"> Set your ticket details </h2>
      <Input
        listener={updateTitle}
        title={"Ticket Title"}
        placeholder={"Section and Seat"}
        value={title}
        required
      />
      <Input
        listener={updatePrice}
        title={"Price $ "}
        placeholder={"$"}
        value={price}
        required
      />
      <div className="flex flex-row items-center justify-center gap-4 pt-4">
        <button
          type="reset"
          className="py-2 px-4 bg-lightblue rounded-md shadow text-black w-32 self-end hover:text-danger"
        >
          Reset
        </button>
        <button
          type="submit"
          className="py-2 px-4 bg-purple-light rounded-md shadow text-black w-32 self-end hover:bg-yellow"
        >
          Submit
        </button>
      </div>
    </form>
  )
}

export default CreateTicketForm
