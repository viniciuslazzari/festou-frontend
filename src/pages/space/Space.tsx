import { useLocation } from "react-router-dom";
import "./Space.css"
import Menu from "../../components/menu/Menu";
import Tabs from "../../components/tabs/Tabs";
import { FaCalendar, FaCamera, FaHeart, FaStar } from "react-icons/fa";
import { primaryGrey, white } from "../../utils/colors";
import Button from "../../components/button/Button";
import Input from "../../components/input/Input";
import Scores from "../../components/scores/Scores";
import { useCallback, useContext } from "react";
import UserContext from "../../context/UserContext";
import toast from "react-hot-toast";

const Space = () => {
  const { state } = useLocation();
  
  let user = useContext(UserContext)

  const handleClick = useCallback(() => {
    if (!user.state.isLoggedIn) toast.error("You need to be logged in to perform this action!")

    const body = {
      
    }
  }, [user.state.isLoggedIn])
  
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
            ]}
            labels={["Photos", "Description", "Avaliations"]} 
            tabs={[
              <div>teste1</div>,
              <div>teste1</div>,
              <Scores placeId={state.id}/>,
            ]} 
          />
        </div>
        <div className="book-card" style={{ backgroundColor: primaryGrey }}>
          <p style={{ color: white, fontSize: "23px", fontWeight: 700, marginBottom: "10px" }}>R$ 450 noite</p>
          <p style={{ color: white }}> <FaStar style={{ color: "yellow" }} /> 4.5 - 18 comentários</p>
          <div style={{ marginBottom: "20px", marginTop: "20px" }} className="divisory">
            <Input icon={FaCalendar} placeholder="00/00/0000" onChange={() => {}}></Input>
            <Input icon={FaCalendar} placeholder="00/00/0000" onChange={() => {}}></Input>
          </div>
          <Button text="Book now" backgroundColor={white} color="black" width="100%" onClick={() => handleClick()}></Button>
        </div>
      </div>
    </div>
  )
}

export default Space