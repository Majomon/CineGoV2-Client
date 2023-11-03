import React from "react";
import CinePlusBlack from "../../components/CinePlusBlack/CinePlusBlack";
import CinePlusGold from "../../components/CinePlusGold/CinePlusGold";

const CinePlus = () => {
  return (
    <div className="w-full h-full min-h-screen  flex flex-col items-center justify-around mx-auto">
      <div className="w-full h-full lg:w-3/5 flex flex-col md:flex-row items-center justify-around mx-auto mt-16 z-40">
        <CinePlusGold />
        <CinePlusBlack />
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        className="hidden md:flex md:absolute md:bottom-0"
      >
        <path
          className="fill-gray-800 "
          d="M0,96L48,117.3C96,139,192,181,288,165.3C384,149,480,75,576,85.3C672,96,768,192,864,213.3C960,235,1056,181,1152,181.3C1248,181,1344,235,1392,261.3L1440,288L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </svg>
    </div>
  );
};

export default CinePlus;

/*      fill="#000000" */
