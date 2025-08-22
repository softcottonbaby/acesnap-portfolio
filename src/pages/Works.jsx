import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "../components/Layout";

export default function Works() {
  const categories = {
    RECENT: [
      { id: 1, src: "/works/work1.png", title: "Thumbnail Design" },
      { id: 2, src: "/works/work2.png", title: "Banner Design" },
      { id: 3, src: "/works/logo4.png", title: "Logo Design" },
      { id: 4, src: "/works/banner1.png", title: "Social Media Post" },
    ],
    THUMBNAILS: [
      { id: 5, src: "/works/thumb1.png", title: "YT Thumbnail" },
      { id: 6, src: "/works/thumb2.png", title: "YT Thumbnail" },
      { id: 7, src: "/works/thumb3.png", title: "YT Thumbnail" },
      { id: 8, src: "/works/thumb4.png", title: "YT Thumbnail" },
      { id: 9, src: "/works/thumb5.png", title: "YT Thumbnail" },
      { id: 10, src: "/works/thumb6.png", title: "YT Thumbnail" },
      { id: 11, src: "/works/thumb7.png", title: "YT Thumbnail" },
      { id: 12, src: "/works/thumb8.png", title: "YT Thumbnail" },
    ],
    BANNERS: [
      { id: 13, src: "/works/banner1.png", title: "Winovo GW Banner" },
      { id: 14, src: "/works/banner2.png", title: "Winovo Poker Event Banner" },
      { id: 15, src: "/works/banner3.png", title: "YungReal GW Banner" },
      { id: 16, src: "/works/banner4.png", title: "YungReal Banner" },
      { id: 17, src: "/works/banner5.png", title: "YungReal stream banner" },
      { id: 18, src: "/works/banner6.png", title: "YungReal Discord Banner" },
      { id: 19, src: "/works/banner7.png", title: "YungReal Twitter Banner" },
      { id: 20, src: "/works/banner8.png", title: "YungReal YouTube Banner" },
      { id: 21, src: "/works/banner9.png", title: "YungReal RoPvP Banner" },
      { id: 22, src: "/works/banner10.png", title: "Moon Stramer Banner" },
    ],
    LOGOS: [
      { id: 23, src: "/works/logo1.png", title: "PetBet Gambling Site logo" },
      { id: 24, src: "/works/logo2.png", title: "RbxRoyale Gambling Site logo" },
      { id: 25, src: "/works/logo3.png", title: "Zynko Streamer Logo" },
      { id: 26, src: "/works/logo4.png", title: "SoftCotton Streamer Logo" },
      { id: 27, src: "/works/logo5.png", title: "MM2 World gambling logo" },
      { id: 28, src: "/works/logo6.png", title: "UserLogo" },
      { id: 29, src: "/works/logo7.gif", title: "UserLogo" },
    ],
  };

  const [activeCategory, setActiveCategory] = useState("RECENT");
  const [index, setIndex] = useState(0);

  const currentWorks = categories[activeCategory];

  const prevSlide = () =>
    setIndex((p) => (p === 0 ? currentWorks.length - 1 : p - 1));
  const nextSlide = () =>
    setIndex((p) => (p === currentWorks.length - 1 ? 0 : p + 1));

  // Detect hash in URL (like #thumbnails) and set active category
  useEffect(() => {
    const hash = window.location.hash.replace("#", "").toUpperCase();
    if (hash && categories[hash]) {
      setActiveCategory(hash);
      setIndex(0);
    }
  }, []);

  return (
    <Layout>
      <div className="flex flex-col items-center text-center w-full px-6 select-none">
        {/* Header */}
        <h1 className="text-4xl font-bold text-red-500 mb-4 uppercase" id="works">
          MY WORK
        </h1>
        <p className="text-gray-400 mb-6 max-w-2xl">
          A collection of my past design projects — from thumbnails to banners
          and logos. Swipe through to explore my style.
        </p>

        {/* Category Selector */}
        <div className="flex items-center justify-center gap-6 text-sm font-semibold mb-6">
          {Object.keys(categories).map((cat, i) => (
            <React.Fragment key={cat}>
              <button
                id={cat.toLowerCase()} // 🔑 each category gets an ID
                onClick={() => {
                  setActiveCategory(cat);
                  setIndex(0);
                }}
                className="relative px-4 py-1 uppercase tracking-wide cursor-pointer"
              >
                <motion.span
                  animate={{
                    color: activeCategory === cat ? "#ef4444" : "#ffffff", // white → red
                  }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="block"
                >
                  {cat}
                </motion.span>
              </button>

              {/* Divider */}
              {i < Object.keys(categories).length - 1 && (
                <span className="text-gray-600">|</span>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Main Preview Carousel */}
        <div
          className="relative w-full max-w-5xl h-[420px]
                        bg-gradient-to-br from-zinc-900/90 to-black/80
                        border border-zinc-800 rounded-2xl shadow-xl
                        flex items-center justify-center overflow-hidden backdrop-blur-md"
        >
          {/* Left arrow */}
          <button
            onClick={prevSlide}
            className="absolute left-4 bg-red-600 hover:bg-red-700 p-3 rounded-full z-20
                       transition-all duration-300 transform hover:scale-110
                       hover:shadow-[0_0_8px_rgba(239,68,68,0.5)] cursor-pointer"
          >
            <ChevronLeft className="text-white" />
          </button>

          {/* Animated image */}
          <div className="w-full h-full flex items-center justify-center px-6">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentWorks[index].id}
                src={currentWorks[index].src}
                alt={currentWorks[index].title}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="max-h-[90%] max-w-[90%] object-contain rounded-lg"
              />
            </AnimatePresence>
          </div>

          {/* Right arrow */}
          <button
            onClick={nextSlide}
            className="absolute right-4 bg-red-600 hover:bg-red-700 p-3 rounded-full z-20
                       transition-all duration-300 transform hover:scale-110
                       hover:shadow-[0_0_8px_rgba(239,68,68,0.5)] cursor-pointer"
          >
            <ChevronRight className="text-white" />
          </button>
        </div>

        {/* Current slide title */}
        <h2 className="text-xl text-gray-200 font-semibold mt-6">
          {currentWorks[index].title}
        </h2>
      </div>
    </Layout>
  );
}
