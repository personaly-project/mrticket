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
}

const CreateTicketForm: FC<IProps> = ({ onSubmit, eventId }) => {
  const { user } = useContext(authCtx);
  const [loading, setIsLoading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { price, updatePrice, title, updateTitle, getTicketSrcData } =
    useCreateTicket(eventId, user!.id);

  const onTicketSrcSubmitted = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const src = getTicketSrcData();
    if (src) {
      setIsLoading(true);
      if (fileInputRef.current?.files?.length) {
        const data = new FormData();
        const target: File = fileInputRef.current?.files[0];
        data.append("image", target);
        data.append("ticketId", "this-is-the-ticketId");
        fetch(`/api/user/${user?.id}/ticket/images`, {
          method: "POST",
          body: data,
        });
      } else {
        console.error("not file submitted");
      }
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
          ref={fileInputRef}
          type="file"
          name="file"
          placeholder="Upload your ticket Bar Code or QR Code"
          accept="image/png, image/jpeg, image/svg"
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
