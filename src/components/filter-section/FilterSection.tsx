import { FaCalendar, FaMap, FaMoneyBill, FaStar, FaUser } from "react-icons/fa"
import { borderColor, white } from "../../utils/colors"
import Input from "../input/Input"
import "./FilterSection.css"
import { Dispatch, SetStateAction } from "react"

interface IFilterSection {
  locationFunction: Dispatch<SetStateAction<string>>
}

const FilterSection = (props: IFilterSection) => {
  return (
    <div className="filter">
      <div className="filter-content" style={{ borderColor: borderColor }}>      
        <p className="filter-title" style={{ color: white, marginTop: "0px" }}>Filters</p>
        <p className="filter-title" style={{ color: white, fontSize: "16px" }}>Location</p>
        <Input icon={FaMap} placeholder="Search by location" onChange={props.locationFunction} />
        <p className="filter-title" style={{ color: white, fontSize: "16px" }}>Capacity</p>
        <Input icon={FaUser} placeholder="Search by capacity" onChange={() => {}} />
        <p className="filter-title" style={{ color: white, fontSize: "16px" }}>Price</p>
        <div className="divisory">
          <Input icon={FaMoneyBill} placeholder="R$ 450" onChange={() => {}}></Input>
          <Input icon={FaMoneyBill} placeholder="R$ 600" onChange={() => {}}></Input>
        </div>
        <p className="filter-title" style={{ color: white, fontSize: "16px" }}>Date</p>
        <div className="divisory">
          <Input icon={FaCalendar} placeholder="00/00/0000" onChange={() => {}}></Input>
          <Input icon={FaCalendar} placeholder="00/00/0000" onChange={() => {}}></Input>
        </div>
        <p className="filter-title" style={{ color: white, fontSize: "16px" }}>Rating</p>
        <Input icon={FaStar} placeholder="Search by rating" onChange={() => {}} />
      </div>
    </div>
  )
}

export default FilterSection