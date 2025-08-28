import React from "react";

const HoverText = ({ text, className }) => {
  return (
    <span
      className={`relative inline-block overflow-hidden lg:h-8 md:h-7 cursor-pointer group  ${className}`}
    >
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
