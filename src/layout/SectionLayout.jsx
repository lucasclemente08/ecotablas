import React from 'react';
import Home from '../pages/home/Home'; // Ajusta la ruta si es necesario

const SectionLayout = ({ title, children }) => {
  return (
    <div className="md:flex flex-row bg-slate-900 min-h-screen">
      <Home />
      <div className="p-4 w-full">
        <h2 className="text-2xl font-bold text-white mb-4">
          {title}
        </h2>
        {children}
      </div>
    </div>
  );
};

export default SectionLayout;
