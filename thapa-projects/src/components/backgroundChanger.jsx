import React from "react";
import { useState } from "react"
var cssStyle = {}

var date = new Date().toLocaleDateString();
var time = new Date(2021, 12, 2, 15)
// var hpurs
var minutes = time * 1000;
var hours = time.getHours();
var arrays = ""
var statement = "Hello sir ,"
if (hours >= 1 && hours <= 11) {
    arrays = " Good Morning";
    cssStyle.color = "yellow"
}
else if (hours > 11 && hours <= 19) {
    arrays = " Good Noon"
    cssStyle.color = "orange"
}
else {
    arrays = ", Good Night"
    cssStyle.color = "gray"

}
return (<>
    <div className="background">{statement}<span style={cssStyle}>{arrays}</span></div>
</>)