import Popup from "../popup/Popup"
import "./LoginPopup.css"
import Button from "../button/Button"
import Input from "../input/Input"
import { FaLock, FaUser } from "react-icons/fa"
import { useCallback, useState } from "react"
import axios from "axios"
import toast from "react-hot-toast"
import { white } from "../../utils/colors"

interface ILoginPopup {
  onClosePopup: () => any
  loginPopup: boolean
}

const LoginPopup = (props: ILoginPopup) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const serializeData = useCallback(() => {
    const data = {
      "email": email,
      "password": password
    }

    return data
  }, [email, password])

  const handleSumbmit = useCallback(() => {
    const data = serializeData()

    axios.post('https://localhost:3001/festou-api/v1/login', data)
      .then(function (response) {
        toast.success("User created!")
      })
      .catch(function (error) {
        toast.error("Error!")
      });
  }, [serializeData])

  return (
    <Popup onClose={props.onClosePopup} visibility={props.loginPopup}>
      <p className="popup-title" style={{ color: white }}>😍 &nbsp; Welcome to Festou</p>
      <Input label="Email" placeholder="Enter your email" icon={FaUser} onChange={setEmail} />
      <Input label="Password" placeholder="Enter your password" icon={FaLock} onChange={setPassword} />
      <Button marginTop="40px" text="Login" backgroundColor="white" color="black" width="100%" onClick={() => handleSumbmit()}/>
    </Popup>
  )
}

export default LoginPopup