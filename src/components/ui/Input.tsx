import React from 'react'

interface IProps {
    title: string,
    value: string,
    listener: (src: string) => void,
    placeholder: string
}

const Input: React.FC<IProps> = ({ title, value, placeholder, listener }) => {

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        listener(e.target.value)
    }

    return (
        <div className='flex flex-row justify-between max-w-sm'>
            <label htmlFor={title} className="font-semibold" > {title} </label>
            <input required placeholder={placeholder} className="p-1 border rounded border-slate-300" type="text" value={value} onChange={onChange} />
        </div>
    )
}

export default Input