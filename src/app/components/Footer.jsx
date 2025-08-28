"use client";

import React, { useEffect, useState } from "react";
import Logo from "./Logo";
import HoverText from "./ui/HoverText";
import { footer_1, footer_2 } from "../constants";

function getISTDayAndTime() {
  const now = new Date();
  const day = now.toLocaleDateString("en-IN", {
    weekday: "long",
    timeZone: "Asia/Kolkata",
  });
  const time = now.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false, // 24-hour format
    timeZone: "Asia/Kolkata",
  });
  return `${day} ${time}`;
}

const Footer = () => {
  const [istTime, setIstTime] = useState("");

  useEffect(() => {
    const update = () => setIstTime(getISTDayAndTime());
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="section section-padding h-screen bg-black overflow-hidden">
      <div className="w-full h-full flex flex-col justify-between">
        <div className="w-full md:grid md:grid-cols-12 flex flex-col mt-8 space-y-20">
          <div className="col-start-1 col-end-6 w-full lg:space-y-10 md:space-y-7 space-y-5">
            <h1 className="text-white lg:text-2xl md:text-xl sm:text-lg text-sm leading-tight text-nowrap">
              Be the first to know when new <br /> pieces hit the store.
            </h1>
            <div className="flex flex-row space-x-5 w-full">
              <input
                placeholder="Your Email Address"
                className="bg-white rounded-sm font-body font-semibold lg:text-lg md:text-sm text-xs pl-3 lg:w-110 md:w-70 lg:py-3.5 md:py-2 py-2"
              />
              <button className="relative bg-white w-auto h-auto element-center lg:p-4 md:p-2 p-2.5 rounded-full group overflow-hidden cursor-pointer">
                <svg
                  className="lg:size-6 md:size-5 size-3 transition-transform group-hover:translate-x-12 duration-300"
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
                  className="lg:size-6 md:size-5 size-3 absolute left-0 -translate-x-10 group-hover:translate-x-5 transition-transform duration-300"
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
              </button>
            </div>
          </div>
          <div className="lg:col-start-8 md:col-start-7 flex flex-row w-fit lg:space-x-26 space-x-10">
            <div>
              <ul className="w-full lg:space-y-4 md:space-y-4 space-y-1">
                <li className="font-body font-semibold lg:text-lg md:text-sm text-xs text-white/60 mb-3">
                  Products
                </li>
                {footer_1.map(({ id, text }) => (
                  <li key={id}>
                    <HoverText text={text} />
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <ul className="w-full lg:space-y-4 md:space-y-4 space-y-1">
                <li className="font-body font-semibold lg:text-lg md:text-sm text-xs text-white/60 mb-3">
                  Legal Area
                </li>
                {footer_2.map(({ id, text }) => (
                  <li key={id}>
                    <HoverText text={text} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="w-full mb-2 lg:text-lg md:text-sm text-xs">
          <ul className="list-none text-white w-full font-body flex flex-row items-center justify-between text-center">
            <li className="hidden md:block">
              <h5>2025 &copy; Oneshade All Right Reserved</h5>
            </li>
            <li>{istTime} IND</li>
            <li>
              Website by <span className="hover-animation">Uddeshya</span>
            </li>
          </ul>
          <Logo footer={true} className={"w-full cursor-default"} />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
