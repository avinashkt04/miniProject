import React from "react";
import loading from "../assets/loading.gif";

export function Spinner({ className }) {
  return (
    <div className="flex justify-center items-center">
      <img src={loading} alt="Loading" className={`${className}`} />
    </div>
  );
}
