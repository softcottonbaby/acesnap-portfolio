// src/components/Background.jsx
export default function Background() {
  return (
    <>
      <div className="absolute inset-0 bg-black [background-size:40px_40px] [background-image:linear-gradient(to_right,rgba(255,0,0,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,0,0,0.1)_1px,transparent_1px)]"></div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[120%] h-48 bg-red-600 opacity-20 blur-3xl"></div>
    </>
  );
}
