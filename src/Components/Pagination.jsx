import React from "react";

const Pagination = ({ currPage, totalPage, setPage }) => {
    const arr = new Array(totalPage).fill(0).map((el, i) => i + 1);

    return (
        <div style={{ display: "flex", width: "30%", justifyContent: "space-around", margin: "auto" }}>
            {
                arr.map(page => (
                    <button 
                        onClick={() => page === currPage ? {} : setPage(page)} 
                        style={{ cursor: "pointer", background: page !== currPage ? "white": "palevioletred" }} >
                            {page === currPage ? "Current" : page}
                    </button>
                ))
            }
        </div>
    )
}

export default Pagination;