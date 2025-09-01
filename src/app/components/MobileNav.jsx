"use client";
import gsap from "gsap";
import React, { useEffect, useRef, useState } from "react";
import HoverText from "./ui/HoverText";
import { navOptions } from "../constants";

const MobileNav = ({ isOpen }) => {
  const containerRef = useRef(null);
  const optionRef = useRef([]);
  const [time, setTime] = useState("");
  const [isSmall, setIsSmall] = useState(false);
  const scrollYRef = useRef(0);

  const getCurrentYear = () => new Date().getFullYear();

  const getISTTime12hNoMeridiem = () =>
    new Date()
      .toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
        timeZone: "Asia/Kolkata",
      })
      .replace(/\s*(AM|PM|am|pm)$/i, "");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(max-width: 639px)");
    const handler = (e) => setIsSmall(e.matches);
    handler(mq);
    mq.addEventListener
      ? mq.addEventListener("change", handler)
      : mq.addListener(handler);
    return () => {
      mq.removeEventListener
        ? mq.removeEventListener("change", handler)
        : mq.removeListener(handler);
    };
  }, []);

  useEffect(() => {
    const update = () => setTime(getISTTime12hNoMeridiem());
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!containerRef.current || !isSmall) return;

    if (isOpen) {
      // Robust scroll lock
      scrollYRef.current = window.scrollY || window.pageYOffset || 0;
      document.documentElement.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollYRef.current}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.width = "100%";

      const tl = gsap.timeline();

      gsap.set(containerRef.current, { display: "block" });
      const optionEls = (optionRef.current || []).filter(Boolean);
      gsap.set(optionEls, { y: 20, opacity: 0 });

      tl.fromTo(
        containerRef.current,
        { clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" },
        {
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          duration: 0.8,
          ease: "power2.inOut",
        }
      );

      tl.to(
        optionEls,
        { y: 0, opacity: 1, duration: 0.3, ease: "power2.out", stagger: 0.08 },
        "-=0.2"
      );
    } else {
      const optionEls = (optionRef.current || []).filter(Boolean);

      const tl = gsap.timeline({
        onComplete: () => {
          // Restore scroll after close
          document.documentElement.style.overflow = "";
          document.body.style.position = "";
          document.body.style.top = "";
          document.body.style.left = "";
          document.body.style.right = "";
          document.body.style.width = "";
          window.scrollTo(0, scrollYRef.current || 0);
          gsap.set(containerRef.current, { display: "none" });
        },
      });

      tl.to(
        optionEls.slice().reverse(),
        {
          y: -20,
          opacity: 0,
          duration: 0.25,
          ease: "power2.in",
          stagger: 0.06,
        },
        0
      ).to(
        containerRef.current,
        {
          clipPath: "polygon(0 0, 100% 0, 100% 0%, 0 0%)",
          duration: 0.6,
          ease: "power2.inOut",
        },
        "-=0.1"
      );
    }

    return () => {
      // Ensure restore on unmount
      document.documentElement.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
    };
  }, [isOpen, isSmall]);

  if (!isSmall) return null;

  return (
    <div
      className="fixed inset-0 w-full h-screen bg-white z-10 sm:hidden px-4 overflow-hidden overscroll-none"
      style={{
        clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
        display: "none",
      }}
      ref={containerRef}
    >
      <div className="absolute w-full h-full flex justify-center items-center">
        <ul className="flex flex-col space-y-6 items-center justify-center">
          {navOptions.map(({ id, text }, index) => (
            <li
              key={id}
              className="overflow-hidden h-fit"
              ref={(el) => (optionRef.current[index] = el)}
            >
              <HoverText text={text} className={"text-black text-3xl"} />
            </li>
          ))}
        </ul>
      </div>
      <div className="absolute bottom-0 left-0 flex justify-between text-black/75 text-sm w-full px-4 py-2">
        <span className="uppercase">oneshade &copy; {getCurrentYear()}</span>
        <span>{time}</span>
      </div>
    </div>
  );
};

export default MobileNav;
