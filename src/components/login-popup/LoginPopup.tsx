import Popup from "../popup/Popup"
import "./LoginPopup.css"
import Button from "../button/Button"
import Input from "../input/Input"
import { FaLock, FaUser } from "react-icons/fa"

interface ILoginPopup {
  onClosePopup: () => any
  loginPopup: boolean
}

const LoginPopup = (props: ILoginPopup) => {
  return (
    <Popup onClose={props.onClosePopup} visibility={props.loginPopup}>
      <p className="popup-title">😍 &nbsp; Welcome to Festou</p>
      <Input label="Email" placeholder="Enter your email" Icon={FaUser} />
      <Input label="Password" placeholder="Enter your password" Icon={FaLock} />
      <Button marginTop="40px" text="Login" backgroundColor="white" color="black" width="100%" onClick={() => {}}/>
    </Popup>
  )
}

export default LoginPopup