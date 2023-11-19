import React from 'react';
import {BrowserRouter,Routes,Route}  from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import './App.css';
import Login from './component/Login';
import User from './component/User';
import ProtectRoute from './component/ProtectRoute';

function App() {
  return (
    <div className="App">
      <ToastContainer/>
      <BrowserRouter>
      <Routes>
      <Route path="/"  element={<Login/>}/>
      <Route path="/getuser"  element={<ProtectRoute Component={<User/>}/>}/>


      </Routes>
      </BrowserRouter>
     
    </div>
  );
}

export default App;
