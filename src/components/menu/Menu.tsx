import { FaChevronLeft, FaHouseUser, FaMoneyBill, FaSearch, FaUpload, FaUser } from "react-icons/fa"
import Button from "../button/Button"
import "./Menu.css"
import LoginPopup from "../login-popup/LoginPopup"
import { Dispatch, SetStateAction, useCallback, useState } from "react"
import { useNavigate } from "react-router-dom"
import { white } from "../../utils/colors"
import Input from "../input/Input"
import ProfileIcon from "../profile-icon/ProfileIcon"
import Dropdown from "../dropdown/Dropdown"
import Cookies from "js-cookie"

const options = [
  { label: "My profile", path: "/profile", icon: <FaUser /> },
  { label: "Create place", path: "/createplace", icon: <FaUpload /> },
  { label: "My Places", path: "/userPlaces", icon: <FaHouseUser /> },
  { label: "My Transactions", path: "/userTransaction", icon: <FaMoneyBill /> },
  { label: "Logout", path: "/logout", icon: <FaChevronLeft /> },
]

interface IMenu {
  inputFunction: Dispatch<SetStateAction<string>>
}

const Menu = (props: IMenu) => {
  const [loginPopup, setLoginPopup] = useState(false)

  let navigate = useNavigate();
  const username = Cookies.get('username')
  const userToken = Cookies.get('userToken')

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
      <Input placeholder="Search by name" onChange={props.inputFunction} icon={FaSearch} />
      <div className="left_wrapper">
        {userToken ? 
          <>
            <label className="salute" style={{ color: white }}> Hello, {username} </label>
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

export default Menu