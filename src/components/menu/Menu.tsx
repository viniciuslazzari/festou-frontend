import { FaUser } from "react-icons/fa"
import Button from "../button/Button"
import ProfileIcon from "../profile-icon/ProfileIcon"
import Search from "../search/Search"
import "./Menu.css"

const Menu = () => {
  return (
    <div className="bar-div">
      <label className="logo"> 🎉 &nbsp; Festou </label>
      <Search />
      <div className="left_wrapper">
        {/* <label className="salute"> Olá, Diggo </label>
        <ProfileIcon img="assets/profile.jpg" /> */}
        <Button text="Login" width="100px" backgroundColor="transparent" color="white"/>
        <Button text="Sign in" icon={<FaUser />} width="100px" backgroundColor="white" color="black"/>
      </div>
    </div>
  )
}

export default Menu