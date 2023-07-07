import { ReactNode, useState } from "react"
import "./Tabs.css"

interface ITabs {
  labels: string[]
  icons: ReactNode[]
  tabs: ReactNode[]
}

const Tabs = (props: ITabs) => {
  const [currentLabel, setCurrentLabel] = useState(0);

  return (
    <div className="tabs-wrapper">
      <div className="labels-sector">
        {props.labels.map((label, index) => {
          return <div 
            onClick={() => setCurrentLabel(index)} 
            className={"label-item " + (currentLabel === index ? "selected-label" : "")}>
              <span className="tab-icon">{props.icons[index]}</span>
              {label}
            </div>
        })}
      </div>
      <div className="tab-content">{props.tabs[currentLabel]}</div>
    </div>
  )
}

export default Tabs