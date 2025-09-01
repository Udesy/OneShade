"use client";

import React, { useEffect, useRef, useState } from "react";
import Button from "./ui/Button";
import Logo from "./Logo";
import { navItem } from "../constants";
import Link from "next/link";
import MobileNav from "./MobileNav";
import gsap from "gsap";

const Navbar = ({ animate }) => {
  const [isOpen, setisOpen] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    gsap.set(navRef.current, { opacity: 0 });
  }, []);

  useEffect(() => {
    if (animate) {
      gsap.to(navRef.current, {
        opacity: 1,
        duration: 0.4,
        ease: "power4.inOut",
      });
    }
  }, [animate]);

  return (
    <div
      className="absolute top-0 left-0 h-fit w-full z-50 section-padding"
      ref={navRef}
    >
      <div className="w-full h-full flex flex-row justify-between">
        <div className="w-44 h-12 overflow-clip relative z-50">
          <Logo className={""} isOpen={isOpen} />
        </div>
        <div className="flex flex-row items-center space-x-7">
          <div className="h-full flex items-center max-md:hidden">
            <ul className="flex flex-row space-x-5">
              {navItem.map(({ id, title, url }) => (
                <li key={id}>
                  <Link
                    href={url}
                    className="hover-animation text-white navItem"
                  >
                    {title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <Button
              content={"Shop Now"}
              text={true}
              className={"max-md:hidden"}
            />
            <Button
              text={false}
              className={"max-md:block hidden z-20"}
              isOpen={isOpen}
              onClick={() => setisOpen(!isOpen)}
            ></Button>
          </div>
        </div>
      </div>
      <MobileNav isOpen={isOpen} />
    </div>
  );
};

export default Navbar;
