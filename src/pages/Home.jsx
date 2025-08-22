import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail } from "lucide-react";
import Footer from "../components/Footer";
// ✅ Custom Discord SVG Icon
function DiscordIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 245 240"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M104.4 104.3c-5.7 0-10.2 5-10.2 11.1s4.6 11.1 10.2 11.1c5.7 0 10.2-5 10.2-11.1s-4.5-11.1-10.2-11.1zm36.2 0c-5.7 0-10.2 5-10.2 11.1s4.6 11.1 10.2 11.1c5.7 0 10.2-5 10.2-11.1s-4.5-11.1-10.2-11.1z"
        fill="currentColor"
      />
      <path
        d="M189.5 20h-134C36.5 20 20 36.5 20 57.5v125C20 203.5 36.5 220 55.5 220h113l-5.4-18.8 13 12.1 12.3 11.2 21.9 19.5V57.5c0-21-16.5-37.5-36.5-37.5zM163 162s-4.6-5.5-8.4-10.3c16.7-4.7 23.1-15 23.1-15-5.2 3.4-10.2 5.8-14.7 7.5-6.4 2.7-12.6 4.5-18.7 5.5-12.4 2.3-23.8 1.7-33.7-.1-7.4-1.5-13.8-3.6-19.1-5.5-3-1.1-6.3-2.5-9.6-4.4-.4-.2-.8-.4-1.2-.7-.3-.2-.5-.3-.7-.4-.2-.1-.3-.2-.5-.3-2.1-1.2-3.3-2-3.3-2s6.2 10.2 22.7 15c-3.8 4.8-8.5 10.4-8.5 10.4-28.1-.9-38.8-19.3-38.8-19.3 0-41 18.4-74.3 18.4-74.3 18.4-13.7 35.8-13.3 35.8-13.3l1.3 1.5c-23 6.6-33.6 16.5-33.6 16.5s2.8-1.6 7.4-3.8c13.5-5.9 24.2-7.5 28.6-7.9.7-.1 1.2-.2 1.9-.2 6.9-.9 14.7-1.1 22.9-.2 10.8 1.3 22.4 4.7 34.2 11.5 0 0-10.1-9.6-31.9-16.2l1.8-2s17.4-.4 35.8 13.3c0 0 18.4 33.3 18.4 74.3 0-.1-10.7 18.3-38.8 19.2z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function Home() {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [particles] = useState(() =>
    Array.from({ length: 20 }).map(() => ({
      left: Math.random() * 100,
      delay: Math.random() * 6,
      duration: 3 + Math.random() * 3,
      size: 1 + Math.random() * 3,
      opacity: 0.4 + Math.random() * 0.6,
    }))
  );

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      {/* HERO SECTION */}
      <motion.section
        className="relative flex flex-col items-center justify-center text-center min-h-screen bg-black text-white px-6 overflow-hidden select-none"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        transition={{ duration: 0.5 }}
      >
        {/* Background effects */}
        <div className="absolute inset-0 bg-black [background-size:40px_40px] [background-image:linear-gradient(to_right,rgba(255,0,0,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,0,0,0.1)_1px,transparent_1px)]"></div>
        <div
          className="pointer-events-none absolute w-[600px] h-[600px] opacity-25"
          style={{
            left: cursorPos.x + "px",
            top: cursorPos.y + "px",
            transform: "translate(-50%, -50%)",
            background:
              "radial-gradient(circle, rgba(239,68,68,0.6) 0%, rgba(239,68,68,0) 70%)",
          }}
        />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[120%] h-48 bg-red-600 opacity-20 blur-3xl"></div>

        {/* Content */}
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4 relative z-10">
          AceSnap
        </h1>
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-300 mb-6 relative z-10">
          Professional GFX Artist
        </h2>
        <p className="max-w-2xl text-gray-400 text-lg leading-relaxed mb-10 relative z-10">
          With over{" "}
          <span className="text-red-500 font-semibold">
            4 years of experience
          </span>{" "}
          in Photoshop, Blender, and Illustrator, I create high-quality{" "}
          <span className="text-white font-medium">
            thumbnails, logos, and banners
          </span>
          . Designing is more than work for me—it’s a passion. Let’s collaborate
          to bring your ideas to life!
        </p>

        {/* Buttons */}
        <div className="flex space-x-4 relative z-10">
          <Link
            to="/works"
            className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl shadow-lg transition-transform transform hover:scale-105"
          >
            Explore Projects →
          </Link>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-3 border border-gray-600 hover:border-red-500 hover:text-red-500 text-white font-semibold rounded-xl transition-colors"
          >
            Contact
          </button>
        </div>
      </motion.section>

      {/* ✅ Reuse Footer instead of redefining it */}
      <Footer openModal={() => setIsModalOpen(true)} />

      {/* Sparkles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {particles.map((p, i) => (
          <span
            key={i}
            className="absolute bg-red-500 rounded-full animate-float"
            style={{
              left: `${p.left}%`,
              bottom: `-40px`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              opacity: p.opacity,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
            }}
          />
        ))}
      </div>

      {/* Contact Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-black/60 backdrop-blur-md p-6 rounded-2xl shadow-2xl w-fit relative"
            >
              {/* Close */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-3 right-3 text-zinc-400 hover:text-red-500"
              >
                <X className="w-5 h-5" />
              </button>

              <h2 className="text-xl font-bold mb-6 text-center bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Contact Me
              </h2>

              <div className="flex justify-center gap-3">
                {/* Twitter */}
                <a
                  href="https://x.com/AceSnapGFX"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 w-32 rounded-md bg-black text-white border border-white/20 hover:scale-105 transition"
                >
                  <span className="text-lg font-bold">X</span>
                  <span className="text-sm font-medium">Twitter</span>
                </a>
                {/* Discord */}
                <a
                  href="https://discord.gg/Zqf2jFmJnC"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 w-32 rounded-md bg-[#5865F2] text-white hover:scale-105 transition"
                >
                  <DiscordIcon className="w-5 h-5" />
                  <span className="text-sm font-medium">Discord</span>
                </a>
                {/* Email */}
                <a
                  href="mailto:acesnapbuisness@gmail.com?subject=Project%20Inquiry&body=Hello%20AceSnap,%0D%0A%0D%0AI’d%20like%20to%20discuss%20a%20new%20project%20with%20you."
                  className="flex items-center gap-2 px-3 py-2 w-32 rounded-md bg-gradient-to-r from-red-500 to-red-700 text-white hover:scale-105 transition"
                >
                  <Mail className="w-5 h-5" />
                  <span className="text-sm font-medium">Email</span>
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
