"use client";
import React, { useState } from "react";
import { ChevronRight, ChevronDown, Braces } from "lucide-react";

type SkillLevel = "beginner" | "intermediate" | "advanced" | "expert";

interface SkillSet {
  [key: string]: SkillLevel;
}

interface Toolchain {
  [category: string]: SkillSet;
}

const toolchain: Toolchain = {
  frontend: {
    javascript: "intermediate",
    vue: "intermediate",
    quasar: "intermediate",
    html: "advanced",
    css: "advanced",
    sass: "intermediate",
  },
  state: {
    pinia: "advanced",
    vuex: "intermediate",
  },
  backend: {
    node: "intermediate",
    express: "intermediate",
    rest_apis: "intermediate",
    api_integration: "intermediate",
  },
  applications: {
    kotlin: "intermediate",
    android: "intermediate",
    python: "intermediate",
    tkinter: "intermediate",
    lua: "beginner",
    love2d: "beginner",
  },
  storage: {
    indexeddb: "intermediate",
    dexie: "intermediate",
    localstorage: "advanced",
  },
  platforms: {
    chrome_extensions: "intermediate",
    pwa: "intermediate",
  },
  tooling: {
    git: "intermediate",
    docker: "intermediate",
  },
};

// 2. Helper to color-code the skill values
const getLevelColor = (level: SkillLevel) => {
  switch (level) {
    case "beginner":
      return "text-concrete";
    case "intermediate":
      return "text-blue-400";
    case "advanced":
      return "text-alert";
    case "expert":
      return "text-purple-400 font-bold";
    default:
      return "text-concrete";
  }
};

export default function Skills() {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>(
    Object.keys(toolchain).reduce((acc, key) => ({ ...acc, [key]: true }), {}),
  );

  const toggleSection = (key: string) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="max-w-4xl w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 border-b border-border pb-4">
        <h2 className="text-signal text-xl font-bold flex items-center gap-2">
          <Braces className="text-[#379634]" size={24} />
          TOOLCHAIN.JSON
        </h2>
        <span className="text-xs text-concrete font-mono">
          {Object.keys(toolchain).length} MODULES LOADED
        </span>
      </div>

      {/* JSON Viewer */}
      <div className="font-mono text-sm bg-black/20 p-6 rounded border border-border/50 relative overflow-hidden group">
        {/* Background Line Numbers Effect */}
        <div className="absolute top-0 left-0 bottom-0 w-8 border-r border-border/20 bg-void/50 text-right pr-2 pt-6 text-[10px] text-muted select-none font-mono leading-6 opacity-50">
          {Array.from({ length: 40 }).map((_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>

        <div className="pl-6 relative z-10">
          <span className="text-yellow-500">{"{"}</span>

          <div className="pl-4 space-y-1 mt-1">
            {Object.entries(toolchain).map(([category, skills], index, arr) => {
              const isOpen = openSections[category];
              const isLast = index === arr.length - 1;

              return (
                <div key={category} className="group/line">
                  {/* Key / Toggle Line */}
                  <div
                    className="flex items-center gap-2 cursor-pointer hover:bg-white/5 -ml-4 pl-4 rounded select-none"
                    onClick={() => toggleSection(category)}
                  >
                    <button className="text-muted hover:text-signal transition-colors">
                      {isOpen ? (
                        <ChevronDown size={14} />
                      ) : (
                        <ChevronRight size={14} />
                      )}
                    </button>

                    <span className="text-purple-400">"{category}"</span>
                    <span className="text-concrete">: </span>
                    <span className="text-yellow-500">
                      {isOpen ? "{" : "{ ... },"}
                    </span>
                  </div>

                  {/* Expanded Content */}
                  {isOpen && (
                    <div className="pl-6 border-l border-border/30 ml-2.5 my-1">
                      {Object.entries(skills).map(
                        ([tool, level], i, toolArr) => (
                          <div
                            key={tool}
                            className="flex items-center gap-2 hover:bg-white/5 px-1 rounded cursor-default"
                          >
                            <span className="text-green-400">"{tool}"</span>
                            <span className="text-concrete">: </span>
                            <span
                              className={`transition-colors ${getLevelColor(level as SkillLevel)}`}
                            >
                              "{level}"
                            </span>
                            {i < toolArr.length - 1 && (
                              <span className="text-concrete">,</span>
                            )}
                          </div>
                        ),
                      )}
                    </div>
                  )}

                  {/* Closing Brace for Category */}
                  {isOpen && (
                    <div className="pl-1">
                      <span className="text-yellow-500">{"}"}</span>
                      {!isLast && <span className="text-concrete">,</span>}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <span className="text-yellow-500">{"}"}</span>
        </div>
      </div>

      {/* Legend Footer */}
      <div className="mt-4 flex gap-4 text-xs font-mono justify-end text-concrete">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-concrete opacity-50"></div>
          <span>beginner</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-blue-400"></div>
          <span>intermediate</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-alert"></div>
          <span>advanced</span>
        </div>
      </div>
    </div>
  );
}
