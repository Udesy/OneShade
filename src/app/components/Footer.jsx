"use client";

import React, { useEffect, useState } from "react";
import Logo from "./Logo";
import HoverText from "./ui/HoverText";

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
    <footer className="section section-padding h-screen bg-black">
      <div className="w-full h-full flex flex-col justify-between">
        <div className="w-full grid grid-cols-12 mt-8">
          <div className="col-start-1 col-end-5 w-full space-y-10">
            <h1 className="text-white text-2xl leading-tight text-nowrap">
              Be the first to know when new <br /> pieces hit the store.
            </h1>
            <div className="flex flex-row space-x-5">
              <input
                placeholder="Your Email Address"
                className="bg-white rounded-sm font-body font-semibold text-[1rem] pl-3 w-93"
              />
              <button className="relative bg-white w-fit h-fit element-center p-2.5 rounded-full group overflow-hidden cursor-pointer">
                <svg
                  className="size-5 transition-transform group-hover:translate-x-full duration-300"
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
                  className="size-5 absolute left-0 -translate-x-full group-hover:translate-x-0 transition-transform duration-300"
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
          <div className="col-start-8 flex flex-row w-fit space-x-26">
            <div>
              <ul className="w-full space-y-4">
                <li className="font-body font-semibold text-white/60">
                  Products
                </li>
                <HoverText text={"Street Wear"} />
                <HoverText text={"Casual Wear"} />
                <HoverText text={"Ethenic Wear"} />
                <HoverText text={"Party Wear"} />
              </ul>
            </div>
            <div>
              <ul className="w-full space-y-4">
                <li className="font-body font-semibold text-white/60">
                  Legal Area
                </li>
                <HoverText text={"Terms & Condition"} />
                <HoverText text={"Privacy & Policy"} />
              </ul>
            </div>
          </div>
        </div>
        <div className="w-full mb-2">
          <ul className="text-white w-full font-body flex flex-col sm:flex-row gap-4 sm:gap-0 items-center sm:justify-between text-center sm:text-left">
            <li>
              <h5>2025 &copy; Oneshade All Right Reserved</h5>
            </li>
            <li className="order-first sm:order-none">{istTime} IND</li>
            <li>
              Website by <span className="hover-animation">Uddeshya</span>
            </li>
          </ul>
          <Logo
            footer={true}
            className={"w-full cursor-default mt-4 sm:mt-0"}
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
