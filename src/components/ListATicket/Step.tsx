import React from 'react'

interface IProps {
    children: React.ReactNode,
    next: () => void,
    tittle: string
}

const Step: React.FC<IProps> = ({ children, next, tittle }) => {
    return (
        <div className='flex flex-col' >
            <h3 className='text-lg font-semibold border-t border-t-slate-200' > Select a {tittle}</h3>
            {children}
            <button onClick={next} className='p-2 bg-blue-600 rounded-md shadow text-white w-32 self-end'>
                Next
            </button>
        </div>
    )
}

export default Step