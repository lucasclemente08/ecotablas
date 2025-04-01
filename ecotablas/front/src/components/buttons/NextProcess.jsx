import React from "react";
import { GrLinkNext } from "react-icons/gr";
import { Link } from "react-router-dom";

const NextProcess = ({
  linkTo,
  ariaLabel = "Go to next step",
  hoverText = "Siguiente proceso",
}) => {
  return (
    <div className="fixed bottom-10 right-10 bg-green-600 hover:bg-green-700 transition-colors duration-300 rounded-full p-4 shadow-lg group">
      <Link
        to={linkTo}
        aria-label={ariaLabel}
        className="flex items-center text-white text-2xl"
      >
        <GrLinkNext />
      </Link>
      {/* Texto emergente */}
      <div className="absolute -top-20 left-1/2 transform  -translate-x-1/2 bg-green-600 text-white text-sm p-2 rounded-md opacity-0 group-hover:opacity-100 group-hover:translate-y-0 -translate-y-2 transition-all duration-300 shadow-md">
        {hoverText}
      </div>
    </div>
  );
};

export default NextProcess;
