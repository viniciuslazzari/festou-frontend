//import { useLocation } from "react-router-dom";
import "./Space.css"
import Menu from "../../components/menu/Menu";
import Tabs from "../../components/tabs/Tabs";
import { FaCamera, FaHeart, FaMap, FaStar } from "react-icons/fa";
import { primaryGrey } from "../../utils/colors";

const Space = () => {
  //const { state } = useLocation();
  
  return (
    <div>
      <Menu inputFunction={() => {}}/>
      <div className="details">
        <div className="details-content">
          <img className="details-image" src="assets/4.webp" alt="Result 1"/>
          <Tabs 
            icons={[
              <FaCamera />,
              <FaHeart />,
              <FaStar />,
              <FaMap />
            ]}
            labels={["Photos", "Benefits", "Avaliations", "Map"]} 
            tabs={[
              <div>teste1</div>,
              <div>teste2</div>
            ]} 
          />
        </div>
        <div className="book-card" style={{ backgroundColor: primaryGrey }}></div>
      </div>
    </div>
  )
}

export default Space