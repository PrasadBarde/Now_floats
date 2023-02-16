import  Current  from './component/Current';
import Search from './component/Search';
import { BrowserRouter,Route
,Routes } from 'react-router-dom';
import { useState } from 'react';
import Both from './component/Both';
// import Header from './component/Header';
function App() {
  let [api,setAPI]=useState("9bf6d00f96f96390d7d5aacc1d3d1687")
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Current api={api}/>}/>
      <Route path='/search' element={<Search api={api}/>}/>
      <Route path='/both' element={<Both api={api}/>}/>

    </Routes>
    </BrowserRouter>
  );
}

export default App;
