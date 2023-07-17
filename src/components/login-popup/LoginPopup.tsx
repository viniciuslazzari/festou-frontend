import Popup from "../popup/Popup"
import "./LoginPopup.css"
import Button from "../button/Button"
import Input from "../input/Input"
import { FaChevronRight, FaLock, FaUser } from "react-icons/fa"
import { useCallback, useContext, useEffect, useState } from "react"
import axios from "axios"
import toast from "react-hot-toast"
import { labelBackground, white } from "../../utils/colors"
import UserContext from "../../context/UserContext"

interface ILoginPopup {
  onClosePopup: () => any
  loginPopup: boolean
}

const LoginPopup = (props: ILoginPopup) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true)

  let user = useContext(UserContext)

  const serializeData = useCallback(() => {
    const data = {
      "email": email,
      "password": password
    }

    return data
  }, [email, password])

  useEffect(() => {
    if (!email || email === "") { setButtonDisabled(true); return };
    if (!password || password === "") { setButtonDisabled(true); return };

    setButtonDisabled(false);
  }, [email, password])

  const handleSumbmit = useCallback(() => {
    const data = serializeData()

    axios.post('http://127.0.0.1:8000/festou-api/v1/login', data)
      .then(function (response) {
        user.setState({ isLoggedIn: true, id: response.data.id, name: response.data.firstName })
      })
      .catch(function (error) {
        toast.error(error.response.data.description)
      });
  }, [serializeData, user])

  return (
    <Popup onClose={props.onClosePopup} visibility={props.loginPopup}>
      <div style={{ width: "350px" }}>
        <p style={{ textAlign: "center", fontSize: "42px", marginBottom: "10px" }}>🎉</p>
        <p className="popup-title" style={{ color: white, marginBottom: "10px" }}>Welcome back</p>
        <p style={{ textAlign: "center", color: labelBackground, marginBottom: "30px" }}>Please enter your details to sign in.</p>
        <Input label="Email" placeholder="Enter your email" icon={FaUser} onChange={setEmail} />
        <Input label="Password" placeholder="Enter your password" type="password" icon={FaLock} onChange={setPassword} />
        <Button 
          marginTop="40px" 
          text="Login" 
          backgroundColor={white} 
          color="black" 
          width="100%" 
          onClick={() => handleSumbmit()}
          icon={<FaChevronRight />}
          disabled={buttonDisabled}
        />
      </div>
    </Popup>
  )
}

export default LoginPopup