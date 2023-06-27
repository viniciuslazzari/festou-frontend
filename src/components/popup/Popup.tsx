import { ReactNode, useCallback, useEffect, useState } from "react"
import "./Popup.css"

interface IPopup {
  visibility: boolean
  onClose: () => any
  children: ReactNode
}

const Popup = (props: IPopup) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(props.visibility)
  }, [props.visibility])

  const closePopup = useCallback(() => {
    props.onClose()
    setShow(false)
  }, [props])

  return (
    <div onClick={() => closePopup()} className="overlay" style={{ visibility: show ? "visible" : "hidden" }}>
      <div onClick={(event) => {event.stopPropagation()}} className="popup">
        {props.children}
      </div>
    </div>
  )
}

export default Popup