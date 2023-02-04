import { Venue } from '@prisma/client'
import React from 'react'

interface IProps {
    onSubmit: (venue: Venue) => void
}

const CreateVenueForm: React.FC<IProps> = ({ onSubmit }) => {
    return (
        <div>CreateVenueForm</div>
    )
}

export default CreateVenueForm