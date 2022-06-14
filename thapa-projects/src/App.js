import React from "react";
// import Challenge from "./components/challenge";
// import Form from "./components/form";
import ToDo from "./components/ToDo"

import ComA from "./components/context/comA";
const FirstName = createContext()
function App() {
  // var cureentDate= new Date().toLocaleDateString();
  // var time=new Date().toLocaleTimeString()
  // var minutes= 1000 * time;
  // var hours = minutes * 60;

  return (
    <div className="App">
      {/* <ToDo /> */}
      {/* <h1>my name is sheikh ahmer ali</h1>
          <p>new date : {cureentDate}</p>
          <p>new time : {time}</p> */}




      {/* for contaxt  */}
      <FirstName.Provider vlaue={"Ahmer"}>

        <ComA />
      </FirstName.Provider>

    </div>
  );
}

export default App;
export { FirstName }
