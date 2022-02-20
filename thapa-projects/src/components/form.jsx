import React from "react";
import { useState } from "react";
const Form = () => {
    const state = useState();
    const [fullName, setFullName] = useState({
        fname: "",
        lname: "",
        phone:"",
        email:""
    });
    // const [fullName , setFullName] = useState();
    const inputEvent = (event) => {
        console.log(event.target.value);
        console.log(event.target);
        // const name = event.target.name;
        // const value = event.target.value;
        
        // through  deStructuring////////////
        const {value,name }= event.target
        setFullName((prevValue) => {
            return{
                ...prevValue,
                [name]:value
            }
            // if (name === 'fName') {
            //     return {
            //         fname: value,
            //         lname: prevValue.lname,
            //         email:prevValue.email,
            //         phone:prevValue.phone
            //     }
            // } else if (name === 'lName') {
            //     return {
            //         fname: prevValue.fname,
            //         lname: value,
            //         email:prevValue.email,
            //         phone:prevValue.phone
            //     }
            // } else if (name === 'email') {
            //     return {
            //         fname: prevValue.fname,
            //         lname: prevValue.lname,
            //         email:value,
            //         phone:prevValue.phone
            //     }
            // } else if (name === 'phone') {
            //     return {
            //         fname: prevValue.fname,
            //         lname:prevValue.lname,
            //         email:prevValue.email,
            //         phone:value
            //     }
            // }
        })
    }
    const onSubmits = (event) => {
        event.preventDefault();
        // setFullName (name);

    };
    return (<>
        <div>
            <form onSubmit={onSubmits}>
                <div>
                    <h1>HEllo ! {fullName.fname}{fullName.lname}</h1>
                    <p>{fullName.email}</p>
                    <p>{fullName.phone}</p>
                    <input type="text"
                        placeholder="Enter Your Name "
                        name="fname"
                        onChange={inputEvent}
                        value={fullName.fname}
                    />
                    <br />
                    <input type="text"
                        placeholder="Enter Your Name "
                        name="lname"
                        onChange={inputEvent}
                        value={fullName.lname}
                    />
                     <br />
                    <input type="email"
                        placeholder="Enter Your Name "
                        name="email"
                        onChange={inputEvent}
                        value={fullName.email}
                    /> 
                    <br />
                    <input type="number"
                        placeholder="Enter Your Name "
                        name="phone"
                        onChange={inputEvent}
                        value={fullName.phone}
                    />
                    <br />
                    <button type="submit">
                        click !
                    </button>
                </div>
            </form>
        </div>
    </>)
}
export default Form;