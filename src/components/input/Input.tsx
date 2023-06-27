import { ComponentType } from "react"
import "./Input.css"
import { IconBaseProps } from "react-icons"

interface IInput {
  Icon: ComponentType<IconBaseProps>
  label: string
  placeholder: string
}

const Input = (props: IInput) => {
  return (
    <div>
      <p className="input-label">{props.label}</p>
      <div className="input-wrapper">
        <props.Icon className="input-icon"/>
        <input className="input" type="text" placeholder={props.placeholder}></input>
      </div>
    </div>
  )
}

export default Input