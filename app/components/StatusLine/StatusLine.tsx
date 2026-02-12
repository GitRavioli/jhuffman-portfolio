"use client";
import React, { useState, useEffect, useRef } from 'react';
import { useSystemStore } from '@/app/store/useSystemStore';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Terminal } from 'lucide-react';

type LogEntry = {
    type: 'info' | 'success' | 'error' | 'system';
    text: string;
};

export default function StatusLine() {
    const { setCmdPalette } = useSystemStore();

    const [input, setInput] = useState('');
    const [mode, setMode] = useState('NORMAL');
    const [time, setTime] = useState('');
    const [output, setOutput] = useState<LogEntry[]>([]);
    const [isOutputOpen, setIsOutputOpen] = useState(false);

    const inputRef = useRef<HTMLInputElement>(null);
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const formatter = new Intl.DateTimeFormat('en-US', {
            hour: '2-digit',
            minute: "2-digit",
            second: "2-digit",
            hour12: true,
            timeZoneName: 'short'
        })
        const timer = setInterval(() => {
            setTime(formatter.format(new Date()));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (bottomRef.current) {
            bottomRef.current.scrollTop = bottomRef.current.scrollHeight;
        }
    }, [output]);

    const log = (text: string, type: LogEntry['type'] = 'info') => {
        setOutput(prev => [...prev, { type, text }]);
        setIsOutputOpen(true);
    };

    const executeCommand = (cmd: string) => {
        const lowerCmd = cmd.toLowerCase().trim();

        log(`root@system:~$ ${cmd}`, 'system');

        switch (lowerCmd) {
            case 'help':
                log('AVAILABLE COMMANDS:', 'info');
                log('  ls       :: Open file explorer', 'info');
                log('  clear    :: Clear terminal output', 'info');
                log('  weather  :: Check local atmospheric sensors', 'info');
                log('  whoami   :: Current user identity', 'info');
                log('  date     :: System timestamp', 'info');
                log('  matrix   :: Toggle high-contrast mode', 'info');
                log('  exit     :: Close terminal drawer', 'info');
                break;

            case 'ls':
                log('Executing file_picker.exe...', 'success');
                setTimeout(() => setCmdPalette(true), 500);
                break;

            case 'clear':
                setOutput([]);
                setIsOutputOpen(false);
                break;

            case 'weather':
                log('Connecting to NOAA satellite uplink...', 'info');
                setTimeout(() => {
                    log('LOC: ERR // MARS WEATHER UNAVAILABLE', 'success');
                }, 800);
                break;

            case 'whoami':
                log('uid=0(root) gid=0(root) groups=0(root)', 'success');
                break;

            case 'date':
                log(new Date().toLocaleString('en-US', {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    timeZoneName: 'short',
                    year: 'numeric'
                }), 'success');
                break;

            case 'matrix':
                document.documentElement.style.setProperty('--color-signal', '#00ff41');
                document.documentElement.style.setProperty('--color-alert', '#008F11');
                document.documentElement.style.setProperty('--color-void', '#0D0208');
                log('Color scheme updated: MATRIX_MODE', 'success');
                break;

            case 'exit':
                setIsOutputOpen(false);
                break;

            default:
                log(`Command not found: ${cmd}. Type 'help' for available commands.`, 'error');
                break;
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input) return;
        executeCommand(input);
        setInput('');
        setMode('NORMAL');
    };

    return (
        <div className="relative z-40 w-full">
            <AnimatePresence>
                {isOutputOpen && (
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 20, opacity: 0 }}
                        className="absolute bottom-9 left-0 right-0 bg-void/95 border-t border-alert/30 backdrop-blur-md shadow-[0_-5px_20px_rgba(0,0,0,0.5)] max-h-[300px] flex flex-col"
                    >
                        <div className="flex items-center justify-between px-4 py-1 border-b border-border bg-black/40">
                            <div className="flex items-center gap-2 text-xs text-alert font-bold">
                                <Terminal size={12} />
                                <span>TERMINAL_OUTPUT</span>
                            </div>
                            <button
                                onClick={() => setIsOutputOpen(false)}
                                className="text-muted hover:text-alert transition-colors"
                            >
                                <X size={14} />
                            </button>
                        </div>

                        <div ref={bottomRef} className="p-4 font-mono text-xs overflow-y-auto max-h-[260px] space-y-1">
                            {output.map((entry, i) => (
                                <div key={i} className={`
                                    ${entry.type === 'error' ? 'text-red-500' : ''}
                                    ${entry.type === 'success' ? 'text-green-500' : ''}
                                    ${entry.type === 'system' ? 'text-muted border-t border-border/20 pt-1 mt-1' : ''}
                                    ${entry.type === 'info' ? 'text-concrete' : ''}
                                `}>
                                    {entry.text}
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="h-9 border-t border-border bg-void flex items-center px-2 gap-4 text-xs font-mono w-full select-none relative bg-void z-50">
                <div className={`px-2 py-0.5 font-bold ${mode === 'INSERT' ? 'bg-alert text-black' : 'bg-concrete text-void'}`}>
                    {mode}
                </div>

                <form onSubmit={handleSubmit} className="flex-1 flex items-center gap-2">
                    <span className="text-alert">{'>'}</span>
                    <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onFocus={() => setMode('INSERT')}
                        onBlur={() => setMode('NORMAL')}
                        className="bg-transparent border-none outline-none text-signal w-full font-mono placeholder-muted"
                        placeholder="type 'help'..."
                        autoComplete="off"
                    />
                </form>

                <div className="flex gap-4 text-muted hidden md:flex">
                    <span>CPU: 12%</span>
                    <span>RAM: 40MB</span>
                    <span className="text-concrete">{time}</span>
                </div>
            </div>
        </div>
    );
}