import { useState } from "react"
import { INewTicketSrcData } from "../types"

export const useCreateTicket = (eventId: string, sellerId: string) => {
  const [title, setTitle] = useState<string | undefined>("")
  const [price, setPrice] = useState<number | undefined>(0)

  const updateTitle = (update: string) => {
    setTitle(update)
  }

  const updatePrice = (update: string) => {
    setPrice(parseInt(update))
  }

  const reset = () => {
    setTitle(undefined)
    setPrice(undefined)
  }

  const getTicketSrcData = (): INewTicketSrcData | null => {
    if (title && title.length > 4 && price && price > 0) {
      return {
        eventId,
        title,
        price,
        sellerId,
        imgs: ["https://picsum.photos/200", "https://picsum.photos/200"],
        sold: false,
        ticket: "https://picsum.photos/200",
      }
    }
    return null
  }

  return {
    title,
    price,
    updatePrice,
    updateTitle,
    reset,
    getTicketSrcData,
  }
}
