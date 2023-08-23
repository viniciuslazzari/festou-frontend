import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import UserContext from "../../context/UserContext"
import Cookies from "js-cookie"

const Logout = () => {
  let navigate = useNavigate()
  let user = useContext(UserContext)

  useEffect(() => {
    Cookies.remove('id')
    Cookies.remove('username')
    Cookies.remove('userToken')
    navigate("/")
  } ,[navigate, user])

  return (
    <></>
  )
}

export default Logout