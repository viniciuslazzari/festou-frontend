import { FaUser } from "react-icons/fa"
import Button from "../button/Button"
//import ProfileIcon from "../profile-icon/ProfileIcon"
import Search from "../search/Search"
import "./Menu.css"
import LoginPopup from "../login-popup/LoginPopup"
import { useCallback, useState } from "react"

const Menu = () => {
  const [loginPopup, setLoginPopup] = useState(false)

  const login = useCallback(() => {
    setLoginPopup(true)
  }, [])

  const onClosePopup = useCallback(() => {
    setLoginPopup(false)
  }, [])
  
  return (
    <div className="bar-div">
      <label className="logo"> 🎉 &nbsp; Festou </label>
      <Search />
      <div className="left_wrapper">
        {/* <label className="salute"> Olá, Diggo </label>
        <ProfileIcon img="assets/profile.jpg" /> */}
        <LoginPopup onClosePopup={onClosePopup} loginPopup={loginPopup}/>
        <Button onClick={login} text="Login" width="100px" backgroundColor="transparent" color="white"/>
        <Button onClick={() => {}} text="Sign in" icon={<FaUser />} width="100px" backgroundColor="white" color="black"/>
      </div>
    </div>
  )
}

export default Menu