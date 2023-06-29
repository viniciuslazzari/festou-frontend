//import { useLocation } from "react-router-dom";
import "./Space.css"
import Menu from "../../components/menu/Menu";
import Tabs from "../../components/tabs/Tabs";

const Space = () => {
  //const { state } = useLocation();
  
  return (
    <div>
      <Menu />
      <div className="details">
        <div className="details-content">
          <img className="details-image" src="assets/1.jpg" alt="Result 1"/>
          <Tabs labels={["ex1", "ex2"]} tabs={[]} />
        </div>
        <div className="book-card"></div>
      </div>
    </div>
  )
}

export default Space