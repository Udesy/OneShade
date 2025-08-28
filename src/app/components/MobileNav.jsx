import gsap from "gsap";
import React, { useEffect, useRef, useState } from "react";
import HoverText from "./ui/HoverText";
import { navOptions } from "../constants";

const MobileNav = ({ isOpen }) => {
  const containerRef = useRef(null);
  const optionRef = useRef(null);
  const [time, setTime] = useState("");
  const [isSmall, setIsSmall] = useState(false);

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
      // Prevent body scroll
      document.body.style.overflow = "hidden";

      const tl = gsap.timeline();

      // Set initial visibility and animate
      gsap.set(containerRef.current, { display: "block" });
      tl.fromTo(
        containerRef.current,
        {
          clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
        },
        {
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          duration: 0.8,
          ease: "power2.inOut",
        }
      );

      tl.to(optionRef.current, {});
    } else {
      // Allow body scroll
      document.body.style.overflow = "unset";

      gsap.to(containerRef.current, {
        clipPath: "polygon(0 0, 100% 0, 100% 0%, 0 0%)",
        duration: 0.8,
        ease: "power2.inOut",
        onComplete: () => {
          gsap.set(containerRef.current, { display: "none" });
        },
      });
    }

    // Cleanup function to restore scroll on unmount
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen, isSmall]);

  if (!isSmall) return null;

  return (
    <div
      className="fixed inset-0 w-full h-screen bg-white z-10 sm:hidden px-4"
      style={{
        clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
        display: "none",
      }}
      ref={containerRef}
    >
      <div className="h-full flex justify-center items-center">
        <ul
          className="flex flex-col space-y-6 items-center justify-center"
          ref={optionRef}
        >
          {navOptions.map(({ id, text }) => (
            <li key={id}>
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
