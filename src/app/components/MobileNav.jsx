import gsap from "gsap";
import React, { useEffect, useRef } from "react";
import HoverText from "./ui/HoverText";

const MobileNav = ({ isOpen }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    if (isOpen) {
      // Prevent body scroll
      document.body.style.overflow = "hidden";

      // Set initial visibility and animate
      gsap.set(containerRef.current, { display: "block" });
      gsap.fromTo(
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
  }, [isOpen]);

  return (
    <div
      className="fixed inset-0 w-full h-screen bg-white z-10 sm:hidden"
      style={{
        clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
        display: "none",
      }}
      ref={containerRef}
    >
      <div className="p-8 pt-32">
        <ul className="flex flex-col space-y-6">
          <li>
            <HoverText
              text={"Home"}
              className={"text-black text-2xl font-body"}
            />
          </li>
          <li>
            <HoverText
              text={"About"}
              className={"text-black text-2xl font-body"}
            />
          </li>
          <li>
            <HoverText
              text={"Products"}
              className={"text-black text-2xl font-body"}
            />
          </li>
          <li>
            <HoverText
              text={"Contact"}
              className={"text-black text-2xl font-body"}
            />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MobileNav;
