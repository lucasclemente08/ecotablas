
import './App.css'
import Sidebar from './components/sidebar';
import Empleados from './pages/empleados/Empleados';
import Login from './pages/login/Login';
import Register from './pages/login/Register';
import RegisterProductForm from './components/regisP';


import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Profile from './pages/profile/Profile';
import Home from './pages/home/Home';


function App() {

  return (
    <>
    <div className="bg-slate-900 flex">
 


    </div>


    
<Router>  


  <Routes>
    <Route path="/"exact element={<Home />}  />

    <Route path="/login" exact element={<Login />} />
    <Route path="/profile" exact element={<Profile />} />

    <Route path="/register" exact element={<Register />} />
  
  </Routes>
 
</Router>

    </>
  )
}

export default App
