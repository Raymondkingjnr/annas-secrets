"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import hero1 from "../asset/images/hero.jpg";
import hero2 from "../asset/images/herobg2.jpg";
import hero3 from "../asset/images/herobg3.jpg";
import hero4 from "../asset/images/herobg4.jpg";

const Hero = () => {
  // const { push } = useRouter();
  // const [loading, setLoading] = useState(false);
  // const [query, setQuery] = useState("");

  // const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   // Simulate a search action
  //   setTimeout(() => {
  //     setLoading(false);
  //     push(`/search?query=${query}`);
  //   }, 2000);
  // };

  const images = [hero1, hero2, hero3, hero4];

  const [currentIndex, setCurrentIndex] = React.useState(0);

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  React.useEffect(() => {
    const interval = setInterval(() => {
      goToNext();
    }, 5000); // Change image every 3 seconds

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [currentIndex]); // Re-run effect when currentIndex changes

  return (
    <div className="relative w-full z-0 max-w-5xl pt-1 mx-auto overflow-hidden">
      {/* Carousel Container */}
      <div className="relative h-96">
        <AnimatePresence initial={false}>
          <motion.img
            key={currentIndex}
            src={images[currentIndex].src}
            alt={`Slide ${currentIndex}`}
            className="w-full h-full object-cover rounded"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
          />
        </AnimatePresence>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={goToPrev}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/50 p-2 rounded-full shadow-lg hover:bg-white/75 transition"
      >
        &larr;
      </button>
      <button
        onClick={goToNext}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/50 p-2 rounded-full shadow-lg hover:bg-white/75 transition"
      >
        &rarr;
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full ${
              currentIndex === index ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;
