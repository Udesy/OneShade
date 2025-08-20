import Image from "next/image";
import React from "react";
import { about_images } from "../constants";

const About = () => {
  return (
    <section className="section-padding min-h-screen">
      <div className="w-full h-fit grid grid-cols-12 mt-10 gap-4">
        <div className="relative h-fit col-span-2 col-end-13">
          <p className="body-text text-nowrap absolute right-0">(About Us)</p>
        </div>
        <div className="h-fit w-full col-start-1 col-end-9 my-10">
          <h1 className="font-unbounded text-3xl">
            OneShade is a premium clothing brand offering refined, minimal
            designs. We blend timeless aesthetics with expert craftsmanship to
            create confident, everyday essentials.
          </h1>
        </div>
        <div className="col-start-6 col-end-12 h-fit w-full my-6">
          <h3 className="font-unbounded text-lg text-gray-500">
            Crafted with intention through luxurious fabrics, refined fits, and
            subtle details that speak confidence. Some of our collections are
          </h3>
        </div>
      </div>
      <div className="relative w-full h-fit grid grid-cols-12 gap-4 mt-10 pb-[40rem]">
        {about_images.map(({ id, src, alt, className, content }, index) => (
          <div
            key={id}
            className={`w-[30rem] h-[40rem] flex flex-col space-y-4 ${className}`}
          >
            <div className="relative flex-1">
              <Image fill src={src} alt={alt} style={{ objectFit: "cover" }} />
            </div>
            <div className="element-center">
              <h1 className="text-2xl">
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
