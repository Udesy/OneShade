"use client";

import React, { useEffect } from "react";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Lenis from "lenis";
import About from "./components/About";
import Gallery from "./components/Gallery";
import Product from "./components/Product";
import Poster from "./components/Poster";

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
      <Poster />
    </>
  );
};

export default page;
