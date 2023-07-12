import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import UserContext from "../../context/UserContext"

const Logout = () => {
  let navigate = useNavigate()
  let user = useContext(UserContext)

  useEffect(() => {
    user.setState({ isLoggedIn: false, id: 0, name: "" })
    navigate("/")
  } ,[navigate, user])

  return (
    <></>
  )
}

export default Logout