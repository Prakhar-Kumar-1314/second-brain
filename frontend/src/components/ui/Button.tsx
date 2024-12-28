import {ReactNode} from "react";

interface ButtonProps {
    variant: "primary" | "secondary",
    size: "sm" | "md" | "lg",
    text: string,
    startIcon?: ReactNode,
    endIcon?: ReactNode,
    onClick: () => void
 }

 const variantStyles = {
    primary: "bg-purple-600 text-white",
    secondary: "bg-purple-400 text-purple-500"
}

const defaultStyles = "py-1 px-4 rounded-md font-light flex justify-center items-center"

const sizeStyles = {
    sm: "py-1 px-2",
    md: "py-2 px-4",
    lg: "py-4 px-6",
}

export const Button = (props: ButtonProps) => {
    return <button className={`${variantStyles[props.variant]} ${defaultStyles} ${sizeStyles[props.size]}`}>
        {props.startIcon ? <div className={"pr-2"}>{props.startIcon}</div> : null} {props.text} {props.endIcon}
    </button>
}
