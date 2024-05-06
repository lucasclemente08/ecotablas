
import './App.css'
import Sidebar from './components/sidebar';
import Login from './pages/login/Login';
import Register from './pages/login/Register';

import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import Profile from './pages/profile/Profile';
function App() {

  return (
    <>
    <div className="bg-slate-900">


{/* <Sidebar /> */}

    </div>
   {/* <Login /> */}

    
<Router>  
     
     <div className=" ">

  <Routes>
    <Route path="/"  />

    <Route path="/login" exact element={<Login />} />
    <Route path="/profile" exact element={<Profile />} />

    <Route path="/register" exact element={<Register />} />
  
  </Routes>
  </div> 
</Router>

    </>
  )
}

export default App
