import dayjs from "dayjs";
import React from "react";
import "./card.scss"
import closeImg from "../../assets/close.png" 

function Card({remove, path, image, size, time, category, loading}) {
    return (        
        <div className="image__card">
            <div className="img__card_container align">
                <img className="image" src={path+image}></img>
            </div>
            <div className="image__card-content">
                <p className="image__card-text">Название: {image}</p>
                <p className="image__card-text">Размер: {size}</p>
                <p className="image__card-text">Дата: {dayjs(time).format('YYYY-MM-DD')}</p>
                <p className="image__card-text">Категория: {category}</p>
            </div>
            <img src={closeImg} className="close__image" onClick={()=>remove(image)} ></img>
            
        </div>       
    );
}

export default Card;