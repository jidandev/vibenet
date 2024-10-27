/* eslint-disable react/prop-types */
const Label = ({name, children}) => {
    return (
        <label htmlFor={name} className="font-medium text-slate-600 ml-2 text-sm dark:text-white">{children}</label>
    )
}

export default Label;