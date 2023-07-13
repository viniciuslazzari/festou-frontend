import { FaCalendar, FaMap, FaMoneyBill, FaSearch, FaStar, FaUser } from "react-icons/fa"
import { borderColor, white } from "../../utils/colors"
import Button from "../button/Button"
import Input from "../input/Input"
import "./FilterSection.css"

const FilterSection = () => {
  return (
    <div className="filter">
      <div className="filter-content" style={{ borderColor: borderColor }}>      
        <p className="filter-title" style={{ color: white, marginTop: "0px" }}>Filters</p>
        <p className="filter-title" style={{ color: white, fontSize: "16px" }}>Location</p>
        <Input icon={FaMap} placeholder="Search by location" onChange={() => {}} />
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
        <Button icon={<FaSearch />} marginTop="40px" onClick={() => {}} text="Aplly filters" backgroundColor={white} color="black" width="100%"/>
      </div>
    </div>
  )
}

export default FilterSection