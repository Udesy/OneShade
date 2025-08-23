"use client";

import React, { useEffect, useRef } from "react";
import { testimonials } from "../constants";
import TestinmonialCard from "./ui/TestinmonialCard";

const Testimonial = () => {
  const scrollRef = useRef(null);
  const isPausedRef = useRef(false);

  // Duplicate testimonials for seamless infinite scroll
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationId;
    let scrollPosition = 0;
    let lastTimestamp = 0;

    const scrollSpeed = 60; // pixels per second
    const cardWidth = 368; // 23rem = 368px
    const gap = 56; // space-x-14 = 56px
    const oneSetWidth = testimonials.length * (cardWidth + gap);

    const animate = (timestamp) => {
      // Calculate delta time for frame-independent animation
      const deltaTime = timestamp - lastTimestamp;
      lastTimestamp = timestamp;

      // Only move if not paused and we have a valid deltaTime
      if (!isPausedRef.current && deltaTime > 0) {
        // Convert speed from pixels/second to pixels/frame
        const frameSpeed = (scrollSpeed * deltaTime) / 1000;
        scrollPosition += frameSpeed;

        // Reset position when we've scrolled through one complete set
        if (scrollPosition >= oneSetWidth) {
          scrollPosition = scrollPosition - oneSetWidth;
        }

        // Use transform3d for better performance
        scrollContainer.style.transform = `translate3d(-${scrollPosition}px, 0, 0)`;
      }

      animationId = requestAnimationFrame(animate);
    };

    // Start the animation
    animationId = requestAnimationFrame(animate);

    // Cleanup function
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [testimonials.length]);

  // Handle mouse enter/leave for pausing animation
  const handleMouseEnter = () => {
    isPausedRef.current = true;
  };

  const handleMouseLeave = () => {
    isPausedRef.current = false;
  };

  return (
    <section className="section-padding mt-18">
      <div className="flex flex-col">
        <div className="flex flex-row justify-between items-center">
          <div>
            <h1 className="heading-text">Hear From Our Customers</h1>
          </div>
        </div>
        <div className="overflow-hidden w-full mt-14">
          <div
            ref={scrollRef}
            className="flex flex-row space-x-14"
            style={{ width: "max-content" }}
          >
            {duplicatedTestimonials.map(
              ({ id, name, address, img_src, content }, index) => (
                <div
                  key={`${id}-${index}`}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <TestinmonialCard
                    name={name}
                    address={address}
                    img_src={img_src}
                    content={content}
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

export default Testimonial;
