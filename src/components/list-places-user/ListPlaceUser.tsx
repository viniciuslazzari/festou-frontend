import { FaBowlingBall, FaBroom, FaStar, FaVolumeUp } from "react-icons/fa"
import { useNavigate } from "react-router-dom";
import "./ListPlaceUser.css"
import { labelBackground, primaryGrey, white } from "../../utils/colors";
import { IResult } from "../../pages/list_places/ListPlacesUser";
import { useCallback } from "react";

interface IResultSection {
  results: IResult[]
}

const ListPlace = (props: IResultSection) => {
  let navigate = useNavigate();

  const handleSpaceClick = useCallback((id: number) => {
    navigate("/space", { state: { id: id } });
  }, [navigate])

  const renderResult = useCallback((item: IResult) => {
    return (
      <div style={{ margin: '20px' }}>
        <div onClick={() => handleSpaceClick(item.id)} className="result-item-lpu">
          <img className="result-image-lpu" src="assets/4.webp" alt="Result 1"/>
          <div className="result-content-lpu">
            
            <div className="first-info-lpu" style={{ color: white }}>
              <p className="title-lpu">{item.name}</p>
              <div className="right-title-wrapper-lpu" style={{ color: labelBackground }}>
                <FaStar style={{ marginTop: "2px" }} />
                <label> &nbsp; {item.score}</label>
              </div>
            </div>
            <p className="location-lpu" style={{ color: labelBackground }}>{item.location}</p>
            <div className="data-info-lpu" style={{ backgroundColor: primaryGrey }}>
              <div className="info-container-lpu">
                <p className="title-info-lpu" style={{ color: labelBackground }}>Price</p>
                <p className="info-lpu" style={{ color: white }}>R$ {item.price}</p>
              </div>
              <div className="info-container-lpu">
                <p className="title-info-lpu" style={{ color: labelBackground }}>Capacity</p>
                <p className="info-lpu" style={{ color: white }}>{item.capacity}</p>
              </div>
              <div className="info-container-lpu">
                <p className="title-info-lpu" style={{ color: labelBackground }}>Benefits</p>
                <div className="info-lpu" style={{ color: white }}>
                  <FaVolumeUp style={{ marginRight: "10px" }} />
                  <FaBroom style={{ marginRight: "10px" }} />
                  <FaBowlingBall />
                </div>
              </div>
            </div>
          </div>
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