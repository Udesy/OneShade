import Image from "next/image";
import React from "react";

const TestinmonialCard = ({ name, address, img_src, content }) => {
  return (
    <div className="w-[23rem] h-[14rem] flex flex-col justify-between bg-neutral-200 rounded-xl p-6 cursor-pointer">
      <div>
        <h2 className="leading-5">{content}</h2>
      </div>
      <div className="flex flex-row items-center space-x-4 mt-4">
        <div className="relative w-16 h-16 rounded-full overflow-hidden">
          <Image src={img_src} fill className="object-cover" alt={name} />
        </div>
        <div>
          <h3>{name}</h3>
          <h4 className="body-text text-sm font-normal">{address}</h4>
        </div>
      </div>
    </div>
  );
};

export default TestinmonialCard;
