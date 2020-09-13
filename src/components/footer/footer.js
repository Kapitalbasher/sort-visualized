import React from "react";
import "./footer.css";

const Footer = () => {
  return (
    <ul className="footer">
      <li className="footer-items">
        <h1>Sort Visualized</h1>
      </li>
      <li className="footer-items">Made by Tim</li>
      <li className="footer-items">
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/Kapitalbasher/sort-visualized"
        >
          GitHub
        </a>
      </li>
    </ul>
  );
};
export default Footer;
