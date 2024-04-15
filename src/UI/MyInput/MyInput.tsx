import React, { ChangeEvent, useEffect, useState } from "react";
import { BaseTextFieldProps, TextField } from "@mui/material";
import './MyInput.css';

interface MyInputProps extends BaseTextFieldProps {
    label: string,
    onChange: (e : ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
    required: boolean,
    multiline?: boolean,
    maxRows?: number,
    text: string,
    rows?: number,
    className?: string,
    isQuestion?: boolean
} 

const MyInput = ({
    multiline = false,
    maxRows = 0,
    rows = 0,
    label,
    onChange,
    required,
    text,
    className = "",
    variant = 'standard',
    onBlur = () => {},
    isQuestion = false,
    ...props
} : MyInputProps) => {

    const [defaultValue, setDefaultValue] = useState(""); 
    useEffect(() => {
        setDefaultValue(text);
    }, [text]);

   return (
        <div className="my-input">
            {isQuestion ? <label className="my-input-label">{label}</label> : <></>} 
            <TextField 
                {...props}   
                fullWidth
                label={isQuestion ? "" : label}
                onChange={e => {
                    setDefaultValue(e.target.value);
                    onChange(e);
                }}
                hiddenLabel={false}
                variant="outlined"
                required={required}
                rows={rows} 
                multiline={multiline}
                maxRows={maxRows}
                className={className}
                value={defaultValue}
                onBlur={onBlur}
            />
        </div>
    );
}

export default MyInput;