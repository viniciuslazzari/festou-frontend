import Popup from "../popup/Popup"
import "./LoginPopup.css"
import Button from "../button/Button"
import Input from "../input/Input"
import { FaLock, FaUser } from "react-icons/fa"
import { useEffect, useState } from "react"

interface ILoginPopup {
  onClosePopup: () => any
  loginPopup: boolean
}

const LoginPopup = (props: ILoginPopup) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <Popup onClose={props.onClosePopup} visibility={props.loginPopup}>
      <p className="popup-title">😍 &nbsp; Welcome to Festou</p>
      <Input label="Email" placeholder="Enter your email" icon={FaUser} onChange={setEmail} />
      <Input label="Password" placeholder="Enter your password" icon={FaLock} onChange={setPassword} />
      <Button marginTop="40px" text="Login" backgroundColor="white" color="black" width="100%" onClick={() => {}}/>
    </Popup>
  )
}

export default LoginPopup