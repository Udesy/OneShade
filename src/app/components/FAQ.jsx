import React, { useState } from "react";
import { questions } from "../constants";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="section-padding mt-16 mb-20">
      <div className="w-full h-full flex flex-col">
        <h1 className="heading-text">Frequently Asked Question</h1>
        <div className="w-full flex flex-col justify-center items-end mt-14">
          <div className="w-[70%]">
            {questions.map(({ id, question, answer }, idx) => (
              <div className="border-b-1 w-full" key={id}>
                <button
                  className="flex flex-row items-center w-full py-7 focus:outline-none"
                  onClick={() => handleToggle(idx)}
                  aria-expanded={openIndex === idx}
                >
                  <span className="w-full flex justify-between">
                    <span className="space-x-25 text-xl">
                      <span className=" ">{`0${id}`}</span>
                      <span className="flex-1 text-left ">{question}</span>
                    </span>
                    <span
                      className={`inline-block transition-transform duration-200 ml-2 ${
                        openIndex === idx ? "rotate-90" : "rotate-0"
                      }`}
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="-19.04 0 75.804 75.804"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="#000000"
                      >
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g
                          id="SVGRepo_tracerCarrier"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          <g
                            id="Group_65"
                            data-name="Group 65"
                            transform="translate(-831.568 -384.448)"
                          >
                            <path
                              id="Path_57"
                              data-name="Path 57"
                              d="M833.068,460.252a1.5,1.5,0,0,1-1.061-2.561l33.557-33.56a2.53,2.53,0,0,0,0-3.564l-33.557-33.558a1.5,1.5,0,0,1,2.122-2.121l33.556,33.558a5.53,5.53,0,0,1,0,7.807l-33.557,33.56A1.5,1.5,0,0,1,833.068,460.252Z"
                              fill="#000000"
                              stroke="#000000"
                              strokeWidth="2"
                            ></path>
                          </g>
                        </g>
                      </svg>
                    </span>
                  </span>
                </button>
                {openIndex === idx && (
                  <div className="pb-8 pr-4 text-gray-700 animate-fade-in">
                    <p className="font-body font-normal ml-32">{answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
