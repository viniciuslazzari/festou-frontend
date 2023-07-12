import { FaBowlingBall, FaBroom, FaStar, FaVolumeUp } from "react-icons/fa"
import { useNavigate } from "react-router-dom";
import "./ResultsSection.css"
import { labelBackground, primaryGrey, white } from "../../utils/colors";

const ResultsSection = () => {
  let navigate = useNavigate();

  function handleSpaceClick() {
    navigate("/space", { state: { id: 1 } });
  }

  return (
    <div className="results">
      <div className="result-row">
        <div onClick={() => handleSpaceClick()} className="result-item">
          <img className="result-image" src="assets/1.jpg" alt="Result 1"/>
          <div className="result-content">
            <div className="first-info" style={{ color: white }}>
              <p className="title">Tratoria Salão de Festas</p>
              <div className="right-title-wrapper" style={{ color: labelBackground }}>
                <FaStar style={{ marginTop: "2px" }} />
                <label> &nbsp; 4.5</label>
              </div>
            </div>
            <p className="location" style={{ color: labelBackground }}>Ramiro Baldasso st. 400</p>
            <div className="data-info" style={{ backgroundColor: primaryGrey }}>
              <div className="info-container">
                <p className="title-info" style={{ color: labelBackground }}>Price</p>
                <p className="info" style={{ color: white }}>R$ 450</p>
              </div>
              <div className="info-container">
                <p className="title-info" style={{ color: labelBackground }}>Capacity</p>
                <p className="info" style={{ color: white }}>800</p>
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

        <div className="result-item">
          <img className="result-image" src="assets/2.jpeg" alt="Result 1"/>
          <div className="result-content">
            <div className="first-info">
              <p className="title">Tratoria Salão de Festas</p>
              <div className="right-title-wrapper">
                <FaStar style={{ marginTop: "2px" }} />
                <label> &nbsp; 4.5</label>
              </div>
            </div>
            <p className="location">Ramiro Baldasso st. 400</p>
            <div className="data-info">
              <div className="info-container">
                <p className="title-info">Price</p>
                <p className="info">R$ 450</p>
              </div>
              <div className="info-container">
                <p className="title-info">Capacity</p>
                <p className="info">800</p>
              </div>
              <div className="info-container">
                <p className="title-info">Benefits</p>
                <div className="info">
                  <FaVolumeUp style={{ marginRight: "10px" }} />
                  <FaBroom style={{ marginRight: "10px" }} />
                  <FaBowlingBall />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="result-item">
          <img className="result-image" src="assets/3.jpg" alt="Result 1"/>
          <div className="result-content">
            <div className="first-info">
              <p className="title">Tratoria Salão de Festas</p>
              <div className="right-title-wrapper">
                <FaStar style={{ marginTop: "2px" }} />
                <label> &nbsp; 4.5</label>
              </div>
            </div>
            <p className="location">Ramiro Baldasso st. 400</p>
            <div className="data-info">
              <div className="info-container">
                <p className="title-info">Price</p>
                <p className="info">R$ 450</p>
              </div>
              <div className="info-container">
                <p className="title-info">Capacity</p>
                <p className="info">800</p>
              </div>
              <div className="info-container">
                <p className="title-info">Benefits</p>
                <div className="info">
                  <FaVolumeUp style={{ marginRight: "10px" }} />
                  <FaBroom style={{ marginRight: "10px" }} />
                  <FaBowlingBall />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="result-row">
        <div className="result-item">
          <img className="result-image" src="assets/4.webp" alt="Result 1"/>
          <div className="result-content">
            <div className="first-info">
              <p className="title">Tratoria Salão de Festas</p>
              <div className="right-title-wrapper">
                <FaStar style={{ marginTop: "2px" }} />
                <label> &nbsp; 4.5</label>
              </div>
            </div>
            <p className="location">Ramiro Baldasso st. 400</p>
            <div className="data-info">
              <div className="info-container">
                <p className="title-info">Price</p>
                <p className="info">R$ 450</p>
              </div>
              <div className="info-container">
                <p className="title-info">Capacity</p>
                <p className="info">800</p>
              </div>
              <div className="info-container">
                <p className="title-info">Benefits</p>
                <div className="info">
                  <FaVolumeUp style={{ marginRight: "10px" }} />
                  <FaBroom style={{ marginRight: "10px" }} />
                  <FaBowlingBall />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="result-item">
          <img className="result-image" src="assets/5.jpg" alt="Result 1"/>
          <div className="result-content">
            <div className="first-info">
              <p className="title">Tratoria Salão de Festas</p>
              <div className="right-title-wrapper">
                <FaStar style={{ marginTop: "2px" }} />
                <label> &nbsp; 4.5</label>
              </div>
            </div>
            <p className="location">Ramiro Baldasso st. 400</p>
            <div className="data-info">
              <div className="info-container">
                <p className="title-info">Price</p>
                <p className="info">R$ 450</p>
              </div>
              <div className="info-container">
                <p className="title-info">Capacity</p>
                <p className="info">800</p>
              </div>
              <div className="info-container">
                <p className="title-info">Benefits</p>
                <div className="info">
                  <FaVolumeUp style={{ marginRight: "10px" }} />
                  <FaBroom style={{ marginRight: "10px" }} />
                  <FaBowlingBall />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="result-item">
          <img className="result-image" src="assets/6.jpeg" alt="Result 1"/>
          <div className="result-content">
            <div className="first-info">
              <p className="title">Tratoria Salão de Festas</p>
              <div className="right-title-wrapper">
                <FaStar style={{ marginTop: "2px" }} />
                <label> &nbsp; 4.5</label>
              </div>
            </div>
            <p className="location">Ramiro Baldasso st. 400</p>
            <div className="data-info">
              <div className="info-container">
                <p className="title-info">Price</p>
                <p className="info">R$ 450</p>
              </div>
              <div className="info-container">
                <p className="title-info">Capacity</p>
                <p className="info">800</p>
              </div>
              <div className="info-container">
                <p className="title-info">Benefits</p>
                <div className="info">
                  <FaVolumeUp style={{ marginRight: "10px" }} />
                  <FaBroom style={{ marginRight: "10px" }} />
                  <FaBowlingBall />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="result-row">
        <div className="result-item">
          <img className="result-image" src="assets/7.jpeg" alt="Result 1"/>
          <div className="result-content">
            <div className="first-info">
              <p className="title">Tratoria Salão de Festas</p>
              <div className="right-title-wrapper">
                <FaStar style={{ marginTop: "2px" }} />
                <label> &nbsp; 4.5</label>
              </div>
            </div>
            <p className="location">Ramiro Baldasso st. 400</p>
            <div className="data-info">
              <div className="info-container">
                <p className="title-info">Price</p>
                <p className="info">R$ 450</p>
              </div>
              <div className="info-container">
                <p className="title-info">Capacity</p>
                <p className="info">800</p>
              </div>
              <div className="info-container">
                <p className="title-info">Benefits</p>
                <div className="info">
                  <FaVolumeUp style={{ marginRight: "10px" }} />
                  <FaBroom style={{ marginRight: "10px" }} />
                  <FaBowlingBall />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="result-item">
          <img className="result-image" src="assets/8.jpeg" alt="Result 1"/>
          <div className="result-content">
            <div className="first-info">
              <p className="title">Tratoria Salão de Festas</p>
              <div className="right-title-wrapper">
                <FaStar style={{ marginTop: "2px" }} />
                <label> &nbsp; 4.5</label>
              </div>
            </div>
            <p className="location">Ramiro Baldasso st. 400</p>
            <div className="data-info">
              <div className="info-container">
                <p className="title-info">Price</p>
                <p className="info">R$ 450</p>
              </div>
              <div className="info-container">
                <p className="title-info">Capacity</p>
                <p className="info">800</p>
              </div>
              <div className="info-container">
                <p className="title-info">Benefits</p>
                <div className="info">
                  <FaVolumeUp style={{ marginRight: "10px" }} />
                  <FaBroom style={{ marginRight: "10px" }} />
                  <FaBowlingBall />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="result-item">
          <img className="result-image" src="assets/1.jpg" alt="Result 1"/>
          <div className="result-content">
            <div className="first-info">
              <p className="title">Tratoria Salão de Festas</p>
              <div className="right-title-wrapper">
                <FaStar style={{ marginTop: "2px" }} />
                <label> &nbsp; 4.5</label>
              </div>
            </div>
            <p className="location">Ramiro Baldasso st. 400</p>
            <div className="data-info">
              <div className="info-container">
                <p className="title-info">Price</p>
                <p className="info">R$ 450</p>
              </div>
              <div className="info-container">
                <p className="title-info">Capacity</p>
                <p className="info">800</p>
              </div>
              <div className="info-container">
                <p className="title-info">Benefits</p>
                <div className="info">
                  <FaVolumeUp style={{ marginRight: "10px" }} />
                  <FaBroom style={{ marginRight: "10px" }} />
                  <FaBowlingBall />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResultsSection