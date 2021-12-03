import React, { useEffect, useRef, useState } from "react";
import styles from "./Form.module.css";
import axios from "axios";

const intial = {
    name: "",
    age: "",
    address: "",
    department: "",
    salary: 0,
    maritalState: false,
    profilePhoto: ""
};

const Form = ({setIsUpdated}) => {
    const [ imageSrc, setImageSrc ] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [formState, setFormState] = useState(intial);
    const imageRef = useRef(null);

    const handleFormUpdate = (e) => {
        const { name, value, type, checked } = e.target;
        let val = type === "checkbox" ? checked : value;
        if ( ( name === "salary" || name === "age" ) && Number.isNaN(Number(e.target.value) ) ) return; 
        setFormState({
            ...formState,
            [name]:val
        });
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        axios.post("http://localhost:3000/profile", formState )
        .then( res => {
            setFormState(intial);
            setImageSrc("");
        })
        .catch( err => {
            setIsError(true);
            console.log(err);
        })
        .finally( () => {
            setIsLoading(false);
            setIsUpdated(val=> !val);
        } )
    } 

    const handlePhotoChange = (e) => {
        const name = e.target.name;
        setFormState({
            ...formState,
            [name] : e.target.files[0]
        });
    }

    useEffect(() => {
        if (formState.profilePhoto) {
          const src = URL.createObjectURL(formState.profilePhoto);
          setImageSrc(src);
        }
      }, [formState]);
    
    return (
        <form className={styles.form} onSubmit={handleFormSubmit}>
            { isLoading ? (
                <div>...Loading</div>
            ) : isError ? (
                <div>...Error</div>
            ) : (
                <div>
                    <h2>Add new Employee</h2>
                    <div className={styles.inpRow} >
                        <label htmlFor="name">Name</label>
                        <input type="text" onChange={handleFormUpdate} name="name" value={formState.name} required={true}/>
                    </div>
                    <div className={styles.inpRow} >
                        <label htmlFor="age">Age ( in years )</label>
                        <input type="text" onChange={handleFormUpdate} name="age" value={formState.age} required={true}/>
                    </div>
                    <div className={styles.inpRow} >
                        <label htmlFor="address">Address</label>
                        <input type="text" onChange={handleFormUpdate} name="address" value={formState.address} />
                    </div>
                    <div className={styles.inpRow} >
                        <label htmlFor="department">Department</label>
                        <select onChange={handleFormUpdate} name="department" required={true}>
                            <option value="">Please choose an option</option>
                            <option value="management">Mangement</option>
                            <option value="operations">Operations</option>
                            <option value="it">IT</option>
                            <option value="resources">Resources</option>
                        </select>
                    </div>
                    <div className={styles.inpRow} >
                        <label htmlFor="salary">Salary</label>
                        <input type="number" onChange={handleFormUpdate} name="salary" value={formState.salary} required={true}/>
                    </div>
                    <div className={styles.inpRow} >
                        <label htmlFor="maritalStatus">Married</label>
                        <input type="checkbox" onChange={handleFormUpdate} name="maritalStatus" value={formState.maritalState} />
                    </div>
                    <div className={styles.inpRow} >
                        <label htmlFor="profile">Profile Photo</label>
                        <input type="file" onChange={handlePhotoChange} name="profilePhoto" ref={imageRef}/>
                    </div>
                    <div className={styles.inpRow}>
                        { imageSrc ? (
                            <img src={imageSrc} alt="profile" className={styles.img}/>
                        ) : (
                            <></>
                        )}
                    </div>
                    <input type="submit" value="Submit" className={styles.submit} />
                </div>
            )}
        </form>
    )
}
// Name
// Age
// Address
// Department ( select tag )
// Salary
// marital state ( check box )
// profile pgoto ( bonus to preview it on browser, bonus++ to upload it to imgur api )​

export default Form;