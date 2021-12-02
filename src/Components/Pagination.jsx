import React from "react";

const Pagination = ({currPage, totalPage, setPage}) => {
    const arr = new Array(totalPage).fill(0).map( (el, i) => i + 1);
    
    return (
        <div style={{display: "flex", gap: "1rem", width: "30%", margin: "auto"}}>
            {
                arr.map( page => (
                    <button onClick={() => page === currPage ? {} : setPage(page)}>{page === currPage ? "Current" : page }</button>
                ))
            }
        </div>
    )
}

export default Pagination;