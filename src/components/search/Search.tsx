import "./Search.css"
import { FaSearch } from "react-icons/fa";

const Search = () => {
  return (
    <div className="search">
      <FaSearch className="icon" />
      <input type="text" placeholder="Search by name..."/>
    </div>
  )
}

export default Search