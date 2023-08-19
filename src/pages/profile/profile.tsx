import { useContext, useEffect } from "react"
import UserContext from "../../context/UserContext"
import Header from "../../components/header/header";

const Profile = () => {

  let user = useContext(UserContext);

  useEffect(() => {
    
  })

  return (
    <div className="profile">
      <div className="content-wrapper-profile">
        <Header/>        
      </div>  
    </div>
  )
}

export default Profile