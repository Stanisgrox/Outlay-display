import { InputHTMLAttributes } from "react"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    innerref?: React.MutableRefObject<any>
}

export const TableInput = (props: InputProps) => {
    return (
        <input className="table-input" {...props} ref={props.innerref}/>
    )
}