interface ButtonProps {
    id? : string;
    children: React.ReactNode;
    className: string;
    type: 'button' | 'submit' | 'reset';
    onClick?: () => void;
}

export default  function Button({id, children, className,  onClick ,type = 'button'}: ButtonProps) {
  return (
    <button 
        id={id}
        type={type}
        onClick={onClick}
        className={className ? `${className} cursor-pointer transition duration-300` : "border px-8 py-4 rounded-lg"}>
        {children}
    </button>
  )
}
