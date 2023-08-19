import { Dispatch, SetStateAction, useCallback, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../context/UserContext";
import { white } from "../../utils/colors";
import Dropdown from "../dropdown/Dropdown";
import ProfileIcon from "../profile-icon/ProfileIcon";
import LoginPopup from "../login-popup/LoginPopup";
import Button from "../button/Button";
import { FaChevronLeft, FaHouseUser, FaUpload, FaUser } from "react-icons/fa";
import "./header.css"

const options = [
  { label: "My profile", path: "/profile", icon: <FaUser /> },
  { label: "Create place", path: "/createplace", icon: <FaUpload /> },
  { label: "My Places", path: "/userPlaces", icon: <FaHouseUser /> },
  { label: "Logout", path: "/logout", icon: <FaChevronLeft /> },
]

const Header = () => {
  const [loginPopup, setLoginPopup] = useState(false)

  let navigate = useNavigate();
  let user = useContext(UserContext);

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
  
  return (
    <div className="bar-div-head">
      <label onClick={() => handleLogoClick()} className="logo" style={{ color: white }}> 🎉 &nbsp; Festou </label>
      <div className="left_wrapper-head">
        {user.state.isLoggedIn ? 
          <>
            <label className="salute-head" style={{ color: white }}> Hello, {user.state.name} </label>
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
  )
}

export default Header