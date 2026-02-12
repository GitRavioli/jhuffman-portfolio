"use client";
import React, { useEffect, useState, useRef } from 'react';
import { Search } from 'lucide-react';
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useSystemStore } from '@/app/store/useSystemStore';

function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)); }

export default function CommandPalette() {
    const { isCmdPaletteOpen, setCmdPalette, files, openFile } = useSystemStore();
    const [query, setQuery] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);

    const filteredFiles = files.filter(f => f.name.toLowerCase().includes(query.toLowerCase()));

    useEffect(() => {
        if (isCmdPaletteOpen) {
            setTimeout(() => inputRef.current?.focus(), 50);
        } else {
            setQuery('');
            setSelectedIndex(0);
        }
    }, [isCmdPaletteOpen]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isCmdPaletteOpen) return;

            if (e.key === 'ArrowDown') {
                e.preventDefault();
                setSelectedIndex(prev => (prev + 1) % filteredFiles.length);
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                setSelectedIndex(prev => (prev - 1 + filteredFiles.length) % filteredFiles.length);
            } else if (e.key === 'Enter') {
                e.preventDefault();
                if (filteredFiles[selectedIndex]) {
                    openFile(filteredFiles[selectedIndex].id);
                }
            } else if (e.key === 'Escape') {
                setCmdPalette(false);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isCmdPaletteOpen, filteredFiles, selectedIndex, openFile, setCmdPalette]);

    if (!isCmdPaletteOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-[2px]" onClick={() => setCmdPalette(false)}>
            <div
                className="w-[500px] bg-void border border-alert shadow-2xl shadow-black flex flex-col"
                onClick={e => e.stopPropagation()}
            >
                <div className="flex items-center gap-3 p-3 border-b border-border">
                    <Search size={16} className="text-alert" />
                    <input
                        ref={inputRef}
                        className="flex-1 bg-transparent border-none outline-none text-sm text-signal font-mono placeholder-muted"
                        placeholder="Search files..."
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                    />
                </div>

                <div className="max-h-[300px] overflow-y-auto p-2">
                    {filteredFiles.map((file, index) => (
                        <div
                            key={file.id}
                            className={cn(
                                "p-2 text-xs flex justify-between cursor-pointer transition-colors font-mono",
                                index === selectedIndex ? "bg-alert text-black font-bold" : "text-concrete hover:bg-white/5"
                            )}
                            onClick={() => openFile(file.id)}
                            onMouseEnter={() => setSelectedIndex(index)}
                        >
                            <span>{file.name}</span>
                            <span className={cn("opacity-50", index === selectedIndex ? "text-black" : "")}>{file.path}</span>
                        </div>
                    ))}
                    {filteredFiles.length === 0 && (
                        <div className="p-4 text-center text-muted text-xs font-mono">No results found.</div>
                    )}
                </div>
            </div>
        </div>
    );
}