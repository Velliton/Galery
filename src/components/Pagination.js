import React from "react";
import '../index.css';

function Pagination({images,itemsPerPage, totalImages, paginate}){

    const pageNumbers = [];

    for (let i=1; i<=Math.ceil(totalImages/itemsPerPage); i++){
        pageNumbers.push(i);
    }
    return(
    <div className="pagi">
        <ul className="pagination">
            {
                pageNumbers.map(number=>(
                    <li className="page-num" key={number}>
                        <a href="!#" onClick = {()=>paginate(number)}>{number}</a>
                    </li>
                        
                ))
            }
        </ul>
    </div>);

}

export default Pagination;