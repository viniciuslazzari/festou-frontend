import { ComponentType } from "react"
import "./Input.css"
import { IconBaseProps } from "react-icons"
import { labelBackground, labelInput, white } from "../../utils/colors"

interface IInput {
  icon?: ComponentType<IconBaseProps>
  label?: string
  onChange: (e: File | null) => any
  mask?: (e: any) => any
  acceptedFormats: string[]
}

const InputImage = (props: IInput) => {
  return (
    <div className="element-wrapper">
      {props.label ? <p className="input-label" style={{ color: labelInput }}>{props.label}</p> : <></>} 
      <div className="input-wrapper" style={{ marginBottom: props.label ? "20px" : "0px" }}>
        {props.icon ? <props.icon className="input-icon" style={{ color: labelBackground }}/> : <></>}
        <input 
          style={{ marginLeft: props.icon ? "20px" : "0px", color: white }} 
          className="input"
          onChange={e => props.onChange(e.target.files ? e.target.files[0] : null)}
          type="file"
          alt="fdoskfodskof"
        >  
        </input>
      </div>
    </div>
  )
}

export default InputImage