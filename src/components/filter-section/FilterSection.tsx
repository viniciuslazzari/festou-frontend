import Button from "../button/Button"
import "./FilterSection.css"

const FilterSection = () => {
  return (
    <div className="filter">
      <div className="filter-content">      
        <p className="filter-title">Filters</p>
        <Button text="Aplly filters" backgroundColor="white" color="black" width="100%"/>
      </div>
    </div>
  )
}

export default FilterSection