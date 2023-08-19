import "./ButtonBorder.css"
import { ReactNode } from "react"

interface IButtonBorder {
    text: string
    backgroundColor: string
    color: string
    width: string
    icon?: ReactNode
    fontSize?: string
    onClick: () => any
    marginTop?: string
    disabled?: boolean
}

const ButtonBorder = (props: IButtonBorder) => {
  return (
    <div 
      className="button-border" 
      onClick={props.disabled ? () => {} : () => props.onClick()}
      style={{ 
        fontSize: props.fontSize,
        marginTop: props.marginTop, 
        width: props.width, 
        backgroundColor: props.backgroundColor, 
        opacity: props.disabled ? "0.5" : "1",
        cursor: props.disabled ? "not-allowed" : "pointer",
        color: props.color 
      }}
    >
      <div style={{ marginRight: "10px", marginTop: "4px" }}>{props.icon}</div>
      <p>{props.text}</p>
    </div>
  )
}

export default ButtonBorder