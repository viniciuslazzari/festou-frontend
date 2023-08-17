import { useCallback, useContext, useEffect, useState } from "react"
import "./Scores.css"
import axios from "axios"
import toast from "react-hot-toast"
import Button from "../button/Button"
import Input from "../input/Input"
import { borderColor, labelBackground, primaryGrey, white } from "../../utils/colors"
import UserContext from "../../context/UserContext"
import ProfileIcon from "../profile-icon/ProfileIcon"
import { FaStar } from "react-icons/fa"

interface IScores {
  placeId: number
}

interface Item {
  name: string
  description: string
  score: number
}

const Scores = (props: IScores) => {
  const [items, setItems] = useState<Item[]>([]);
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);
  const [sendScore, setSendScore] = useState<string>("");
  const [sendScoreRating, setSendScoreRating] = useState<number>(0);

  let user = useContext(UserContext)

  const fetchData = useCallback(() => {
    axios.get('http://127.0.0.1:8000/festou-api/v1/get_score/' + props.placeId)
      .then(function (response) {
        setItems(response.data)
      })
      .catch(function (error) {
        toast.error(error.response.data.description)
      });
  }, [props.placeId])

  useEffect(() => {
    fetchData();
  }, [fetchData])

  useEffect(() => {
    if (sendScore === undefined || sendScore.length < 10) { setButtonDisabled(true); return; }
    if (sendScoreRating === 0) { setButtonDisabled(true); return; }

    setButtonDisabled(false);
  }, [sendScore, sendScoreRating])

  const handleSubmit = useCallback(() => {
    if (user.state.id === 0) {
      toast.error("You should be logged in to perform this action")
      return
    }

    const body = {
      idClient: user.state.id,
      description: sendScore,
      score: sendScoreRating,
      idPlace: props.placeId
    }

    axios.post('http://127.0.0.1:8000/festou-api/v1/create_score', body)
      .then(() => {
        fetchData()
        setSendScore("")
      })
      .catch((error) => {
        toast.error(error.response.data.description)
      });
  }, [fetchData, props.placeId, sendScore, sendScoreRating, user.state.id])

  return (
    <div>
    {items.map(item => {
      return (
        <div className="score" style={{ borderColor: borderColor, color: white }}>
          <div style={{ display: "flex", flexDirection: "row", marginBottom: "20px" }}>
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", width: "50%" }}>
            <ProfileIcon img="assets/profile.png" />
            <label style={{ marginLeft: "20px" }}>{item.name}</label>
            </div>
            <div style={{ color: labelBackground, display: "flex", flexDirection: "row", alignItems: "center", width: "50%", justifyContent: "flex-end" }}>
            {Array(+item.score).fill('').map(x => <FaStar />)}
            </div>
          </div>
          <div>{item.description}</div>
        </div>)})}
    <p 
      style={{ 
        marginTop: "40px",
        color: white, 
        fontSize: "18px", 
        fontWeight: "700", 
        marginBottom: "20px" 
      }}
    >
      Share your comments on this place
    </p>
    <div className="divisory">
      <Input placeholder="Send some score..." onChange={setSendScore} />
      <div style={{
        color: white, 
        display: "flex", 
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: "5px"
      }}>
        {Array.from({ length: 5 }, (_, i) => i + 1).map(x => 
          <div 
            style={{ fontSize: "22px", color: x <= sendScoreRating ? white : primaryGrey, cursor: "pointer" }} 
            onClick={() => setSendScoreRating(x)
          }>
            <FaStar />
          </div>
        )}
      </div>
      <Button 
        text="Send" 
        backgroundColor={white} 
        color="black" 
        width="20%"
        disabled={buttonDisabled} 
        onClick={handleSubmit} 
      />
    </div>
    </div>
  )
}

export default Scores