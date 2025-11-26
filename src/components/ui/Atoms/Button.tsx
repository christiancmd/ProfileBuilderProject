interface ButtonProps {
    id? : string;
    children: React.ReactNode;
    className: string;
    type: 'button' | 'submit' | 'reset';
}

export default  function Button({id, children, className, type = 'button'}: ButtonProps) {
  return (
    <button 
        id={id}
        type={type}
        className={className ? `${className} cursor-pointer transition duration-300` : "border px-8 py-4 rounded-lg"}>
        {children}
    </button>
  )
}
