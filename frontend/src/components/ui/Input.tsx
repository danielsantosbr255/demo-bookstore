import type { InputHTMLAttributes } from "react";

const Input = ({ type, ...props }: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={props.name}>{props.name}</label>
      <input
        {...props}
        type={type}
        className="border-b border-gray-400 focus:border-primary pb-2 outline-none transition-colors"
        id={props.name}
      />
    </div>
  );
};

export default Input;
