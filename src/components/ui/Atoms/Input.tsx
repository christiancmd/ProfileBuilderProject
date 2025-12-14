interface InputProps {
  type?: string;
  id: string;
  name: string;
  placeholder?: string;
  accept?: string;
  required?: boolean;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({ type, id, name, placeholder, accept ,value, onChange, required = true }: InputProps) {
  return (
    <input
      type={type || "text"}
      id={id}
      name={name}
      required = {required}
      placeholder={placeholder}
      accept={accept}
      value={value}
      onChange={onChange}
      className="w-full p-2 inset-0  border-gray-400 rounded-md border focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-teal-600"
    />
  );
}
