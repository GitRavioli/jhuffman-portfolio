"use client";
import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

export default function IdleScreen() {
    const [isIdle, setIsIdle] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const resetTimer = () => {
        setIsIdle(false);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);

        timeoutRef.current = setTimeout(() => {
            setIsIdle(true);
        }, 30000);
    };

    useEffect(() => {

        window.addEventListener('mousemove', resetTimer);
        window.addEventListener('keydown', resetTimer);
        window.addEventListener('click', resetTimer);

        resetTimer();

        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            window.removeEventListener('mousemove', resetTimer);
            window.removeEventListener('keydown', resetTimer);
            window.removeEventListener('click', resetTimer);
        };
    }, []);

    if (!isIdle) return null;

    return (
        <div className="fixed inset-0 z-[200] bg-black text-alert font-mono flex items-center justify-center cursor-none">
            <motion.div
                initial={{ x: -100, y: -100 }}
                animate={{
                    x: [0, 300, -300, 200, -200, 0],
                    y: [0, 200, 100, -200, -100, 0]
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "linear"
                }}
                className="text-center"
            >
                <h1 className="text-4xl font-bold mb-2">SYSTEM LOCKED</h1>
                <p className="text-sm animate-pulse">PRESS ANY KEY TO RESUME</p>
            </motion.div>

            <div className="absolute inset-0 opacity-10 pointer-events-none text-xs leading-none overflow-hidden">
                {Array.from({ length: 50 }).map((_, i) => (
                    <div key={i} style={{
                        position: 'absolute',
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`
                    }}>
                        {Math.random().toString(36).substring(7)}
                    </div>
                ))}
            </div>
        </div>
    );
}