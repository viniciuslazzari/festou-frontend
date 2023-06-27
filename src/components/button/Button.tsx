import "./Button.css"
import { ReactNode } from "react"

interface IButton {
    text: string
    backgroundColor: string
    color: string
    width: string
    icon?: ReactNode
    onClick: () => any
    marginTop?: string
}

const Button = (props: IButton) => {
  return (
    <div 
      className="button" 
      onClick={() => props.onClick()}
      style={{ marginTop: props.marginTop, width: props.width, backgroundColor: props.backgroundColor, color: props.color }}
    >
      <div style={{ marginRight: "10px", marginTop: "4px" }}>{props.icon}</div>
      <p>{props.text}</p>
    </div>
  )
}

export default Button