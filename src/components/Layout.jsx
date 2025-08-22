// src/components/Layout.jsx
import { useEffect, useState } from "react";
import Background from "./Background";
import Footer from "./Footer";

export default function Layout({ children }) {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  const [particles] = useState(() =>
    Array.from({ length: 30 }).map(() => ({
      left: Math.random() * 100,
      delay: Math.random() * 6,
      duration: 6 + Math.random() * 4, // 6–10s (slower)
      size: 1 + Math.random() * 3,
      opacity: 0.6 + Math.random() * 0.4, // slightly brighter
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
    <div className="relative bg-black text-white overflow-hidden">
      {/* Background grid */}
      <Background />

      {/* Bottom red glow (behind sparkles) */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[160%] h-64 bg-red-600 opacity-50 blur-[160px] z-0"></div>

      {/* Cursor glow */}
      <div
        className="pointer-events-none absolute w-[600px] h-[600px] opacity-30 z-10"
        style={{
          left: cursorPos.x + "px",
          top: cursorPos.y + "px",
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(circle, rgba(239,68,68,0.6) 0%, rgba(239,68,68,0) 70%)",
        }}
      />

      {/* Sparkles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-20">
        {particles.map((p, i) => (
          <span
            key={i}
            className="absolute bg-red-500 rounded-full"
            style={{
              left: `${p.left}%`,
              bottom: `-100px`, // start below footer
              width: `${p.size}px`,
              height: `${p.size}px`,
              opacity: p.opacity,
              animation: `floatUp ${p.duration}s linear infinite`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Page content */}
      <main className="relative z-30 min-h-screen flex items-center justify-center pt-32 pb-32">
        {children}
      </main>

      {/* Footer */}
      <Footer />

      {/* Custom keyframes */}
      <style jsx global>{`
        @keyframes floatUp {
          0% {
            transform: translateY(0);
            opacity: 0; /* fade in smoothly */
          }
          10% {
            opacity: 1; /* fully visible */
          }
          80% {
            opacity: 1; /* stay visible most of the way */
          }
          100% {
            transform: translateY(-120vh); /* float way up */
            opacity: 0; /* fade out smoothly */
          }
        }
      `}</style>
    </div>
  );
}
