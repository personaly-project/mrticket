import React, { useContext, useRef } from "react";
import { ProtectedRoute } from "@/components/Auth";
import { authCtx } from "@/lib/context/Auth/authContext";
import { GetServerSideProps } from "next";
import { s3 } from "@/services/aws";

interface IPageProps {
  signedUrl: string;
}

const UploadTicketCode: React.FC<IPageProps> = ({ signedUrl }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { user } = useContext(authCtx);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={onSubmit} className="flex flex-col gap-2">
        <input
          required
          ref={fileInputRef}
          type="file"
          name="file"
          placeholder="upload an image"
          accept="image/png, image/jpeg, image/svg"
        />
        <button
          type="submit"
          className="bg-purple-dark text-white px-4 py-2 rounded"
        >
          {" "}
          submit{" "}
        </button>
      </form>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const signedUrl = await s3.downloadFile(
    "aeb09e22-4d9f-4a02-9152-4bf6bc468048-this-is-the-ticketId.png"
  );

  return {
    props: {
      signedUrl: signedUrl,
    },
  };
};
