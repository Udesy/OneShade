import React, { useState } from "react";
import { product_list } from "../constants";
import Card from "./ui/Card";
import ArrowButton from "./ui/ArrowButton";

const Product = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardsPerView = 3; // Show 3 cards at a time
  const maxIndex = Math.max(0, product_list.length - cardsPerView);

  // Button disabled states
  const isFirstSlide = currentIndex === 0;
  const isLastSlide = currentIndex >= maxIndex;

  // Handler functions
  const handleNext = () => {
    if (!isLastSlide) {
      setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
    }
  };

  const handlePrev = () => {
    if (!isFirstSlide) {
      setCurrentIndex((prev) => Math.max(prev - 1, 0));
    }
  };
  return (
    <section className="section section-padding pt-14">
      <div className="flex flex-col">
        <div className="flex flex-row justify-between items-center">
          <div>
            <h1 className="text-3xl">Our Bestsellers</h1>
          </div>
          <div className="flex flex-row space-x-2.5">
            <ArrowButton
              direction={"left"}
              onClick={handlePrev}
              disabled={isFirstSlide}
            />
            <ArrowButton
              direction={"right"}
              onClick={handleNext}
              disabled={isLastSlide}
            />
          </div>
        </div>
        <div className="overflow-hidden">
          <div
            className="flex flex-row transition-transform duration-700 ease-out transform-gpu"
            style={{
              transform: `translateX(-${currentIndex * (100 / cardsPerView)}%)`,
              transitionTimingFunction: "cubic-bezier(0.23, 1, 0.32, 1)",
              willChange: "transform",
              backfaceVisibility: "hidden",
            }}
          >
            {product_list.map(({ id, src, product_name, product_price }) => (
              <div
                key={id}
                className="flex-shrink-0 px-9 transform-gpu"
                style={{
                  width: `${100 / cardsPerView}%`,
                  willChange: "transform",
                }}
              >
                <Card
                  src={src}
                  product_name={product_name}
                  product_price={product_price}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Product;
