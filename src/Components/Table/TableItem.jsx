import React from "react";
import style from "./Table.module.css";

const TableItem = ({user, onDeleteUser}) => {
    return (
        <div className={style.tableItem}>
            <div>{user.name}</div>
            <div>{user.age}</div>
            <div>{user.department}</div>
            <div>{user.salary}</div>
            <div>{user.maritalStatus ? "Married" : "Single" }</div>
            <button onClick={()=>onDeleteUser(user.id)} >Delete</button>
        </div>
    )
}

export default TableItem;