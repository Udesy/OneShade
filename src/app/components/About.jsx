"use client";

import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { about_images } from "../constants";
import gsap from "gsap";
import SplitText from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(SplitText, ScrollTrigger);

const About = () => {
  const textRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    // Wait for fonts to load and element to be available
    const initAnimation = () => {
      if (!textRef.current || !containerRef.current) return;

      // Additional check to ensure element has text content
      if (!textRef.current.textContent || !textRef.current.textContent.trim())
        return;

      try {
        const splitText = new SplitText(textRef.current, {
          type: "words chars",
        });

        gsap.fromTo(
          splitText.chars,
          {
            opacity: 0.1,
          },
          {
            opacity: 1,
            stagger: 0.08,
            duration: 1.5,
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 30%",
              end: "bottom 50%",
              scrub: 1,
            },
          }
        );
      } catch (error) {
        console.warn("SplitText animation failed:", error);
      }
    };

    // Check if fonts are loaded
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        // Longer delay to ensure fonts are fully rendered
        setTimeout(initAnimation, 500);
      });
    } else {
      // Fallback for browsers without font loading API
      setTimeout(initAnimation, 1500);
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section className="section-padding min-h-screen relative lg:mb-20 md:mb-10 mb-200">
      {/* About Us label */}
      <div className="w-full flex justify-end mt-10">
        <p className="body-text text-nowrap lg:text-xl md:text-lg text-sm">
          (About Us)
        </p>
      </div>

      {/* Main content with proper grid */}
      <div
        className="w-full h-fit grid lg:grid-cols-12 md:grid-cols-8 grid-cols-4 mt-10 gap-4"
        ref={containerRef}
      >
        {/* Main heading - takes full available width */}
        <div className="lg:col-span-8 md:col-span-6 col-span-4">
          <h1
            className="font-unbounded lg:text-3xl md:text-2xl sm:text-xl"
            ref={textRef}
          >
            OneShade is a premium clothing brand offering refined, minimal
            designs. We blend timeless aesthetics with expert craftsmanship to
            create confident, everyday essentials.
          </h1>
        </div>

        {/* Secondary text */}
        <div className="lg:col-start-7 lg:col-span-6 md:col-start-4 md:col-span-6 col-start-2 col-span-4 mt-6">
          <h3 className="font-unbounded lg:text-lg md:text-[16px] text-[12px] text-gray-500">
            Crafted with intention through luxurious fabrics, refined fits, and
            subtle details that speak confidence. Some of our collections are
          </h3>
        </div>
      </div>
      <div className="relative w-full h-full grid lg:grid-cols-12 md:grid-cols-8 grid-cols-4 gap-4 mt-36 lg:mb-[40rem] md:mb-[30rem] sm:mb-[15rem] mb-[10rem]">
        {about_images.map(({ id, src, alt, className, content }, index) => (
          <div
            key={id}
            className={`w-full lg:h-[45rem] md:h-[35rem] sm:h-[30rem] h-[20rem] flex flex-col space-y-4 ${className}`}
          >
            <div className="relative flex-1">
              <Image
                fill
                src={src}
                alt={alt}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className="element-center">
              <h1 className="lg:text-3xl md:text-2xl sm:text-sm text-xs md:text-nowrap text-center">
                <sup className="mr-2">{`(0${index + 1})`}</sup>
                {content}
              </h1>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default About;
