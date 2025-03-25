"use client";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const updateTheme = () => {
      const currentTheme = document.documentElement.getAttribute("data-theme") || "light";
      setTheme(currentTheme);
    };

    updateTheme();
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="home-page relative">
      {theme === "light" && (
        <>
          <div className="texture-container top-right">
            <img src="/line1.png" alt="Decorative Line 1" className="texture-image" />
          </div>
          <div className="texture-container bottom-left">
            <img src="/line2.png" alt="Decorative Line 2" className="texture-image" />
          </div>
        </>
      )}
      <div className="content flex items-center justify-center space-x-4">
        <img src="/logo.webp" alt="Logo" className="w-20 h-20 logo-home" />
        <div>
          <h1>SOCCAL</h1>
          <p>
            <span className="text-black">your </span>
            <span className="text-[#473879] font-bold">SOC</span>
            <span className="text-black">ial</span>
            <span className="text-[#473879] font-bold"> CAL</span>
            <span className="text-black">endar</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;