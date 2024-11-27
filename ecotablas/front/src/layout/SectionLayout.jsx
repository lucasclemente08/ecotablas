import React from "react";
import Sidebar from "../layout/sidebar";
import Navbar from "../layout/Navbar";
const SectionLayout = ({ title, children }) => {
  return (
    <div className="bg-slate-900  min-h-screen flex">
      {/* Sidebar fijo */}

      <div className="block md:hidden">
          <Navbar />
        </div>
      <div className="hidden md:block fixed top-0 left-0 h-full w-[250px]">
        <Sidebar />
      </div>

      {/* Contenido principal */}
      <div className="flex-1 ml-0 md:ml-[250px] p-4">
        <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>
        {children}
      </div>
    </div>
  );
};

export default SectionLayout;
