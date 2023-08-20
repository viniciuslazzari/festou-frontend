import "./ProfilePicture.css"

interface IProfilePicture {
  img: string
}

const ProfilePicture = (props: IProfilePicture) => {
  return (
    <div className="profile-picture">
      <img src={props.img} alt="The profile user"></img>
    </div>
  )
}

export default ProfilePicture