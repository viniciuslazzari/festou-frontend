import { useEffect, useLayoutEffect, useRef, useState } from "react"
import "./Select.css"
import { labelBackground, labelInput, primaryGrey, white } from "../../utils/colors"

interface IOption {
  value: number,
  label: string,
  icon?: JSX.Element
}

interface ISelect {
  label: string,
  options: IOption[],
  onChange: (e: number) => any
}

const DEFAULT_VALUE: IOption = {
  value: 0,
  label: "Select some value"
}

const Select = (props: ISelect) => {
  const [selectedOption, setSelectedOption] = useState<IOption>(DEFAULT_VALUE)
  const [isActive, setIsActive] = useState<boolean>(false);
  const [optionsWidth, setOptionsWidth] = useState<number>(0);

  const ref = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    setOptionsWidth(ref.current ? ref.current.offsetWidth : 0);
  }, []);

  useEffect(() => {
    setIsActive(false);
    props.onChange(selectedOption.value)
  }, [props, selectedOption.value])

  return(
    <div className="select-wrapper element-wrapper">
      <p className="input-label" style={{ color: labelInput }}>{props.label}</p>
      <div 
        onClick={() => {setIsActive(!isActive)}} 
        ref={ref} 
        className="select" 
        style={{ color: selectedOption.value === 0 ? labelBackground : white }}
      >
        <div style={{ marginLeft: "-20px" }} className="select-option">{selectedOption.icon} {selectedOption.label} </div>
      </div>
      <div 
        style={{ width: optionsWidth, visibility: isActive ? "visible" : "hidden", backgroundColor: primaryGrey }} 
        className="select-options"
      >
        {props.options.map(option => {
          return (
            <div 
              onClick={() => setSelectedOption(option)} 
              className="select-option" 
              style={{ color: white }}
            >
              {option.icon}{option.label}
            </div>
          )})
        }  
      </div>
    </div>
  )
}

export default Select