import React from "react";

export default function Footer() {
  return (
    <footer className="bg-black bg-opacity-70 py-6 text-center text-gray-400 text-sm">
      &copy; {new Date().getFullYear()}  BgDev. All rights reserved.
    </footer>
  );
}
