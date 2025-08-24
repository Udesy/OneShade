import React from "react";
import * as motion from "motion/react-client";

const Button = ({ content, text, isOpen, className, onClick }) => {
  return text ? (
    <button
      className={`relative bg-white px-3 py-2 text-black rounded-[6px] flex flex-row flex-nowrap items-center w-fit space-x-2 cursor-pointer group ${className}`}
      onClick={onClick}
    >
      <h1 className="text-nowrap body-text">{content}</h1>
      <div className="w-5 h-5 overflow-hidden">
        <div
          className="flex w-[2.5rem] transition-transform duration-300 group-hover:translate-x-5"
          style={{ transform: "translatex(-1.25rem)" }}
        >
          <svg
            className="w-5 h-5 flex-shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12.2929 4.29289C12.6834 3.90237 13.3166 3.90237 13.7071 4.29289L20.7071 11.2929C21.0976 11.6834 21.0976 12.3166 20.7071 12.7071L13.7071 19.7071C13.3166 20.0976 12.6834 20.0976 12.2929 19.7071C11.9024 19.3166 11.9024 18.6834 12.2929 18.2929L17.5858 13H4C3.44772 13 3 12.5523 3 12C3 11.4477 3.44772 11 4 11H17.5858L12.2929 5.70711C11.9024 5.31658 11.9024 4.68342 12.2929 4.29289Z"
                fill="#000000"
              ></path>{" "}
            </g>
          </svg>
          <svg
            className="w-5 h-5 flex-shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12.2929 4.29289C12.6834 3.90237 13.3166 3.90237 13.7071 4.29289L20.7071 11.2929C21.0976 11.6834 21.0976 12.3166 20.7071 12.7071L13.7071 19.7071C13.3166 20.0976 12.6834 20.0976 12.2929 19.7071C11.9024 19.3166 11.9024 18.6834 12.2929 18.2929L17.5858 13H4C3.44772 13 3 12.5523 3 12C3 11.4477 3.44772 11 4 11H17.5858L12.2929 5.70711C11.9024 5.31658 11.9024 4.68342 12.2929 4.29289Z"
                fill="#000000"
              ></path>{" "}
            </g>
          </svg>
        </div>
      </div>
    </button>
  ) : (
    <button
      onClick={onClick}
      className={`relative bg-white size-10 text-black rounded-[6px] flex flex-col items-center justify-center ${
        isOpen ? "border-1.5 border-black/5" : ""
      } ${className}`}
    >
      <span className="flex flex-col space-y-1.5 items-center justify-center">
        <motion.span
          className="block h-[2px] w-7 rounded-full bg-black"
          animate={{
            rotate: isOpen ? 45 : 0,
            y: isOpen ? 8 : 0,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        />

        <motion.span
          className="block h-[2px] w-7 rounded-full bg-black"
          animate={{
            opacity: isOpen ? 0 : 1,
          }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
        />

        <motion.span
          className="block h-[2px] w-7 rounded-full bg-black"
          animate={{
            rotate: isOpen ? -45 : 0,
            y: isOpen ? -8 : 0,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        />
      </span>
    </button>
  );
};

export default Button;
