import { useLocation } from "react-router-dom";
import "./Space.css"
import Menu from "../../components/menu/Menu";
import Tabs from "../../components/tabs/Tabs";
import { FaAddressBook, FaCheck, FaHeart, FaStar } from "react-icons/fa";
import { primaryGrey, white } from "../../utils/colors";
import Button from "../../components/button/Button";
import Scores from "../../components/scores/Scores";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import LoginPopup from "../../components/login-popup/LoginPopup";
import Cookies from "js-cookie";
import Calendar from "react-calendar";
import './Calendar.css';
import { addDays } from "../../utils/addDaysToDate";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

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
  const [dates, setDates] = useState<Value>(new Date());
  const [space, setSpace] = useState<ISPace | null>(null);
  const [image, setImage] = useState<string>("");
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);
  const [daysBetween, setDaysBetween] = useState<number>(5);
  const [loginPopup, setLoginPopup] = useState<boolean>(false);

  const { state } = useLocation();
  
  const userToken = Cookies.get('userToken')
  const userId = Cookies.get('id')

  const onClosePopup = useCallback(() => {
    setLoginPopup(false)
  }, [])

  useEffect(() => {
    if (!Array.isArray(dates)) return;
    if (!dates[0] || !dates[1]) return;
    
    const oneDay = 24 * 60 * 60 * 1000;
    
    setDaysBetween(Math.round(Math.abs((dates[0].getTime() - dates[1].getTime()) / oneDay)));
  }, [dates])

  useEffect(() => {
    if (!dates || !Array.isArray(dates)) { setButtonDisabled(true); return; }

    setButtonDisabled(false)
  }, [dates])

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
    if (!userToken) {
      toast.error("You need to be logged in to perform this action!")
      return
    }

    const body = {
      id_client: userId, 
      id_place: state.id,
      initial_date: dates && Array.isArray(dates) && dates[0] ? dates[0].toLocaleDateString('en-GB') : "",
      final_date: dates && Array.isArray(dates) && dates[1] ? dates[1].toLocaleDateString('en-GB') : "",
    }

    axios.post('http://127.0.0.1:8000/festou-api/v1/transaction', body)
    .then(() => {
      toast.success("Booking made successfully!")
    })
    .catch(error => {
      toast.error(error.response.data.description)
    });
  }, [dates, state.id, userId, userToken])

  
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
          <p style={{ color: white, fontSize: "20px", fontWeight: 700, marginBottom: "10px" }}>R${space?.price}/noite</p>
          <p style={{ color: white, marginBottom: "40px" }}> <FaStar /> {space?.score} - {space?.avaliations} avaliations</p>
          <Calendar locale="en-US" onChange={setDates} defaultValue={[new Date(), addDays(new Date(), 4)]} selectRange minDate={new Date()} />
          <p
            style={{
              color: white,
              marginTop: "40px",
              fontSize: "16px",
              fontWeight: 500
            }}
          >R${space?.price} x {daysBetween} = R${space ? space.price * daysBetween : 0}</p>
          <Button icon={<FaCheck />} disabled={buttonDisabled} marginTop="40px" text="Book now" backgroundColor={white} color="black" width="100%" onClick={() => handleClick()}></Button>
        </div>
      </div>
    </div>
  )
}

export default Space