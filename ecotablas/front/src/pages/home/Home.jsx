import React from "react";
import Sidebar from "../../layout/sidebar";
import Navbar from "../../layout/Navbar";

const Home = () => {
  return (
    <>
      <div className="bg-slate-900  ">
        <div className="block   md:hidden">
          <Navbar />
        </div>

        <div className="hidden md:block fixed top-0 left-0 h-full w-[250px]">
          <Sidebar className="" />
        </div>
      </div>
    </>
  );
};

export default Home;
