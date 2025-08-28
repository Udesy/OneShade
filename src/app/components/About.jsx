import Image from "next/image";
import React from "react";
import { about_images } from "../constants";

const About = () => {
  return (
    <section className="section-padding min-h-screen relative lg:mb-20 md:mb-10 mb-200">
      {/* About Us label */}
      <div className="w-full flex justify-end mt-10">
        <p className="body-text text-nowrap lg:text-xl md:text-lg text-sm">
          (About Us)
        </p>
      </div>

      {/* Main content with proper grid */}
      <div className="w-full h-fit grid lg:grid-cols-12 md:grid-cols-8 grid-cols-4 mt-10 gap-4">
        {/* Main heading - takes full available width */}
        <div className="lg:col-span-8 md:col-span-6 col-span-4">
          <h1 className="font-unbounded lg:text-3xl md:text-2xl sm:text-xl">
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
              <Image fill src={src} alt={alt} style={{ objectFit: "cover" }} />
            </div>
            <div className="element-center">
              <h1 className="lg:text-3xl md:text-2xl text-sm text-nowrap">
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
