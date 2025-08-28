import React, { useState, useRef, useEffect } from "react";
import { product_list } from "../constants";
import Card from "./ui/Card";
import ArrowButton from "./ui/ArrowButton";

const Product = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardsPerView = 3; // Show 3 cards at a time
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [screenSize, setScreenSize] = useState({ width: 0, height: 0 });
  const containerRef = useRef(null);

  // Calculate maxIndex to allow the last image to be fully visible
  // This ensures the last card is positioned at the left edge of the viewport
  const maxIndex = Math.max(0, product_list.length - 3);

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

  // Touch/Swipe handlers
  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
    setCurrentX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    setCurrentX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;

    const diff = startX - currentX;
    const threshold = 50; // Minimum swipe distance

    if (Math.abs(diff) > threshold) {
      if (diff > 0 && !isLastSlide) {
        // Swipe left - go to next
        setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
      } else if (diff < 0 && !isFirstSlide) {
        // Swipe right - go to previous
        setCurrentIndex((prev) => Math.max(prev - 1, 0));
      }
    }

    setIsDragging(false);
    setStartX(0);
    setCurrentX(0);
  };

  // Mouse drag handlers for desktop
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setCurrentX(e.clientX);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setCurrentX(e.clientX);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;

    const diff = startX - currentX;
    const threshold = 50;

    if (Math.abs(diff) > threshold) {
      if (diff > 0 && !isLastSlide) {
        setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
      } else if (diff < 0 && !isFirstSlide) {
        setCurrentIndex((prev) => Math.max(prev - 1, 0));
      }
    }

    setIsDragging(false);
    setStartX(0);
    setCurrentX(0);
  };

  // Calculate transform based on screen size and spacing
  const getTransformValue = () => {
    const cardWidth = getCardWidth(); // Get responsive card width
    const spacing = getCurrentSpacing(); // Get responsive spacing
    const spacingRem = spacing / 16; // Convert px to rem

    return currentIndex * (cardWidth + spacingRem);
  };

  // Get current spacing for debugging
  const getCurrentSpacing = () => {
    if (screenSize.width >= 1024) {
      return 60;
    } else if (screenSize.width >= 768) {
      return 30;
    } else {
      return 50;
    }
  };

  // Get responsive card width
  const getCardWidth = () => {
    if (screenSize.width >= 1024) {
      return 26; // 26rem for large screens
    } else if (screenSize.width >= 768) {
      return 22; // 22rem for medium screens
    } else {
      return 17; // 17rem for small screens
    }
  };

  // Cleanup event listeners
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener("touchstart", handleTouchStart, {
      passive: true,
    });
    container.addEventListener("touchmove", handleTouchMove, { passive: true });
    container.addEventListener("touchend", handleTouchEnd, { passive: true });
    container.addEventListener("mousedown", handleMouseDown);
    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseup", handleMouseUp);

    return () => {
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
      container.removeEventListener("touchend", handleTouchEnd);
      container.removeEventListener("mousedown", handleMouseDown);
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, startX, currentX, isFirstSlide, isLastSlide, maxIndex]);

  // Add resize listener to update transform on screen size change
  useEffect(() => {
    const handleResize = () => {
      // Update screen size state
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Set initial screen size
    if (typeof window !== "undefined") {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <section className="section section-padding pt-14 relative">
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
        <div className="overflow-hidden" ref={containerRef}>
          <div
            className="flex flex-row transition-transform duration-700 ease-out transform-gpu cursor-grab active:cursor-grabbing"
            style={{
              transform: `translateX(-${getTransformValue()}rem)`,
              transitionTimingFunction: "cubic-bezier(0.23, 1, 0.32, 1)",
              willChange: "transform",
              backfaceVisibility: "hidden",
            }}
          >
            {product_list.map(
              ({ id, src, product_name, product_price }, index) => (
                <div
                  key={id}
                  className="flex-shrink-0 transform-gpu"
                  style={{
                    width: `${getCardWidth()}rem`, // Responsive card width
                    willChange: "transform",
                    marginRight: `${getCurrentSpacing()}px`,
                  }}
                >
                  <Card
                    src={src}
                    product_name={product_name}
                    product_price={product_price}
                  />
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Product;
