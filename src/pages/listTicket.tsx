import { FC } from 'react'
import { GetServerSideProps } from 'next'
import { venuesApi } from '@/services/prisma'
import { Venue } from '@prisma/client'
import ListATicket from '@/components/ListATicket'
import { ProtectedRoute } from '@/components/Auth'

interface IPageProps {
    venues: Venue[]
}

const listATicketPage: FC<IPageProps> = ({ venues }) => {

    return (
        <ProtectedRoute>
            <ListATicket venues={venues} />
        </ProtectedRoute>
    )
}

export default listATicketPage

export const getServerSideProps: GetServerSideProps = async (context) => {
    const venues = await venuesApi.getAllVenues()
    return {
        props: {
            venues
        }
    }
}