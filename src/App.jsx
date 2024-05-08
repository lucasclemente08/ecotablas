
import './App.css'
import Sidebar from './components/sidebar';
import Empleados from './pages/empleados/Empleados';
import Login from './pages/login/Login';
import Register from './pages/login/Register';
// import RegisterProductForm from './components/regisP';


import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
function App() {

  return (
    <>
    <div className="bg-slate-900 flex">

     <Sidebar />
    <Empleados /> 
    {/* <RegisterProductForm /> */}

    </div>
   {/* <Login /> */}
{/* <Register /> */}



<Router>  
  <Routes>
    <Route path="/"  />

    <Route path="/login" exact element={<Login />} />
    <Route path="/register" exact element={<Register />} />
  
  </Routes>

</Router>

    </>
  )
}

export default App
