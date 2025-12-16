import React, { type InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  name: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({
  type = "text",
  value,
  onChange,
  ...rest
}: InputProps) {

  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      className="w-full p-2 inset-0  border-gray-400 rounded-md border focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-teal-600"
      {...rest}
    />
  );
}