import React, { useState, useEffect } from "react";
import Sidebar from "../layout/sidebar";
import Navbar from "../layout/Navbar";

const SectionLayout = ({ title, children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Detectar si estamos en modo móvil
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="bg-slate-900 min-h-screen flex">
      {/* Navbar móvil */}
      <div className="block md:hidden">
        <Navbar
          isOpen={!isSidebarOpen}
          close={() => setSidebarOpen(!isSidebarOpen)}
        />
      </div>

      {/* Sidebar fijo */}
      <div
        className={`hidden md:block fixed top-0 left-0 h-full ${
          isSidebarOpen ? "w-[250px]" : "w-[80px]"
        } transition-all duration-300`}
      >
        <Sidebar
          isOpen={isSidebarOpen}
          toggleSidebar={() => setSidebarOpen(!isSidebarOpen)}
        />
      </div>

      {/* Contenido principal */}
      <div
        className="flex-1 p-4 bg-slate-900 transition-all duration-300"
        style={{
          marginLeft: isMobile ? "0" : isSidebarOpen ? "250px" : "80px", // No aplica margen en móvil
        }}
      >
        <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>
        {children}
      </div>
    </div>
  );
};

export default SectionLayout;
