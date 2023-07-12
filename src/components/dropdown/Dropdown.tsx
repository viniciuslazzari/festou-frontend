import { useCallback, useState } from "react"
import "./Dropdown.css"
import { primaryGrey, white } from "../../utils/colors"
import { useNavigate } from "react-router-dom"

interface IDropdownOption {
  path: string,
  label: string,
  icon?: JSX.Element
}

interface IDropdown {
  options: IDropdownOption[],
  element: React.ReactNode
  width: string
}

const Dropdown = (props: IDropdown) => {
  const [isActive, setIsActive] = useState<boolean>(false);

  let navigate = useNavigate();

  const handleOptionClick = useCallback((path: string) => {
    setIsActive(false)
    navigate(path)
  } ,[navigate])

  const handleClick = useCallback(() => {
    setIsActive(!isActive)
  } ,[isActive])

  return(
    <div>
      <div className="dropdown-element" onClick={() => handleClick()}>{props.element}</div>
      <div 
        style={{ 
          width: props.width, 
          visibility: isActive ? "visible" : "hidden", 
          backgroundColor: primaryGrey,
          right: props.width
        }} 
        className="dropdown-options"
      >
        {props.options.map(option => {
          return (
            <div 
              onClick={() => handleOptionClick(option.path)} 
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

export default Dropdown