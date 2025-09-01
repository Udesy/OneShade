"use client";

import React, { useEffect, useState } from "react";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Lenis from "lenis";
import About from "./components/About";
import Gallery from "./components/Gallery";
import Product from "./components/Product";
import Poster from "./components/Poster";
import Testimonial from "./components/Testimonial";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import Loader from "./components/Loader";

const Page = () => {
  const [loadingDone, setLoadingDone] = useState(false);

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
      {!loadingDone && <Loader onComplete={() => setLoadingDone(true)} />}
      <Navbar animate={loadingDone} />
      <Hero animate={loadingDone} />
      <About />
      <Gallery />
      <Product />
      <Poster />
      <Testimonial />
      <FAQ />
      <Footer />
    </>
  );
};

export default Page;
