import "./ProfileIcon.css"

interface IProfileIcon {
  img: string
}

const ProfileIcon = (props: IProfileIcon) => {
  return (
    <div className="profile">
      <img src={props.img} alt="Yourself!"></img>
    </div>
  )
}

export default ProfileIcon