import { FaBowlingBall, FaBroom, FaStar, FaVolumeUp } from "react-icons/fa"
import { useNavigate } from "react-router-dom";
import "./ResultsSection.css"
import { labelBackground, primaryGrey, white } from "../../utils/colors";
import { IResult } from "../../pages/home/Home";
import { useCallback } from "react";

interface IResultSection {
  results: IResult[]
}

const ResultsSection = (props: IResultSection) => {
  let navigate = useNavigate();

  const handleSpaceClick = useCallback((id: number) => {
    navigate("/space", { state: { id: id } });
  }, [navigate])

  const renderResult = useCallback((item: IResult) => {
    return (
      <div onClick={() => handleSpaceClick(item.id)} className="result-item">
        <img className="result-image" src="assets/1.jpg" alt="Result 1"/>
        <div className="result-content">
          <div className="first-info" style={{ color: white }}>
            <p className="title">{item.name}</p>
            <div className="right-title-wrapper" style={{ color: labelBackground }}>
              <FaStar style={{ marginTop: "2px" }} />
              <label> &nbsp; {item.score}</label>
            </div>
          </div>
          <p className="location" style={{ color: labelBackground }}>{item.location}</p>
          <div className="data-info" style={{ backgroundColor: primaryGrey }}>
            <div className="info-container">
              <p className="title-info" style={{ color: labelBackground }}>Price</p>
              <p className="info" style={{ color: white }}>R$ {item.price}</p>
            </div>
            <div className="info-container">
              <p className="title-info" style={{ color: labelBackground }}>Capacity</p>
              <p className="info" style={{ color: white }}>{item.capacity}</p>
            </div>
            <div className="info-container">
              <p className="title-info" style={{ color: labelBackground }}>Benefits</p>
              <div className="info" style={{ color: white }}>
                <FaVolumeUp style={{ marginRight: "10px" }} />
                <FaBroom style={{ marginRight: "10px" }} />
                <FaBowlingBall />
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

        for (let i = 0; i < props.results.length; i += 3) {
          component.push(
            <div className="result-row">
              {renderResult(props.results[i])}
              {props.results[i + 1] ? renderResult(props.results[i + 1]) : <div></div>}
              {props.results[i + 2] ? renderResult(props.results[i + 2]) : <div></div>}
            </div>
          )
        }

        return component;
      })()}
    </div>
  )
}

export default ResultsSection