import React from "react";

const HoverText = ({ text }) => {
  return (
    <span className="relative inline-block overflow-hidden h-8 cursor-pointer group text-white text-2xl">
      <span className="block transition-transform duration-300 group-hover:-translate-y-full text-nowrap">
        {text}
      </span>
      <span className="absolute left-0 block top-full transition-transform duration-300 group-hover:-translate-y-full text-nowrap">
        {text}
      </span>
    </span>
  );
};

export default HoverText;
