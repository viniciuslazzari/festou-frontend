import { ReactNode, useState } from "react"
import "./Tabs.css"

interface ITabs {
  labels: string[]
  tabs: ReactNode[]
}

const Tabs = (props: ITabs) => {
  const [currentLabel, setCurrentLabel] = useState(0);

  return (
    <div>
      <div className="labels-sector">
        {props.labels.map(label => {
          return <div className="label-item">{label}</div>
        })}
      </div>
    </div>
  )
}

interface ITab {
  isActive: boolean
  children: ReactNode
}

const Tab = (props: ITab) => {
  return (
    <div style={{ display: props.isActive ? "block" : "none" }}>
      {props.children}
    </div>
  )
}

export default Tabs