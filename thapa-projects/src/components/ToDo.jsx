import React, { useState } from "react";
import reactDom from "react-dom";

import style from "./../style/style.css"
 export default function Todo(params) {
    const state = useState()
    const [list, setList] = useState("");
    return (<>
                <div className="main">
            <div className="body">
        <div className="head">
                    <h1>ToDo List</h1>

                </div>
                <input type="text" name="" id="" placeholder="add anitem to ur list" />
                <button>Submit</button>
                <ol>
                    <li>Buy apple</li>
                </ol>
            </div>
        </div>
    </>)
}