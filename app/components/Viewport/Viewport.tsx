"use client";
import { useSystemStore } from "@/app/store/useSystemStore";
import { motion } from "framer-motion";

import Overview from "./Content/Overview";
import Projects from "./Content/Projects";
import Skills from "./Content/Skills";
import Contact from "./Content/Contact";

export default function Viewport() {
  const { activeFile, currentPath } = useSystemStore();

  const renderContent = () => {
    switch (activeFile?.id) {
      case "1":
        return <Overview />;
      case "2":
        return <Projects />;
      case "3":
        return <Skills />;
      case "4":
        return <Contact />;
      default:
        return (
          <div className="text-[#EEEEEE]/60 p-8 text-sm">
            No file loaded. Select a module from the directory.
          </div>
        );
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-void min-w-0 h-full relative">
      <div className="h-10 border-b border-border flex items-center px-4 gap-2 bg-void/90 backdrop-blur-sm sticky top-0 z-10 shrink-0">
        <span className="text-[#EEEEEE]/60 text-xs uppercase tracking-wider font-bold">
          Viewport
        </span>
        <span className="text-[#EEEEEE] text-xs font-mono">{currentPath}</span>
      </div>

      <div className="flex-1 overflow-y-auto p-8 font-mono scroll-smooth">
        <motion.div
          key={activeFile?.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {renderContent()}
        </motion.div>

        <div className="h-24 w-full" aria-hidden="true" />
      </div>
    </div>
  );
}
