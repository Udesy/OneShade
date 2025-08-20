import Image from "next/image";
import React from "react";

const Card = ({ src, product_name, product_price }) => {
  return (
    <div className="flex flex-col justify-center items-center my-10 cursor-pointer">
      <div className="relative w-104 h-145 overflow-hidden group">
        <Image
          src={src}
          fill
          className="transition-all group-hover:scale-110 ease-out duration-500 transform-gpu"
          style={{
            transitionTimingFunction: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            willChange: "transform",
          }}
          alt={product_name}
        />
      </div>
      <div className="flex flex-col justify-center items-center pt-5 space-y-1">
        <h2 className="text-2xl">{product_name}</h2>
        <h2>{product_price}</h2>
      </div>
    </div>
  );
};

export default Card;
