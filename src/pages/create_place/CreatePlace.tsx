import { useCallback, useEffect, useState, useContext } from "react"
import Input from "../../components/input/Input"
import "./CreatePlace.css"
import Button from "../../components/button/Button"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { toast } from "react-hot-toast"
import { redColor, white } from "../../utils/colors"
import UserContext from "../../context/UserContext"
import { FaCheck, FaChevronLeft, FaStar, FaTimes, FaUser } from "react-icons/fa"
import React from "react"
import { setDefaultResultOrder } from "dns"
import LoginPopup from "../../components/login-popup/LoginPopup"
import Dropdown from "../../components/dropdown/Dropdown"
import ProfileIcon from "../../components/profile-icon/ProfileIcon"



const CreatePlace = () => {
  const [placeName, setPlaceName] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [capacity, setCapacity] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [termsofuse, setTermsofuse] = useState<string>("");
  const [loginPopup, setLoginPopup] = useState<boolean>(true);
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);

  const options = [
    { label: "My profile", path: "/profile", icon: <FaUser /> },
    { label: "Logout", path: "/logout", icon: <FaChevronLeft /> },
  ]
  
  let user = useContext(UserContext);
  let navigate = useNavigate();

  useEffect(() => {
    if (!placeName || placeName === "") { setButtonDisabled(true); return };
    if (!price || price === "") { setButtonDisabled(true); return };
    if (!capacity || capacity === "") { setButtonDisabled(true); return };
    if (!description || description === "") { setButtonDisabled(true); return };
    if (!termsofuse || termsofuse === "") { setButtonDisabled(true); return };
    if (!user.state.isLoggedIn) { setButtonDisabled(true); return };
    
    setButtonDisabled(false);
  }, [placeName, price, capacity, description, location])

  const serializeData = useCallback(() => {
    const data = {
      "name": placeName,
      "price": price,
      "capacity": capacity,
      "description": description,
      "location": location,
      "terms_of_use": termsofuse,
      "id_user": user.state.id,
      "score": "0"
    }

    return data
  }, [placeName, price, capacity, description, location, termsofuse])

  const handleSubmit = useCallback(() => {
    const data = serializeData();
    axios.post('http://127.0.0.1:8000/festou-api/v1/place', data)
      .then(function (response) {
        toast.success("Place Created!")
        navigate("/")
      })
      .catch(function (error) {
        toast.error(error.response.data.description)
      });
  }, [navigate, serializeData])

  const login = useCallback(() => {
    setLoginPopup(true)
  }, [])

  const onClosePopup = useCallback(() => {
    setLoginPopup(false)
  }, [])

  const handleSignupClick = useCallback(() => {
    navigate("/signup");
  }, [navigate])

  const handleLogoClick = useCallback(() => {
    navigate("/");
  }, [navigate])

  const handleCreatePlaceClick = useCallback(() => {
    navigate("/createplace");
  }, [navigate])
  

  return (
    <div className="create-place">
      <div className="bar-div">
      <label onClick={() => handleLogoClick()} className="logo" style={{ color: white }}> 🎉 &nbsp; Festou </label>
      <div className="left_wrapper">
        {user.state.isLoggedIn ? 
          <>
            <label className="salute" style={{ color: white }}> Hello, {user.state.name} </label>
            <Dropdown element={<ProfileIcon img="assets/profile.png" />} options={options} width="200px"></Dropdown>
          </>
          :
          <>
            <LoginPopup onClosePopup={onClosePopup} loginPopup={loginPopup}/>
            <Button onClick={login} text="Login" width="100px" backgroundColor="transparent" color={white}/>
            <Button onClick={() => handleSignupClick()} text="Sign up" icon={<FaUser />} width="100px" backgroundColor={white} color="black"/>
          </>
        }       
      </div>
    </div>
      <div className="form-wrapper-create-place">
        <div className="form-create-place">
          <div
            style={{
              color: white,
              fontSize: "36px",
              fontWeight: "700",
              marginBottom: "30px",
              textAlign: "center"
            }}
            >Describe the place that you want to add!</div>
          <Input label="Place Name" placeholder="Enter the name of the place" onChange={setPlaceName}/>
          <div className="divisory">
            <Input label="Price" placeholder="Enter the price of your place" onChange={setPrice}/>
            <Input label="Capacity" placeholder="Enter the capacity of the place" onChange={setCapacity}/>
          </div>
          <Input label="Location" placeholder="Enter the location of your place" onChange={setLocation}/>
          <Input label="Description" placeholder="Enter a brief description of your place" onChange={setDescription}/>
          <Input label="Terms of Use" placeholder="Enter the terms of use of your place" onChange={setTermsofuse}/>
           
          <Button 
            disabled={buttonDisabled} 
            marginTop= "20px"
            text="Create place" 
            backgroundColor={white} 
            color="black"
            icon={<FaCheck />}
            width="100%" 
            onClick={() => handleSubmit()} 
          />
          
          
          
        </div>
      </div>   
      <div className="picture-wrapper-create-place">
        <div className="picture-create-place">
        </div>
      </div>   
    </div>
  ) 
}

export default CreatePlace