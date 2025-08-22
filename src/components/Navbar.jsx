import { useState } from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail } from "lucide-react";
import logo from "../assets/logo.png";

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

export default function Navbar() {
  const [showContact, setShowContact] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Works", path: "/works" },
    { name: "Pricing", path: "/pricing" },
    { name: "Vouches", path: "/vouches" },
  ];

  return (
    <div className="w-full">
      <nav className="flex items-center justify-between px-6 py-3 bg-black">
        {/* Left side: logo + divider + links */}
        <div className="flex items-center space-x-6">
          {/* Logo */}
          <img src={logo} alt="AceSnap Logo" className="h-10 w-auto" />

          {/* Divider */}
          <div className="w-px h-6 bg-gray-600"></div>

          {/* Links */}
          <div className="flex space-x-6">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className="relative group font-semibold tracking-wide text-gray-300 transition-colors duration-300 hover:text-red-500"
              >
                {({ isActive }) => (
                  <>
                    {link.name}
                    <span
                      className={`absolute left-0 -bottom-1 h-[2px] bg-red-500 transition-transform duration-300 origin-center ${
                        isActive
                          ? "w-full scale-x-100"
                          : "w-full scale-x-0 group-hover:scale-x-100"
                      }`}
                    ></span>
                  </>
                )}
              </NavLink>
            ))}
          </div>
        </div>

        {/* Right side: Contact Button */}
        <button
          onClick={() => setShowContact(true)}
          className="px-4 py-2 rounded-lg font-semibold bg-gradient-to-r from-red-500 to-red-700 text-white hover:scale-105 transition-transform duration-300"
        >
          Contact
        </button>
      </nav>

      {/* Red divider line */}
      <div className="w-full h-[2px] bg-red-600"></div>

      {/* Contact Modal */}
      <AnimatePresence>
        {showContact && (
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
              {/* Close Button */}
              <button
                onClick={() => setShowContact(false)}
                className="absolute top-3 right-3 text-zinc-400 hover:text-red-500"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Title with gradient */}
<h2 className="text-xl font-bold mb-6 text-center bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
  Contact Me
</h2>


              {/* Contact Buttons - Side by Side */}
              <div className="flex justify-center gap-3">
                {/* X (Twitter) */}
                <a
                  href="https://x.com/AceSnapGFX"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 w-32 rounded-md bg-black text-white border border-white/20 hover:scale-105 transform transition duration-200"
                >
                  <span className="text-lg font-bold">X</span>
                  <span className="text-sm font-medium">Twitter</span>
                </a>

                {/* Discord */}
                <a
                  href="https://discord.gg/Zqf2jFmJnC"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 w-32 rounded-md bg-[#5865F2] text-white hover:scale-105 transform transition duration-200"
                >
                  <DiscordIcon className="w-5 h-5" />
                  <span className="text-sm font-medium">Discord</span>
                </a>

                {/* Email */}
                <a
                  href="mailto:acesnapbuisness@gmail.com"
                  className="flex items-center gap-2 px-3 py-2 w-32 rounded-md bg-gradient-to-r from-red-500 to-red-700 text-white hover:scale-105 transform transition duration-200"
                >
                  <Mail className="w-5 h-5" />
                  <span className="text-sm font-medium">Email</span>
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
