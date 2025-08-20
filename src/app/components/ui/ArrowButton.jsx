import React from "react";

const ArrowButton = ({
  direction,
  onClick,
  disabled,
  className,
  size = "md",
}) => {
  const sizeClasses = {
    sm: "w-8 h-8 p-1",
    md: "w-10 h-10 p-2",
    lg: "w-12 h-12 p-3",
  };

  const baseClasses = `
    ${sizeClasses[size]}
    rounded-full
    border
    flex items-center justify-center
    transition-all duration-100
    ${
      disabled
        ? "opacity-50 cursor-not-allowed bg-gray-100"
        : "hover:bg-gray-100 hover:scale-105 cursor-pointer bg-white"
    }
  `;

  const arrowClasses = direction === "left" ? "rotate-180" : "";

  return (
    <button
      onClick={disabled ? undefined : onClick}
      className={`${baseClasses} ${className}`}
      disabled={disabled}
      aria-label={direction === "left" ? "Previous" : "Next"}
    >
      <svg
        className={`w-full h-full ${arrowClasses} transition-transform`}
        fill="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12.2929 4.29289C12.6834 3.90237 13.3166 3.90237 13.7071 4.29289L20.7071 11.2929C21.0976 11.6834 21.0976 12.3166 20.7071 12.7071L13.7071 19.7071C13.3166 20.0976 12.6834 20.0976 12.2929 19.7071C11.9024 19.3166 11.9024 18.6834 12.2929 18.2929L17.5858 13H4C3.44772 13 3 12.5523 3 12C3 11.4477 3.44772 11 4 11H17.5858L12.2929 5.70711C11.9024 5.31658 11.9024 4.68342 12.2929 4.29289Z"
        />
      </svg>
    </button>
  );
};

export default ArrowButton;
