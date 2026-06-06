import React from "react";

const Footer = ({ resolvedTheme, text }) => {
  return (
    <footer
      className={`px-6 py-12 border-t text-center ${resolvedTheme === "dark"
          ? "bg-[#090d18] border-slate-800"
          : "bg-white border-slate-100"
        }`}
    >
      <div className="max-w-7xl mx-auto space-y-4">
        <div className="flex justify-center items-center gap-2">
          <span className="text-lg font-black">{text.brand}</span>
          <span className="h-4 w-px bg-slate-300 dark:bg-slate-700"></span>
          <span className="text-xs text-sky-500 font-bold tracking-wide uppercase">{text.tagline}</span>
        </div>
        <p className="text-xs text-slate-400 max-w-lg mx-auto leading-relaxed">
          {text.footerText} <strong className="text-slate-800 dark:text-slate-200 bg-sky-100 dark:bg-slate-800 px-2 py-1 rounded">SHWebCreatives</strong>. {text.rightsReserved}
        </p>
        <div className="text-[10px] text-slate-400/70">
          © 2026 Villgo Logistics Inc. Built with care for Harish's portfolio.
        </div>
      </div>
    </footer>

  );
};

export default Footer;
