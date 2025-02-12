import React, { useState } from "react";
import Sidebar from "../layout/sidebar";
import Navbar from "../layout/Navbar";

const SectionLayout = ({ title, children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="bg-slate-900 min-h-screen flex">
      {/* Navbar móvil */}
      <div className="block  md:hidden">
      <Navbar isOpen={!isSidebarOpen} close={() => setSidebarOpen(!isSidebarOpen)} />

      </div>

      {/* Sidebar fijo */}
      <div
        className={`hidden md:block fixed top-0 left-0 h-full ${
          isSidebarOpen ? "w-[250px]" : "w-[80px]"
        } transition-all duration-300`}
      >
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />
      </div>

      {/* Contenido principal */}
      <div
  className="flex-1 p-4 bg-slate-900 transition-all duration-300"
  style={{
    marginLeft: isSidebarOpen ? "250px" : "80px",  // Aplica el margen dinámicamente
  }}
>
  <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>
  {children}
</div>

    </div>
  );
};

export default SectionLayout;
