import React, { useState, useEffect } from "react";
import TableItem from "./TableItem";
import style from "./Table.module.css";
import axios from "axios";
import Pagination from "../Pagination";

const Table = ({isUpdated}) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [sorting, setSorting] = useState("default");
    const [filter, setFilter] = useState("default");
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);

    useEffect( () => {
        fetchData({sorting, filter, page});
    }, [isUpdated, sorting, filter, page])

    const fetchData = ({sorting, filter, page}) => {
        setIsLoading(true);
        const options = {
            _page: page,
            _limit: 5
        };
        if ( sorting !== "default" ) {
            options._sort = "salary";
            options._order = sorting;
        }
        if ( filter !== "default" ) {
            options.department = filter;
        }
        axios.get("http://localhost:3000/profile", {
            params: options
        })
        .then( res => {
            setTotalPage( Math.ceil(res.headers["x-total-count"]/5)  )
            setData(res.data) 
        })
        .catch( err => {
            console.log(err);
            setIsError(true);
        })
        .finally( () => setIsLoading(false) );
    }

    const handleDeleteUser = (id) => {
        setIsLoading(true);
        axios.delete(`http://localhost:3000/profile/${id}`)
        .then( () => fetchData({sorting, filter, page}) )
        .catch( err => {
            console.log(err);
            setIsError(true);
        })
        .finally( () => setIsLoading(false) );    
    }

    const handleChange = (e) => {
        if ( e.target.name === "filter" ) setFilter(e.target.value);
        else setSorting(e.target.value)
    }

    return (
        <div>
                
            { isLoading ? (
                <div>...Loading</div>
            ) : isError ? (
                <div>...Error</div>
            ) : (
                <div className={style.table}>
                    <h2>Employee Details</h2>
                    <div className={style.tableHead}>
                        <div>Name</div>
                        <div>Age</div>
                        <div>
                            <select name="filter" value={filter} onChange={handleChange} >
                                <option value="default">Department</option>
                                <option value="management">Mangement</option>
                                <option value="operations">Operations</option>
                                <option value="it">IT</option>
                                <option value="resources">Resources</option>
                            </select>
                        </div>
                        <div>
                            <select name="sorting" value={sorting} onChange={handleChange} >
                                <option value="default">Salary ( Default )</option>
                                <option value="asc">Lowest First</option>
                                <option value="desc">Highest First</option>
                            </select>
                        </div>
                        <div>Marital Status</div>
                        <div>Action</div>
                    </div>
                    <div>
                        {data.length > 0 ? 
                            data
                            // .filter( user => {
                            //     if ( filter === "default" ) return true;
                            //     return user.department === filter; 
                            // })
                            // .sort( ( user1, user2 ) => {
                            //     if ( sorting === "default" ) return 0;
                            //     if ( sorting === "asc" ) return user1.salary - user2.salary;
                            //     return user2.salary-user1.salary; 
                            // })
                            .map(item => (
                                <TableItem user={item} key={item.id} onDeleteUser={handleDeleteUser} />
                            )) : (
                                <></>
                            )
                        }
                    </div>
                    <Pagination totalPage={totalPage} currPage={page} setPage={setPage} />
                </div>
            )}
        </div>
    )
}

export default Table;