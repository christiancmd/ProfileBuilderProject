interface TextareaProps {
    id?: string;
    name?: string;
    placeholder: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function Textarea({id, name , placeholder, value, onChange}: TextareaProps) {
  return (
    <textarea
      id={id}
      name={name}
      rows={5}
      placeholder={placeholder}
      required
      value={value}
      onChange={onChange}
      className="w-full p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-teal-600 resize-none"
    />
  );
}
