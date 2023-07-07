import { ComponentType, useEffect, useLayoutEffect, useRef, useState } from "react"
import "./Select.css"
import { IconBaseProps } from "react-icons"

interface IOption {
  value: number,
  label: string,
  icon?: ComponentType<IconBaseProps>
}

interface ISelect {
  label: string,
  options: IOption[],
  onChange: (e: number) => any
}

const Select = (props: ISelect) => {
  const [selectedOption, setSelectedOption] = useState<IOption>(props.options[0])
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
      <p className="input-label">{props.label}</p>
      <div onClick={() => {setIsActive(!isActive)}} ref={ref} className="select">
        <p>{selectedOption.label}</p>
      </div>
      <div 
        style={{ width: optionsWidth, visibility: isActive ? "visible" : "hidden" }} 
        className="select-options"
      >
        {props.options.map(option => {
          return <div onClick={() => setSelectedOption(option)} className="select-option">{option.label}</div>
        })}  
      </div>
    </div>
  )
}

export default Select