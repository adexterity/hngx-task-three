import React from "react";
import spinner from "./spinner4.gif";

const Spinner = () => {
  return (
    <div className="container mx-auto">
      <img
        src={spinner}
        alt="Loading..."
        className="w-[100px] h-[auto] mx-auto my-[40px] bg-transparent"
      />
    </div>
  );
};

export default Spinner;
