import React, { useState } from "react";
import Form from "./Form/Form";
import Table from "./Table/Table";

const EmployeeManagement = () => {
    const [isUpdated, setIsUpdated] = useState(false);
  
    return (
      <>
        <Form setIsUpdated={setIsUpdated}/>
        <Table isUpdated={isUpdated}/>
      </>
    );
}
  
export default EmployeeManagement;
  