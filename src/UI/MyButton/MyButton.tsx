import { Button } from "@mui/material";
import React from "react";
import './MyButton.css';

interface MyButtonProps {
    onClick: () => void,
    variant: "text" | "outlined" | "contained",
    label: string,
    startIcon?: {},
    className: string | undefined
    disabled?: boolean
}

const MyButton = ({
    onClick,
    variant,
    label,
    startIcon = {},
    className,
    disabled = false,
    ...props
} : MyButtonProps) => {
    return (
        <Button
            {...props}
            disabled={disabled}
            className={className}
            onClick={onClick}
            variant={variant}
            startIcon>
                {label}</Button>
    );
}

export default MyButton;