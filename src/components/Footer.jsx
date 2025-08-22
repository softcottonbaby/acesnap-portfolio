// src/components/Footer.jsx
import { Link } from "react-router-dom";

export default function Footer({ openContact }) {
  return (
    <footer className="footer select-none relative z-20 bg-black text-gray-300 mt-16">
      <div className="footer-container">
        {/* Branding */}
        <div className="footer-col">
          <h3 className="text-white font-semibold">AceSnap</h3>
          <p>Professional GFX Artist</p>
        </div>

        {/* Solutions */}
        <div className="footer-col">
          <h4>WORKS</h4>
          <ul>
            <li>
              <Link to="/works#thumbnails">Thumbnails</Link>
            </li>
            <li>
              <Link to="/works#logos">Logos</Link>
            </li>
            <li>
              <Link to="/works#banners">Banners</Link>
            </li>
          </ul>
        </div>

        {/* Links */}
        <div className="footer-col">
          <h4>LINKS</h4>
          <ul>
            <li>
              <Link to="/works">Projects</Link>
            </li>
          
            <li>
              <a href="#about">About</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom line + copyright */}
      <div className="footer-bottom mt-8">
        <div className="footer-line"></div>
        <p>© {new Date().getFullYear()} AceSnap. All rights reserved.</p>
      </div>
    </footer>
  );
}
