import React from "react";

interface IProps {
  title: string;
  value: any;
  type?: string;
  listener: (src: any) => void;
  placeholder?: string;
  required?: boolean
}

const Input: React.FC<IProps> = ({
  title,
  value,
  type,
  placeholder,
  listener,
  required
}) => {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    listener(e.target.value);
  };

  return (
    <div className="flex flex-row justify-between max-w-sm">
      <label htmlFor={title} className="font-semibold">
        {" "}
        {title}{" "}
      </label>
      <input
        required={required}
        placeholder={placeholder}
        className="p-1 border rounded border-slate-300"
        type={type ? type : "text"}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
