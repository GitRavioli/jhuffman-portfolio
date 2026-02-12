"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Viewport from "../Viewport/Viewport";
import StatusLine from "../StatusLine/StatusLine";
import CommandPalette from "../CommandPalette/CommandPalette";
import BootScreen from "../Boot/BootScreen";
import IdleScreen from "../IdleScreen/IdleScreen";
import { useSystemStore } from "@/app/store/useSystemStore";

export default function Shell() {
  const { toggleCmdPalette, openFile } = useSystemStore();

  const [booted, setBooted] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem("booted") === "true";
  });

  useEffect(() => {
    if (booted) {
      openFile("1");
    }
  }, [booted, openFile]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        toggleCmdPalette();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleCmdPalette]);

  const handleBootComplete = () => {
    localStorage.setItem("booted", "true");
    setBooted(true);
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-void text-signal overflow-hidden">
      {!booted && <BootScreen onComplete={handleBootComplete} />}

      {booted && <IdleScreen />}

      <div
        className={`flex flex-1 overflow-hidden transition-opacity duration-1000 ${
          booted ? "opacity-100" : "opacity-0"
        }`}
      >
        <Sidebar />
        <Viewport />
      </div>

      <StatusLine />
      <CommandPalette />

      <div className="pointer-events-none fixed inset-0 z-[999] opacity-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
    </div>
  );
}
