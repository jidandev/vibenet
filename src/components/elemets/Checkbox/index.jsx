/* eslint-disable react/prop-types */
import Label from "./Label";
import Input from "./Input";

const Checkbox = ({name, label}) => {
    return (
        <div className="">
            <Input name={name} />
            <Label name={name}>{label}</Label>
        </div>
    )
}

export default Checkbox;