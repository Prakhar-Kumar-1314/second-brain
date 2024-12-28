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
    secondary: "bg-purple-300 text-purple-400"
}

const defaultStyles = "px-4 py-2 rounded-md font-light flex justify-center items-center"

const sizeStyle = {
    sm: "py-0.5 px-2",
    md: "py-1 px-3",
    lg: "py-4 px-6"
}

export const Button = (props: ButtonProps) => {
    return <button className={`${variantStyles[props.variant]} ${defaultStyles} ${sizeStyle[props.size]}`}>
        {props.startIcon ? <div className="pr-2">{props.startIcon}</div> : null} {props.text} {props.endIcon}
    </button>
}