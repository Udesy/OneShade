"use client";

import React, { useState } from "react";
import Button from "./Button";
import Logo from "./Logo";
import { navItem } from "../constants";
import Link from "next/link";

const Navbar = () => {
  const [isOpen, setisOpen] = useState(false);

  return (
    <div className="absolute top-0 left-0 h-fit w-full z-10 section-padding">
      <div className="w-full h-full flex flex-row justify-between">
        <div className="w-44 h-12 overflow-clip">
          <Logo className={"text-black invert"} />
        </div>
        <div className="flex flex-row items-center space-x-7">
          <div className="h-full flex items-center max-md:hidden">
            <ul className="flex flex-row space-x-5">
              {navItem.map(({ id, title, url }) => (
                <li key={id}>
                  <Link href={url} className="navItem text-white">
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
              className={"max-md:block hidden"}
              isOpen={isOpen}
              onClick={() => setisOpen(!isOpen)}
            ></Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
