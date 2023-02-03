import { FC, ReactNode } from 'react'
import Navbar from './Navbar'

interface IProps {
    children: ReactNode
}

const Layout: FC<IProps> = ({ children }) => {
    return (
        <div className='p-8' >
            <Navbar />
            {
                children
            }
        </div>
    )
}

export default Layout