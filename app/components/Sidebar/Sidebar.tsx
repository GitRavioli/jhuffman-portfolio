"use client";

import { useState } from "react";
import {
  Folder,
  FileText,
  Terminal,
  Cpu,
  Network,
  ChevronRight,
  ChevronDown,
  User,
  Layers,
  Code,
  type LucideIcon,
  X,
} from "lucide-react";
import { useSystemStore } from "@/app/store/useSystemStore";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { AnimatePresence, motion } from "framer-motion";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface FileConfig {
  id: string;
  label: string;
  icon: LucideIcon;
  desc: string;
}

interface FileGroup {
  key: string;
  groupName: string;
  icon: LucideIcon;
  files: FileConfig[];
}

export default function Sidebar() {
  const { activeFile, openFile, closeFile, isSidebarOpen, setSidebar } = useSystemStore();

  const [openFolders, setOpenFolders] = useState<Record<string, boolean>>({
    system: true,
    user_space: true,
    network: true,
  });

  const toggleFolder = (key: string) => {
    setOpenFolders((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleFileClick = (id: string) => {
    if (activeFile?.id === id) {
      closeFile();
    } else {
      openFile(id);
    }
  };

  const fileGroups: FileGroup[] = [
    {
      key: "system",
      groupName: "system",
      icon: Layers,
      files: [
        { id: "1", label: "README.md", icon: FileText, desc: "About" },
        { id: "3", label: "config.json", icon: Terminal, desc: "Stack" },
      ],
    },
    {
      key: "user_space",
      groupName: "user_space",
      icon: User,
      files: [{ id: "2", label: "projects.exe", icon: Cpu, desc: "Work" }],
    },
    {
      key: "network",
      groupName: "network",
      icon: Network,
      files: [{ id: "4", label: "connect.sh", icon: Code, desc: "Contact" }],
    },
  ];

  return (
    <>
      {isSidebarOpen && (
        <div
          onClick={() => setSidebar(false)}
          className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
        />
      )}

      <div
        className={cn(
          "w-72 border-r border-border bg-void flex flex-col h-full select-none font-mono text-sm",
          "fixed inset-y-0 left-0 z-50 transition-transform duration-300 ease-in-out md:relative md:translate-x-0",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="h-10 flex items-center justify-between px-3 border-b border-border bg-void/50 backdrop-blur-md">
          <div className="flex items-center gap-3 text-concrete text-xs">
            <div className="w-2 h-2 rounded-full bg-[#379634] animate-pulse" />
            <span className="font-bold tracking-wider">GUEST@PORTFOLIO:~</span>
          </div>
          <button onClick={() => setSidebar(false)} className="md:hidden text-concrete">
            <X size={16} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-2">
          <div className="px-4 py-1 text-muted text-xs flex items-center gap-2">
            <Folder size={14} className="text-[#379634]" />
            <span>/home/guest</span>
          </div>

          <div className="pl-4 mt-1">
            <div className="border-l border-border pl-2 flex flex-col gap-0.5">
              {fileGroups.map((group) => {
                const isOpen = openFolders[group.key];

                return (
                  <div key={group.key}>
                    <button
                      onClick={() => toggleFolder(group.key)}
                      className="flex items-center gap-2 text-concrete hover:text-signal w-full text-left py-1 px-1 rounded hover:bg-white/5 transition-colors"
                    >
                      {isOpen ? (
                        <ChevronDown size={12} />
                      ) : (
                        <ChevronRight size={12} />
                      )}
                      <group.icon size={12} className="text-muted" />
                      <span className="text-xs font-bold">{group.groupName}</span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden ml-2 pl-2 border-l border-border"
                        >
                          {group.files.map((file) => {
                            const isActive = activeFile?.id === file.id;
                            const Icon = file.icon;

                            return (
                              <button
                                key={file.id}
                                onClick={() => handleFileClick(file.id)}
                                className={cn(
                                  "group w-full text-left py-1 px-2 flex items-center justify-between text-xs transition-colors rounded-sm my-0.5",
                                  isActive
                                    ? "bg-[#379634]/10 text-[#379634]"
                                    : "text-concrete hover:bg-white/5 hover:text-[#379634]"
                                )}
                              >
                                <div className="flex items-center gap-2">
                                  <Icon
                                    size={13}
                                    className={cn(
                                      isActive
                                        ? "text-[#379634]"
                                        : "text-muted group-hover:text-[#379634]"
                                    )}
                                  />
                                  <span>{file.label}</span>
                                </div>

                                <span
                                  className={cn(
                                    "text-[10px] opacity-0 transition-opacity",
                                    isActive && "opacity-100 text-[#379634]",
                                    !isActive && "group-hover:opacity-50"
                                  )}
                                >
                                  {file.desc}
                                </span>
                              </button>
                            );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}