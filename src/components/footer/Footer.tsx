import { backgroundColor, white } from "../../utils/colors"
import "./Footer.css"

const Footer = () => {
  return (
    <div 
      className="footer" 
      style={{ 
        backgroundColor: backgroundColor,
        color: white
      }}>
      <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <p>Made with ❤️</p>
        <p>@ 2023 Festou UI. All rights reserved.</p>
      </div>
    </div>
  )
}

export default Footer