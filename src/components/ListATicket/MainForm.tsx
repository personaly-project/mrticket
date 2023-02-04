import React from 'react'

interface IProps {
    children: React.ReactNode,
    tittle: string,
}

const MainForm: React.FC<IProps> = ({ children, tittle }) => {
    return (
        <div>
            <h3 className='font-semibold' >{tittle}</h3>
            {
                children
            }
        </div>
    )
}

export default MainForm