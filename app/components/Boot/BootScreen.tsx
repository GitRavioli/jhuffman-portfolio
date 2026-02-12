"use client";
import React, { useState, useEffect, useRef } from 'react';

const bootSequence = [
    { msg: "BIOS DATE 01/15/26 15:24:12 VER 1.0.2", delay: 100 },
    { msg: "CPU: AMD RYZEN 9 5950X 16-CORE PROCESSOR", delay: 150 },
    { msg: "DETECTING NVRAM...", delay: 200 },
    { msg: "LOADING KERNEL IMAGE...", delay: 400 },
    { msg: "MOUNTING ROOT FILE SYSTEM...", delay: 600 },
    { msg: "[ OK ] REACHED TARGET GRAPHICAL INTERFACE.", delay: 800 },
    { msg: "[ OK ] STARTED USER MANAGER FOR UID 1000.", delay: 850 },
    { msg: "INITIALIZING VIRTUAL ENVIRONMENT...", delay: 1100 },
    { msg: "ESTABLISHING SECURE CONNECTION...", delay: 1400 },
    { msg: "ACCESS GRANTED.", delay: 1800 },
    { msg: "WELCOME, OPERATOR.", delay: 2200 },
];

export default function BootScreen({ onComplete }: { onComplete: () => void }) {
    const [lines, setLines] = useState<string[]>([]);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let timeoutIds: NodeJS.Timeout[] = [];

        // Schedule each line
        bootSequence.forEach((step, index) => {
            const id = setTimeout(() => {
                setLines(prev => [...prev, step.msg]);

                // Auto-scroll
                if (scrollRef.current) {
                    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
                }

                // Finish
                if (index === bootSequence.length - 1) {
                    setTimeout(onComplete, 1000); // Wait 1s after last line
                }
            }, step.delay);
            timeoutIds.push(id);
        });

        return () => timeoutIds.forEach(clearTimeout);
    }, [onComplete]);

    return (
        <div className="fixed inset-0 z-[100] bg-void text-concrete font-mono text-sm p-8 flex flex-col justify-end">
            <div ref={scrollRef} className="overflow-hidden pb-4">
                {lines.map((line, i) => (
                    <div key={i} className="mb-1">
                        {/* 1. Timestamp */}
                        <span className="text-muted mr-3">
                            [{new Date().toLocaleTimeString('en-US', { hour12: false })}]
                        </span>

                        <span className={i === lines.length - 1 ? "text-signal font-bold" : "text-concrete"}>
                            {line}
                        </span>
                    </div>
                ))}
            </div>
            <div className="h-4 w-2 bg-alert animate-blink" />
        </div>
    );
}