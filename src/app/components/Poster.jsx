import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Image from "next/image";
import React, { useRef } from "react";

const Poster = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);

  gsap.registerPlugin(SplitText, ScrollTrigger);

  useGSAP(
    () => {
      const splitText = new SplitText(textRef.current, {
        type: "lines",
        linesClass: "lines",
      });

      // Set initial state for the LINES, not the splitText object
      gsap.set(splitText.lines, {
        opacity: 0,
        y: 100,
      });

      // Animate the LINES, not the splitText object
      gsap.to(splitText.lines, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 20%",
          once: true,
          fastScrollEnd: true, // correct property name
        },
      });

      // Cleanup function
      return () => {
        if (splitText) splitText.revert();
      };
    },
    { scope: containerRef }
  );

  return (
    <section className="section h-screen" ref={containerRef}>
      <div className="relative w-full h-full">
        <div className="absolute top-0 left-0 z-10 w-full h-full flex justify-center items-center">
          <h1
            className="lg:text-7xl md:text-6xl sm:text-5xl text-4xl text-center text-white lg:leading-19 md:leading-15 sm:leading-12 leading-10 overflow-hidden w-full "
            ref={textRef}
          >
            We believe confidence begins <br /> with how you feel in what you{" "}
            <br /> wear.
          </h1>
        </div>
        <div className="absolute top-0 left-0 w-full h-full">
          <Image
            src={"/images/poster-section/poster.jpg"}
            fill
            alt="poster"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default Poster;
