const Input = ({type, placeholder, name}) => {
    return (
        <input className="bg-slate-100 text-sm border rounded-md 2-full py-2 px-3 text-slate-600 w-full" type={type} name={name} id={name} placeholder={placeholder}/>
    )
}

export default Input;