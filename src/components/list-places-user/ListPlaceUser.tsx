import { useNavigate } from "react-router-dom";
import "./ListPlaceUser.css"
import { labelBackground, white } from "../../utils/colors";
import { IResult } from "../../pages/list_places/ListPlacesUser";
import { useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Button from "../button/Button";

interface IResultSection {
  results: IResult[]
}

const ListPlace = (props: IResultSection) => {
  let navigate = useNavigate();

  const handleSpaceClick = useCallback((id: number) => {
    navigate("/editPlace", { state: { id: id } });
  }, [navigate])

  const handleDeletePlace = useCallback((id: number) => {
    axios.delete('http://127.0.0.1:8000/festou-api/v1/deletePlace/' + id)
      .then(() => {
        toast.success("Place deleted!")
      })
      .catch((error) => {
        toast.error(error.response.data.description)
      });
  }, [])
  
  const renderResult = useCallback((item: IResult) => {
    const maxLength = 150; // Defina o número máximo de caracteres a serem exibidos
    const url = "data:image/jpeg;base64," + item.image_1

    const truncatedDescription =
    item.description.length > maxLength
      ? item.description.substring(0, maxLength) + "..." 
      : item.description;

    const truncatedTermsOfUse =
    item.terms_of_use.length > maxLength
      ? item.terms_of_use.substring(0, maxLength) + "..." 
      : item.terms_of_use;
      
    return (
      <div className="result-item-lpu">
        <img className="result-image-lpu" src={url} alt="Result 1"/>
        <div className="result-content-lpu">
          <div className="first-info-lpu" style={{ color: white }}>
            <p className="title-lpu" style={{height:"40px"}}>{item.name}</p>
          </div>
          <p className="location-lpu" style={{ color: labelBackground }}>{item.location}</p>
          <div className="info-container-lpu" style={{color:labelBackground, fontSize:"16px" }}>
            <p> <strong> Price: </strong> R$ {item.price}</p>
          </div>
          <div className="info-container-lpu" style={{color:labelBackground, fontSize:"16px", marginTop:"5px"}}>
            <p> <strong> Capacity: </strong> {item.capacity}</p>
          </div>
          <div className="info-container-lpu" style={{color:labelBackground, fontSize:"16px", marginTop:"5px"}}>
            <p> <strong> Description: </strong> {truncatedDescription}</p>
          </div>
          <div className="info-container-lpu" style={{color:labelBackground, fontSize:"16px", marginTop:"5px"}}>
            <p> <strong> Terms of Use: </strong> {truncatedTermsOfUse}</p>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end", flexDirection: "row", height: "210px", gap: "20px", width: "100%" }}>
          <Button text={"Edit"} backgroundColor={white} color="black" width={"100px"} onClick={() => handleSpaceClick(item.id)} />
          <Button text={"Delete"} backgroundColor={white} color="black" width={"100px"} onClick={() => handleDeletePlace(item.id)} />
        </div>
      </div>
    )
  }, [handleDeletePlace, handleSpaceClick])

  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
      {(() => {
        const component = [];
        for (let i = 0; i < props.results.length; i += 1) {
          component.push(
            renderResult(props.results[i])
          )
        }
        return component;
      })()}
    </div>
  )
}

export default ListPlace