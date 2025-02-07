"use client";

import { useState, useEffect } from "react";
import { IoMdArrowUp } from "react-icons/io";

const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show the button when the user scrolls down 300px
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Scroll to the top of the page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Smooth scrolling
    });
  };

  // Add a scroll event listener when the component mounts
  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <div className="backToTop">
      {isVisible && (
        <button onClick={scrollToTop} className="button">
          <div className=" grid place-content-center">
            <IoMdArrowUp size={23} />
          </div>
        </button>
      )}
    </div>
  );
};

export default BackToTopButton;
