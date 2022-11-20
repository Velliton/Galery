import dayjs from "dayjs";
import React from "react";
import "./card.scss"


function Card({remove, path, image, size, time, category, loading}) {
    return (        
        <div className="image__card">
            <div className="close__image">
                <img src="./img/cancelcard.png" width="50px"  onClick={()=>remove(image)} ></img>
            </div>
            
            <div className="img__card_container align">
                <img className="image" src={path+image}></img>
            </div>
            <div className="image__card-content">
                <p className="image__card-text">Название: {image}</p>
                <p className="image__card-text">Размер: {size}</p>
                <p className="image__card-text">Дата: {dayjs(time).format('YYYY-MM-DD')}</p>
                <p className="image__card-text">Категория: {category}</p>
            </div>
            
            
        </div>       
    );
}

export default Card;