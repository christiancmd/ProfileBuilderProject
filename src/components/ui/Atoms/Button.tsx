interface ButtonProps {
    children: React.ReactNode;
    className: string;
}

export default  function Button({children, className}: ButtonProps) {
  return (
    <button 
        className={className ? `${className} cursor-pointer transition duration-300` : "border px-8 py-4 rounded-lg"}>
        {children}
    </button>
  )
}
