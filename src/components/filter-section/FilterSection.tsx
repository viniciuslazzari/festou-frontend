import { borderColor, white } from "../../utils/colors"
import Button from "../button/Button"
import "./FilterSection.css"

const FilterSection = () => {
  return (
    <div className="filter">
      <div className="filter-content" style={{ borderColor: borderColor }}>      
        <p className="filter-title" style={{ color: white }}>Filters</p>
        <Button onClick={() => {}} text="Aplly filters" backgroundColor="white" color="black" width="100%"/>
      </div>
    </div>
  )
}

export default FilterSection