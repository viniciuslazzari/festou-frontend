import { ReactNode, useCallback, useEffect, useState } from "react"
import "./Popup.css"
import { createPortal } from "react-dom"
import { backgroundColor } from "../../utils/colors"

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
    createPortal(
      <div onClick={() => closePopup()} className="overlay" style={{ visibility: show ? "visible" : "hidden" }}>
        <div onClick={(event) => {event.stopPropagation()}} className="popup" style={{ backgroundColor: backgroundColor }}>
          {props.children}
        </div>
      </div>,
      document.body
    )
  )
}

export default Popup