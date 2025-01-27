// components/Footer.js

import React from "react";

const Footer = () => {
  return (
    <footer className="text-center py-6 text-xs text-gray-500 bg-gray-800">
      <p>&copy; 2025 Air Force Toolkit. All rights reserved.</p>
      <p className="mt-2">
        This is not an official DoD website. Content doesn't reflect DoD views.
      </p>
      <p className="mt-2">
        Affiliate:{" "}
        <a
          href="https://automateeverything.us"
          className="text-blue-400 hover:underline"
          target="_blank"
          rel="noreferrer"
        >
          Automate Everything
        </a>
      </p>
    </footer>
  );
};

export default Footer;
