import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Portfolio() {
  const recentWorks = [
    { id: 1, src: "/works/work1.png", title: "Thumbnail Design" },
    { id: 2, src: "/works/work2.png", title: "Banner Design" },
    { id: 3, src: "/works/work3.png", title: "Logo Design" },
    { id: 4, src: "/works/work4.png", title: "Social Media Post" },
  ];

  const [index, setIndex] = useState(0);

  const prevSlide = () =>
    setIndex((prev) => (prev === 0 ? recentWorks.length - 1 : prev - 1));
  const nextSlide = () =>
    setIndex((prev) => (prev === recentWorks.length - 1 ? 0 : prev + 1));

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* Header */}
      <header className="text-center py-12">
        <h1 className="text-4xl font-bold text-red-500">AceSnap</h1>
        <p className="mt-4 text-lg text-gray-300 max-w-xl mx-auto">
          Hello, I am <span className="text-red-500">AceSnap</span>, a passionate
          graphic designer specialized in{" "}
          <span className="text-red-500">thumbnails</span>,{" "}
          <span className="text-red-500">banners</span> and{" "}
          <span className="text-red-500">logos</span>. I bring futuristic
          aesthetics to your brand.
        </p>
      </header>

      {/* Recent Works Slider */}
      <section className="relative w-full max-w-5xl mx-auto overflow-hidden">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Recent Works
        </h2>
        <div className="flex items-center justify-center relative">
          <button
            onClick={prevSlide}
            className="absolute left-0 bg-red-600 hover:bg-red-700 p-3 rounded-full"
          >
            <ChevronLeft />
          </button>

          <motion.div
            key={index}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="w-3/4 h-64 flex justify-center items-center bg-zinc-900 rounded-2xl shadow-lg"
          >
            <img
              src={recentWorks[index].src}
              alt={recentWorks[index].title}
              className="rounded-xl object-cover w-full h-full"
            />
          </motion.div>

          <button
            onClick={nextSlide}
            className="absolute right-0 bg-red-600 hover:bg-red-700 p-3 rounded-full"
          >
            <ChevronRight />
          </button>
        </div>
      </section>

      {/* Categories Section */}
      <section className="mt-16 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
        <div className="bg-zinc-900 p-6 rounded-2xl shadow-lg hover:shadow-red-500/50 transition">
          <h3 className="text-xl text-red-500 mb-4">Thumbnails</h3>
          <p className="text-gray-400">
            Custom YouTube thumbnails that pop and grab attention.
          </p>
        </div>

        <div className="bg-zinc-900 p-6 rounded-2xl shadow-lg hover:shadow-red-500/50 transition">
          <h3 className="text-xl text-red-500 mb-4">Banners</h3>
          <p className="text-gray-400">
            Futuristic banners for social media, streaming and brands.
          </p>
        </div>

        <div className="bg-zinc-900 p-6 rounded-2xl shadow-lg hover:shadow-red-500/50 transition">
          <h3 className="text-xl text-red-500 mb-4">Logos</h3>
          <p className="text-gray-400">
            Unique and modern logo designs to represent your identity.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-12 text-gray-500 mt-20 border-t border-zinc-800">
        © 2025 AceSnap | Designed with ❤️
      </footer>
    </div>
  );
}
