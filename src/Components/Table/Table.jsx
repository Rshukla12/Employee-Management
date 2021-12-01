import React, { useState, useEffect } from "react";
import TableItem from "./TableItem";
import style from "./Table.module.css";
import axios from "axios";

const Table = ({isUpdated}) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [sorting, setSorting] = useState("default");
    const [filter, setFilter] = useState("default");

    useEffect( () => {
        fetchData();
    }, [isUpdated])

    const fetchData = () => {
        setIsLoading(true);
        axios.get("http://localhost:3000/profile")
        .then( res => setData(res.data) )
        .catch( err => {
            console.log(err);
            setIsError(true);
        })
        .finally( () => setIsLoading(false) );
    }

    const handleDeleteUser = (id) => {
        setIsLoading(true);
        axios.delete(`http://localhost:3000/profile/${id}`)
        .then( () => fetchData() )
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
                <div>
                    <form>
                        <div>
                            <label htmlFor="filter">Department</label>
                            <select name="filter" onChange={handleChange} >
                                <option value="default">Default</option>
                                <option value="management">Mangement</option>
                                <option value="operations">Operations</option>
                                <option value="it">IT</option>
                                <option value="resources">Resources</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="sorting">Sort By Salary</label>
                            <select name="sorting" onChange={handleChange} >
                                <option value="default">Default</option>
                                <option value="asc">Lowest First</option>
                                <option value="desc">Highest First</option>
                            </select>
                        </div>
                    </form>
                    <div>
                        {data.length > 0 ? 
                            data
                            .filter( user => {
                                if ( filter === "default" ) return true;
                                return user.department === filter; 
                            })
                            .sort( ( user1, user2 ) => {
                                if ( sorting === "default" ) return 0;
                                if ( sorting === "asc" ) return user1.salary - user2.salary;
                                return user2.salary-user1.salary; 
                            })
                            .map(item => (
                                <TableItem user={item} key={item.id} onDeleteUser={handleDeleteUser} />
                            )) : (
                                <></>
                            )
                        }
                    </div>
                </div>
            )}
        </div>
    )
}

export default Table;