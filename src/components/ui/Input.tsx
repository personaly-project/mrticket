import React from "react"

interface IProps {
  title: string
  value: any
  type?: string
  listener: (src: any) => void
  placeholder?: string
  required?: boolean
}

const Input: React.FC<IProps> = ({
  title,
  value,
  type,
  placeholder,
  listener,
  required,
}) => {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    listener(e.target.value)
  }

  return (
    <div className=" grid grid-cols-2 gap-4 p-1 ">
      <label htmlFor={title} className="content-end">
        {" "}
        {title}{" "}
      </label>
      <input
        required={required}
        placeholder={placeholder}
        className=" p-1 border-b-2 border-[#e5e5e5]"
        type={type ? type : "text"}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}

export default Input
