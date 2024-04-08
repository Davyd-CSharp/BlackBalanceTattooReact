import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, FormHelperText } from "@mui/material";
import React, { useEffect, useState } from "react";
import './MySelect.css';

interface MySelectProps {
    options: SelectOption[] | undefined,
    label: string,
    fullWidth: boolean,
    onChange: (e: SelectChangeEvent) => void,
    disabled?: boolean,
    className?: string,
    ableLongText?: boolean
}

interface SelectOption {
    Value: string | undefined,
    Label: string,
    Default: boolean
}

const MySelect = ({
    options,
    label,
    fullWidth,
    onChange,
    disabled = false,
    className = "my-select",
    ableLongText = false,
    ...props
} : MySelectProps) => {    

    const [defaultOption, setDefaultOption] = useState<SelectOption | undefined>({} as SelectOption);
    const [value, setValue] = useState<string>("");
    useEffect(() => {
        let findDefaultValue = options?.find(c => c.Default);
        if(findDefaultValue) {
            setDefaultOption(findDefaultValue);
            return;
        }          
    }, [options])

    useEffect(() => {
        setValue(defaultOption?.Value ?? "0");        
    }, [defaultOption]);
    return (
        <div className={className}>
            <FormControl 
                className="my-select-form"
                fullWidth={fullWidth}
                disabled={disabled}>
                <FormHelperText
                    className="my-select-label"
                >{label}</FormHelperText>
                <Select
                    {...props}
                    className="my-select"
                    onChange={e => {
                        setValue(e.target.value);
                        onChange(e);
                    }} 
                    value={value}                
                >                                     
                    {                    
                        options?.map(option => {
                            return <MenuItem 
                                key={option.Value}
                                value={option.Value}>
                                {option.Label}</MenuItem>
                        })
                    }
                </Select>
            </FormControl>
        </div>
    );
}

export default MySelect;
export type { SelectOption };   