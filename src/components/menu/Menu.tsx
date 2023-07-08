import { FaSearch, FaUser } from "react-icons/fa"
import Button from "../button/Button"
//import ProfileIcon from "../profile-icon/ProfileIcon"
import "./Menu.css"
import LoginPopup from "../login-popup/LoginPopup"
import { useCallback, useState } from "react"
import { useNavigate } from "react-router-dom"
import { white } from "../../utils/colors"
import Input from "../input/Input"

const Menu = () => {
  const [loginPopup, setLoginPopup] = useState(false)

  let navigate = useNavigate();

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
      <Input label="" placeholder="Search by name" onChange={() => {}} icon={FaSearch} />
      <div className="left_wrapper">
        {/* <label className="salute" style={{ color: white }}> Olá, Diggo </label>
        <ProfileIcon img="assets/profile.jpg" /> */}
        <LoginPopup onClosePopup={onClosePopup} loginPopup={loginPopup}/>
        <Button onClick={login} text="Login" width="100px" backgroundColor="transparent" color="white"/>
        <Button onClick={() => handleSignupClick()} text="Sign up" icon={<FaUser />} width="100px" backgroundColor="white" color="black"/>
      </div>
    </div>
  )
}

export default Menu