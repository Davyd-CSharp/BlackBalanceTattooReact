import { Checkbox } from "@mui/material";
import React, { ChangeEvent } from "react";

interface MyCheckboxProps {
    onChange: (e : ChangeEvent<HTMLInputElement>) => void,
    label: string,
    isChecked: boolean
}

const MyCheckbox = ({
    onChange,
    label,
    isChecked,
    ...props
} : MyCheckboxProps) => {

    return (
        <div className="my-checkbox">
            <Checkbox 
                {...props}
                onChange={onChange} 
                checked={isChecked ?? false}
            />    
            <span>{label}</span>               
        </div>
    );
}

export default MyCheckbox;