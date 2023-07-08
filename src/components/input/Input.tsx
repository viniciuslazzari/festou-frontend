import { ComponentType, useEffect, useState } from "react"
import "./Input.css"
import { IconBaseProps } from "react-icons"
import { backgroundColor, labelBackground, labelInput, primaryGrey, white } from "../../utils/colors"

interface IInput {
  icon?: ComponentType<IconBaseProps>
  label: string
  placeholder: string
  type?: string
  onChange: (e: any) => any
  mask?: (e: any) => any
}

const Input = (props: IInput) => {
  const [currentValue, setCurrentValue] = useState<string>();

  useEffect(() => {
    props.onChange(currentValue)
  }, [currentValue, props])

  return (
    <div className="element-wrapper">
      <p className="input-label" style={{ color: labelInput }}>{props.label}</p>
      <div className="input-wrapper">
        {props.icon ? <props.icon className="input-icon" style={{ color: labelBackground }}/> : <></>}
        <input 
          value={currentValue}
          style={{ marginLeft: props.icon ? "20px" : "0px", color: white }} 
          className="input" 
          onChange={e => setCurrentValue(props.mask ? props.mask(e.target.value) : e.target.value)}
          type={props.type ? props.type : "text"}
          placeholder={props.placeholder}>  
        </input>
      </div>
    </div>
  )
}

export default Input