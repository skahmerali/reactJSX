import React from "react";
import {useState} from "react";
const FormOld = ()=>{
const state = useState();
const [name ,setName] = useState();
const [fullName , setFullName] = useState();
const onSubmits = (event)=>{
    event.preventDefault();
    setFullName (name);
};

const inputEvent = (event)=>{
    console.log(event.target.value);
    setName(event.target.value)
}
return(<>
<div>
    <form onSubmit={onSubmits}>
        <div>
            <h1>HEllo ! {fullName}</h1>
            <input type="text"
            placeholder="Enter Your Name "
            onChange={inputEvent}
            value={name}
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
export default FormOld;