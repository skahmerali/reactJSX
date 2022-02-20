import React from "react";
import { useState } from "react";
import style from "./../style/style.css"
export default function Counter() {
    // var count = 1;
    // var newcount=count++
    const state = useState()
    var [count, setCount] = useState(0)
    // console.log(newcount)
    function IncNum() {
        setCount(count + 1)

    }
    return (
        <>
            <h1>{count}</h1>
            <button onClick={IncNum}>clik me</button>
        </>)
}
