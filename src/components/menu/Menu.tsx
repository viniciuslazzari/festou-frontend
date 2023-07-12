import { FaSearch, FaUser } from "react-icons/fa"
import Button from "../button/Button"
//import ProfileIcon from "../profile-icon/ProfileIcon"
import "./Menu.css"
import LoginPopup from "../login-popup/LoginPopup"
import { useCallback, useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { white } from "../../utils/colors"
import Input from "../input/Input"
import UserContext from "../../context/UserContext"
import ProfileIcon from "../profile-icon/ProfileIcon"
import Dropdown from "../dropdown/Dropdown"

const options = [
  { label: "My profile", path: "/profile" },
  { label: "Logout", path: "/logout" },
]

const Menu = () => {
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
    <div className="bar-div">
      <label onClick={() => handleLogoClick()} className="logo" style={{ color: white }}> 🎉 &nbsp; Festou </label>
      <Input placeholder="Search by name" onChange={() => {}} icon={FaSearch} />
      <div className="left_wrapper">
        {user.state.isLoggedIn ? 
          <>
            <label className="salute" style={{ color: white }}> Hello, {user.state.name} </label>
            <Dropdown element={<ProfileIcon img="assets/profile.png" />} options={options} width={"100px"}></Dropdown>
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

export default Menu