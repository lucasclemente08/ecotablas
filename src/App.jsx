import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/sidebar';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Empleados from './pages/empleados/Empleados';
import Register from './pages/login/Register';
import Material from './pages/materiales/Materiales';

function App() {
  return (
    <Router>
      <div className="bg-slate-900 flex flex-col min-h-screen">

        {/* <div className="block md:hidden">
          <Navbar />
        </div>

        <div className="hidden md:flex flex-1 flex-row">
          <Sidebar className="w-1/4" />
          <div className="flex-1 p-4">
       
          </div>
        </div> */}

        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/material" exact element={<Material />} />

          <Route path="/register" exact element={<Register />} />

          <Route path="/empleados" exact element={<Empleados />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
