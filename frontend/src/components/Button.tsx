import {ReactNode} from "react";

interface ButtonProps {
    variant: "primary" | "secondary",
    size:  "sm" | "md" | "lg",
    text: string,
    startIcon?: ReactNode,
    endIcon?: ReactNode,
    onClick: () => void;
}

const variantStyles = {
    primary: "bg-purple-600 text-white",
    secondary: "bg-purple-300 text-purple-300"
}

const defaultStyles = "rounded-md flex"

const sizeStyle = {
    sm: "py-1 px-2",
    md: "py-2 px-4",
    lg: "py-4 px-6"
}

export const Button = (props: ButtonProps) => {
    return <button className={`${variantStyles[props.variant]} ${defaultStyles} ${sizeStyle[props.size]}`}>
        {props.startIcon ? <div className="pr-2">{props.startIcon}</div> : null} {props.text} {props.endIcon}
    </button>
}