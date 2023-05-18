import React from "react"
import "./InfoModal.css"

const InfoModal = ({open, onClose, text}) => {

    if (!open) {
        return null;
    }

    return (
        <div className="overlay">
            <div className="modalContainer">
                <div className="content">
                    {text}
                </div>
                <div className="btnContainer">
                    <button className="btnOutline" onClick={onClose}>
                        <span className="bold">OK</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default InfoModal;