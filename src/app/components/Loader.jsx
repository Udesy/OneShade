"use client";

import gsap from "gsap";
import React, { useEffect, useRef } from "react";
import { loader_image } from "../constants";
import Image from "next/image";

const Loader = ({ onComplete }) => {
  const containerRef = useRef(null);
  const countRef = useRef(null);
  const imgRefs = useRef([]);

  // Function to lock scroll
  const lockScroll = () => {
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.width = "100%";
    document.body.style.top = `-${window.scrollY}px`;
  };

  // Function to unlock scroll
  const unlockScroll = () => {
    const scrollY = document.body.style.top;
    document.body.style.overflow = "";
    document.body.style.position = "";
    document.body.style.width = "";
    document.body.style.top = "";
    window.scrollTo(0, parseInt(scrollY || "0") * -1);
  };

  useEffect(() => {
    // Lock scroll when loader mounts
    lockScroll();

    const tl = gsap.timeline();

    const counter = { val: 1 };

    gsap.to(counter, {
      val: 100,
      duration: 4,
      ease: "power3.inOut",
      onUpdate: () => {
        if (countRef.current) {
          countRef.current.textContent =
            Math.floor(counter.val).toString() + "%";
        }
      },
    });

    imgRefs.current.forEach((img, i) => {
      tl.fromTo(
        img,
        {
          opacity: 0.3,
          scale: 0,
        },
        {
          opacity: 1,
          scale: 1,
          stagger: 0.4,
          duration: 0.8,
          ease: "power2.out",
        },
        i * 0.4
      );
    });

    tl.to(
      containerRef.current,
      {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
        duration: 0.8,
        ease: "power2.inOut",
        onComplete: () => {
          // Unlock scroll when loader completes
          unlockScroll();
          if (onComplete) onComplete();
        },
      },
      "<+4"
    );

    // Cleanup function to ensure scroll is unlocked if component unmounts
    return () => {
      unlockScroll();
    };
  }, []);

  return (
    <div
      className="absolute inset-0 w-screen h-screen bg-white z-[100]"
      style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" }}
      ref={containerRef}
    >
      <div className="relative w-full h-full flex flex-col justify-center items-center p-8">
        <div className="relative w-40 h-56 md:w-56 md:h-72">
          {loader_image.map(({ id, src, className }, index) => (
            <div
              key={id}
              className={className}
              ref={(el) => {
                if (!imgRefs.current) imgRefs.current = [];
                imgRefs.current[index] = el || null;
              }}
            >
              <div className="relative w-40 h-56 md:w-56 md:h-72 rounded-sm overflow-hidden">
                <Image
                  alt="Pic"
                  fill
                  src={src}
                  sizes="(max-width: 768px) 160px, 224px"
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="absolute bottom-0 right-0 md:p-8 p-4">
          <h1
            className="text-black lg:text-7xl md:text-6xl sm:text-5xl text-4xl"
            ref={countRef}
          >
            0%
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Loader;
