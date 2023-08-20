import { useNavigate } from "react-router-dom";
import "./ListPlaceUser.css"
import { labelBackground, white } from "../../utils/colors";
import { IResult } from "../../pages/list_places/ListPlacesUser";
import { useCallback } from "react";

interface IResultSection {
  results: IResult[]
}

const ListPlace = (props: IResultSection) => {
  let navigate = useNavigate();

  const handleSpaceClick = useCallback((id: number) => {
    navigate("/editPlace", { state: { id: id } });
  }, [navigate])
  
  const renderResult = useCallback((item: IResult) => {
    const maxLength = 150; // Defina o número máximo de caracteres a serem exibidos
    const truncatedDescription =
    item.description.length > maxLength
      ? item.description.substring(0, maxLength) + "..." 
      : item.description;

    const truncatedTermsOfUse =
    item.description.length > maxLength
      ? item.description.substring(0, maxLength) + "..." 
      : item.description;
    return (
      <div style={{ margin: '10px' }}>
        <div onClick={() => handleSpaceClick(item.id)} className="result-item-lpu">
          <img className="result-image-lpu" src="assets/4.webp" alt="Result 1"/>
          <span>
            <div className="result-content-lpu">
              <div className="first-info-lpu" style={{ color: white }}>
                <p className="title-lpu" style={{height:"20px"}}>{item.name}</p>
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
          </span>
        </div>
      </div>
    )
  }, [handleSpaceClick])

  return (
    <div className="results">
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