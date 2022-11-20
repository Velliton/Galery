import PropTypes from "prop-types";
import React from "react";
import "./popup.scss"
function Popup({images, modalActive, setModalActive, onModalClose, path, item}){
const {image} = item || {};

    const onModalCloseHandler = () => {
        if (onModalClose && typeof onModalClose === "function") {
            onModalClose(item);
        }
        setModalActive(false);
    }

    return(
        <div className={modalActive?"modal active":"modal"} onClick={onModalCloseHandler}>
            <div className="modal__block" onClick={e=>e.stopPropagation()}>
                <div className="modal__close" onClick={onModalCloseHandler}>
                    <img src="./img/closew.svg" width="25px" height="25px"/>
                </div>
                <div className="modal__img">
                    <img className="image" src={path+image} width="100%" height="100%"></img>
                </div>
            </div>

        </div>
    )
}

Popup.propTypes = {
    onModalClose: PropTypes.func,
    item: PropTypes.object,
};

export default Popup;