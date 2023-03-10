import Input from "@/components/ui/Input";
import { authCtx } from "@/lib/context/Auth/authContext";
import { useCreateTicket } from "@/lib/hooks";
import { INewTicketSrcData } from "@/lib/types";
import React, { FC, useContext, useEffect, useState, useRef } from "react";
import CurrencyInput from "react-currency-format";

interface IProps {
  onSubmit: (ticket: INewTicketSrcData) => void;
  eventId: string;
  reset: () => void;
  onImageUploaded: (file: File) => void
}

const CreateTicketForm: FC<IProps> = ({ onSubmit, eventId, onImageUploaded }) => {
  const { user } = useContext(authCtx);
  const [loading, setIsLoading] = useState<boolean>(false);

  const { price, updatePrice, title, updateTitle, getTicketSrcData } =
    useCreateTicket(eventId, user!.id);

  const onImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.item(0)
    if (file) onImageUploaded(file)
  }

  const onTicketSrcSubmitted = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const src = getTicketSrcData();
    if (src) {
      setIsLoading(true);
    }
  };

  useEffect(() => {
    const ticketSrc = getTicketSrcData();
    if (loading && ticketSrc) {
      onSubmit(ticketSrc);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  return (
    <form
      className="my-2 shadow rounded p-4 w-fit items-center "
      onSubmit={onTicketSrcSubmitted}
    >
      <div className="text-xxl font-bold mb-4"> Add your ticket details </div>
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
      <div>
        <input
          required
          onChange={onImage}
          type="file"
          name="file"
          placeholder="Upload your ticket Bar Code or QR Code"
          accept="image/png"
        />
      </div>

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
    </form>
  );
};

export default CreateTicketForm;
