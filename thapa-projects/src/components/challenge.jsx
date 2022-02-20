import React from "react";
import { useState } from "react";
export default function Challenge() {
    const state = useState();

    const style = "yellow"
    var [change, setChange] = useState(style);

    function changeColor() {
        let bg = "blue";
        setChange(bg);
    }
    const backToNormal = () => {
        setChange(style)
    }
    // const [backColor,setBackColor]=useState()
    return (<>
        <div style={{ backgroundColor: change }}><button onClick={changeColor} onDoubleClick={backToNormal}>chnage me </button></div>
        {/* <button onClick={GetTimeButton}>click me </button> */}
    </>

    )
}