import { useLocation } from "react-router-dom";
import "./Space.css"
import Menu from "../../components/menu/Menu";
import Tabs from "../../components/tabs/Tabs";
import { FaAddressBook, FaCalendar, FaHeart, FaStar } from "react-icons/fa";
import { primaryGrey, white } from "../../utils/colors";
import Button from "../../components/button/Button";
import Input from "../../components/input/Input";
import Scores from "../../components/scores/Scores";
import { useCallback, useContext, useEffect, useState } from "react";
import UserContext from "../../context/UserContext";
import toast from "react-hot-toast";
import axios from "axios";
import { dateMask } from "../../utils/dateMask";
import LoginPopup from "../../components/login-popup/LoginPopup";

interface ISPace {
  id: number,
  name: string,
  location: string,
  description: string,
  capacity: number,
  price: number,
  score: number,
  terms_of_use: string,
  avaliations: number
}

const Space = () => {
  const [initialDate, setInitialDate] = useState<string>("");
  const [finalDate, setFinalDate] = useState<string>("");
  const [space, setSpace] = useState<ISPace | null>(null);
  const [image, setImage] = useState<string>("");
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);
  const [loginPopup, setLoginPopup] = useState<boolean>(false);

  const { state } = useLocation();
  
  let user = useContext(UserContext)

  const login = useCallback(() => {
    setLoginPopup(true)
  }, [])

  const onClosePopup = useCallback(() => {
    setLoginPopup(false)
  }, [])

  useEffect(() => {
    if (!initialDate || initialDate.length < 10) { setButtonDisabled(true); return; }
    if (!finalDate || finalDate.length < 10) { setButtonDisabled(true); return; }

    setButtonDisabled(false)
  }, [finalDate, initialDate])

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/festou-api/v1/place/' + state.id)
    .then(response => {
      setImage("data:image/jpeg;base64," + response.data.image_1);
      setSpace(response.data)
    })
    .catch(error => {
      toast.error(error.response.data.description)
    });
  }, [state.id])

  const handleClick = useCallback(() => {
    if (!user.state.isLoggedIn) {
      toast.error("You need to be logged in to perform this action!")
      login()
    }

    const body = {
      id_client: user.state.id,
      id_place: state.id,
      initial_date: initialDate,
      final_date: finalDate
    }

    axios.post('http://127.0.0.1:8000/festou-api/v1/transaction', body)
    .then(() => {
      toast.success("Booking made successfully!")
    })
    .catch(error => {
      toast.error(error.response.data.description)
    });
  }, [finalDate, initialDate, login, state.id, user.state.id, user.state.isLoggedIn])
  
  return (
    <div>
      <Menu inputFunction={() => {}}/>
      <LoginPopup onClosePopup={onClosePopup} loginPopup={loginPopup}/>
      <div className="details">
        <div className="details-content">
          <img className="details-image" src={image} alt="Result 1"/>
          <Tabs 
            icons={[
              <FaHeart />,
              <FaStar />,
              <FaAddressBook />
            ]}
            labels={["Description", "Avaliations", "Terms of use"]} 
            tabs={[
              <div style={{ color: white }}>{space?.description}</div>,
              <Scores placeId={state.id}/>,
              <div style={{ color: white }}>{space?.terms_of_use}</div>
            ]} 
          />
        </div>
        <div className="book-card" style={{ backgroundColor: primaryGrey }}>
          <p style={{ color: white, fontSize: "23px", fontWeight: 700, marginBottom: "10px" }}>{space?.name}</p>
          <p style={{ color: white, fontSize: "20px", fontWeight: 700, marginBottom: "10px" }}>R$ {space?.price}/noite</p>
          <p style={{ color: white }}> <FaStar /> {space?.score} - {space?.avaliations} avaliations</p>
          <div style={{ marginBottom: "20px", marginTop: "20px" }} className="divisory">
            <Input icon={FaCalendar} placeholder="DD/MM/AAAA" onChange={setInitialDate} mask={dateMask}></Input>
            <Input icon={FaCalendar} placeholder="DD/MM/AAAA" onChange={setFinalDate} mask={dateMask}></Input>
          </div>
          <Button disabled={buttonDisabled} text="Book now" backgroundColor={white} color="black" width="100%" onClick={() => handleClick()}></Button>
        </div>
      </div>
    </div>
  )
}

export default Space