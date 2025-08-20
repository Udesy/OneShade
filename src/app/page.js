"use client";

import React, { useEffect } from "react";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Lenis from "lenis";
import About from "./components/About";
import Gallery from "./components/Gallery";
import Product from "./components/Product";

const page = () => {
  useEffect(() => {
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Gallery />
      <Product />
    </>
  );
};

export default page;
