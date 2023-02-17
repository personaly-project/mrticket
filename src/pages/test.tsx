import React, { useContext, useRef } from 'react'
import { ProtectedRoute } from '@/components/Auth'
import { authCtx } from '@/lib/context/Auth/authContext'

const Test = () => {

    const fileInputRef = useRef<HTMLInputElement>(null)
    const { user } = useContext(authCtx)

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (fileInputRef.current?.files?.length) {

            const data = new FormData()
            const target: File = fileInputRef.current?.files[0]
            data.append("image", target)
            data.append("ticketId", "this-is-the-ticketId")
            fetch(`/api/user/${user?.id}/ticket/images`, {
                method: "POST",
                body: data
            })

        } else {
            console.error("not file submitted")
        }
    }

    return (
        <div className='min-h-screen flex items-center justify-center' >
            <form onSubmit={onSubmit} className="flex flex-col gap-2">
                <input required ref={fileInputRef} type="file" name='file' placeholder='upload an image' accept='image/png, image/jpeg, image/svg' />
                <button type='submit' className='bg-purple-dark text-white px-4 py-2 rounded' > submit </button>
            </form>
        </div>
    )
}

export default Test