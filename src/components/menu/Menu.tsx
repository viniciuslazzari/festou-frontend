import { FaUser } from "react-icons/fa"
import Button from "../button/Button"
//import ProfileIcon from "../profile-icon/ProfileIcon"
import Search from "../search/Search"
import "./Menu.css"
import LoginPopup from "../login-popup/LoginPopup"
import { useCallback, useState } from "react"
import { useNavigate } from "react-router-dom"

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
      <label onClick={() => handleLogoClick()} className="logo"> 🎉 &nbsp; Festou </label>
      <Search />
      <div className="left_wrapper">
        {/* <label className="salute"> Olá, Diggo </label>
        <ProfileIcon img="assets/profile.jpg" /> */}
        <LoginPopup onClosePopup={onClosePopup} loginPopup={loginPopup}/>
        <Button onClick={login} text="Login" width="100px" backgroundColor="transparent" color="white"/>
        <Button onClick={() => handleSignupClick()} text="Sign up" icon={<FaUser />} width="100px" backgroundColor="white" color="black"/>
      </div>
    </div>
  )
}

export default Menu