import React, {type TextareaHTMLAttributes} from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>{
    id?: string;
    name?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function Textarea({id, name , value, onChange, ...rest}: TextareaProps) {
  return (
    <textarea
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-teal-600 resize-none"
      {...rest}
    />
  );
}
