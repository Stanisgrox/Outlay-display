import { InputHTMLAttributes } from "react"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {

}

export const TableInput = (props: InputProps) => {
    return (
        <input className="table-input" {...props}/>
    )
}