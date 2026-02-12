"use client";
import React, { useState } from "react";
import {
  Cpu,
  Globe,
  Github,
  ExternalLink,
  Terminal,
  Activity,
  AlertCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Project {
  pid: number;
  user: string;
  cmd: string;
  description: string;
  cpu: number;
  memory: string;
  status: "running" | "sleeping" | "killed" | "zombie";
  flags: string[];
  ports: string[];
}

const projects: Project[] = [
  {
    pid: 2026,
    user: "root",
    cmd: "./projects/nitch.codes",
    description:
      "Personal operating environment and portfolio system. Built to simulate a tiling window manager in the browser.",
    cpu: 45.2,
    memory: "128MB",
    status: "running",
    flags: ["nextjs", "typescript", "tailwind", "zustand"],
    ports: ["https://www.nitch.codes/"],
  },
  {
    pid: 2025,
    user: "root",
    cmd: "./projects/aurora-board",
    description:
      "A Kanban-style task board designed to work alongside Project Aurora, providing a visual way to track tasks and progress tied to planned nodes.",
    cpu: 12.8,
    memory: "64MB",
    status: "sleeping",
    flags: ["kanban", "task-tracking", "project-aurora"],
    ports: ["https://aurora-board.vercel.app/"],
  },
  {
    pid: 2026,
    user: "guest",
    cmd: "./projects/project-aurora",
    description:
      "A project planning tool built for mapping and organizing work node by node. Includes a built-in markdown note system for documenting ideas, tasks, and decisions alongside the plan.",
    cpu: 89.4,
    memory: "512MB",
    status: "sleeping",
    flags: ["threejs", "webgl", "glsl"],
    ports: ["https://project-aurora-beta.vercel.app/"],
  },
  {
    pid: 2025,
    user: "root",
    cmd: "./tools/aurora-music",
    description:
      "A lightweight personal audio player built around local playback.",
    cpu: 3.1,
    memory: "16MB",
    status: "zombie",
    flags: ["python", "tkinter"],
    ports: ["https://github.com/GitRavioli/aurora_music"],
  },
];

const StatusIcon = ({ status }: { status: string }) => {
  switch (status) {
    case "running":
      return <Activity size={14} className="text-[#379634] animate-pulse" />;
    case "sleeping":
      return <div className="w-2 h-2 rounded-full bg-[#AAAAAA]/50" />;
    case "killed":
      return <AlertCircle size={14} className="text-[#FF6B6B]" />;
    default:
      return <div className="w-2 h-2 rounded-full bg-[#AAAAAA]/40" />;
  }
};

export default function Projects() {
  const [selectedCmd, setSelectedCmd] = useState<string | null>(null);
  const toggleProject = (cmd: string) =>
    setSelectedCmd(selectedCmd === cmd ? null : cmd);

  return (
    <div className="w-full max-w-5xl pb-24">
      {/* Header */}
      <div className="mb-8 border-b border-[#EEEEEE]/20 pb-4">
        <h2 className="text-[#379634] text-xl font-bold flex items-center gap-3 mb-2">
          <Terminal className="text-[#379634]" />
          PROCESS_LIST: [Projects]
        </h2>
        <div className="flex gap-6 text-xs font-mono text-[#EEEEEE]/60">
          <span>TASKS: {projects.length} total</span>
          <span>
            RUNNING: {projects.filter((p) => p.status === "running").length}
          </span>
          <span>
            LOAD AVG:{" "}
            {projects.reduce((acc, p) => acc + p.cpu, 0) / projects.length}%
          </span>
        </div>
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-12 gap-2 px-2 py-2 border-b-2 border-[#EEEEEE]/20 text-[10px] tracking-wider text-[#CCCCCC] font-bold uppercase select-none">
        <div className="col-span-1">PID</div>
        <div className="col-span-2 hidden sm:block">USER</div>
        <div className="col-span-1 hidden sm:block">PRI</div>
        <div className="col-span-6 sm:col-span-5">COMMAND</div>
        <div className="col-span-2 text-right">%CPU</div>
        <div className="col-span-2 sm:col-span-1 text-center">STAT</div>
      </div>

      {/* Projects */}
      <div className="font-mono text-sm">
        {projects.map((p) => {
          const isExpanded = selectedCmd === p.cmd;
          return (
            <div key={p.cmd} className="group border-b border-[#EEEEEE]/20">
              <div
                onClick={() => toggleProject(p.cmd)}
                className={`grid grid-cols-12 gap-2 px-2 py-3 cursor-pointer transition-colors items-center ${
                  isExpanded ? "bg-[#222831]/10" : "hover:bg-[#222831]/5"
                }`}
              >
                <div className="col-span-1 text-[#CCCCCC]">{p.pid}</div>
                <div className="col-span-2 hidden sm:block text-[#AAAAAA]">
                  {p.user}
                </div>
                <div className="col-span-1 hidden sm:block text-[#888888]">
                  20
                </div>
                <div
                  className={`col-span-6 sm:col-span-5 font-bold truncate transition-colors ${
                    isExpanded ? "text-[#379634]" : "text-[#EEEEEE]"
                  }`}
                >
                  {p.cmd}
                </div>
                <div className="col-span-2 text-right text-[#CCCCCC]">
                  {p.cpu}%
                </div>
                <div className="col-span-2 sm:col-span-1 flex justify-center">
                  <StatusIcon status={p.status} />
                </div>
              </div>

              {/* Expanded details */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden bg-[#222831]/10"
                  >
                    <div className="p-4 ml-2 sm:ml-12 border-l-2 border-[#379634]/40 flex flex-col gap-4 text-xs sm:text-sm">
                      {/* Description */}
                      <div className="flex gap-2">
                        <span className="text-[#CCCCCC] min-w-[80px]">
                          stdout &gt;&gt;
                        </span>
                        <p className="text-[#379634] leading-relaxed max-w-2xl">
                          {p.description}
                        </p>
                      </div>

                      {/* Flags */}
                      <div className="flex gap-2 items-center">
                        <span className="text-[#CCCCCC] min-w-[80px]">
                          flags &gt;&gt;
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {p.flags.map((flag) => (
                            <span
                              key={flag}
                              className="px-1.5 py-0.5 bg-[#AAAAAA]/10 text-[#379634] rounded text-[10px] font-mono"
                            >
                              {flag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Ports */}
                      <div className="flex gap-2 items-center">
                        <span className="text-[#CCCCCC] min-w-[80px]">
                          ports &gt;&gt;
                        </span>
                        <div className="flex gap-4">
                          {p.ports.map((link, i) => (
                            <a
                              key={i}
                              href={link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1 text-[#CCCCCC] hover:underline transition-all"
                            >
                              {link.includes("github") ? (
                                <Github size={12} />
                              ) : (
                                <Globe size={12} />
                              )}
                              <span>
                                {link.includes("github") ? "SOURCE" : "VIEW"}
                              </span>
                              <ExternalLink size={10} />
                            </a>
                          ))}
                        </div>
                      </div>

                      <div className="pt-2 mt-2 border-t border-[#CCCCCC]/20 text-[10px] text-[#AAAAAA] flex gap-4">
                        <span>MEM_USAGE: {p.memory}</span>
                        <span>THREAD_ID: 0x{p.pid.toString(16)}</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      <div className="mt-8 text-center text-[#AAAAAA] text-xs animate-pulse">
        END OF BUFFER
      </div>
    </div>
  );
}
