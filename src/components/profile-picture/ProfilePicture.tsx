import "./ProfilePicture.css"

interface IProfilePicture {
  img: string
}

const ProfilePicture = (props: IProfilePicture) => {
  return (
    <div className="profile-picture">
      <img src={props.img}  ></img>
    </div>
  )
}

export default ProfilePicture