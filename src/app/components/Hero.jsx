"use client";

import React, { useRef } from "react";
import Button from "./Button";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import gsap from "gsap";
import { useScroll, useTransform, motion } from "motion/react";
import Parallax from "./Parallax";
import Image from "next/image";

// Define the Hero component function
const Hero = () => {
  const containerRef = useRef(null);
  const addToRefs = useRef(null);

  // You can add your hooks and logic here

  return (
    <section className="relative flex justify-center items-center h-screen w-full">
      <div
        className="relative h-full w-full overflow-hidden"
        ref={containerRef}
      >
        {/* <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover"
        >
          <source src="/video/hero.mp4" type="video/mp4" />
        </video> */}
        <Image
          src={"/images/hero.png"}
          fill
          alt="hero-image"
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center">
        <div className="relative flex flex-col space-y-10 element-center">
          <div className="hero-text flex-col element-center overflow-hidden">
            <h1
              className="text-center overflow-hidden text-white"
              ref={addToRefs}
            >
              Effortless Style.
            </h1>
            <h1
              className="text-center overflow-hidden text-white"
              ref={addToRefs}
            >
              Pure Quality
            </h1>
          </div>
          <Button content={"Shop Now"} text={true} className={"text-2xl"} />
        </div>
        <div className="absolute bottom-10 flex-row gap-2 element-center">
          <h5 className="font-body text-white">Scroll down to Explore More</h5>
          <div className="flex flex-row items-center justify-center">
            <span className="text-white">(</span>
            <span className="size-4">
              <svg
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
                    d="M12 3C12.5523 3 13 3.44772 13 4V17.5858L18.2929 12.2929C18.6834 11.9024 19.3166 11.9024 19.7071 12.2929C20.0976 12.6834 20.0976 13.3166 19.7071 13.7071L12.7071 20.7071C12.3166 21.0976 11.6834 21.0976 11.2929 20.7071L4.29289 13.7071C3.90237 13.3166 3.90237 12.6834 4.29289 12.2929C4.68342 11.9024 5.31658 11.9024 5.70711 12.2929L11 17.5858V4C11 3.44772 11.4477 3 12 3Z"
                    fill="#ffffff"
                  ></path>{" "}
                </g>
              </svg>
            </span>
            <span className="text-white">)</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
