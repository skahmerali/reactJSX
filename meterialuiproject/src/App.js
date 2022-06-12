

import Nav from './componenet/Nav';
import { Route,Routes } from 'react-router-dom';
import Home from './componenet/Home';
import About from './componenet/About';

function App() {
  return (
    <>
  <Nav/>
  <Routes>
    <Route exect path="/" element={<Home />}/>
    <Route exect path="/about" element={<About/>}/>
  </Routes>
    </>
  );
}

export default App;
