import React from "react";
import {useState} from "react";

export default function  GetTime(){
    const  state =useState()
    const time = new Date().toLocaleDateString();
    var [getTime , setTime]=useState(time)
    function GetTimeButton(){
        let time = new Date().toLocaleTimeString();
        setTime(time);
}
setInterval(GetTimeButton,1000); 
return(<>
    
<div></div></>)
}