import React, { useState } from "react";

const Button = ({
  type = "primary",
  size = "md",
  text = "Submit",
  handleClick,
}) => (
  <button onClick={handleClick} className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">
    {text}
  </button>
);

export default Button;
