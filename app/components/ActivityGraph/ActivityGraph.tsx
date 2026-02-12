"use client";
import React from 'react';

// Generate fake data for the last 365 days
const generateData = () => {
    const data = [];
    for (let i = 0; i < 52 * 7; i++) {
        // 70% chance of 0 activity, otherwise random 1-4
        const level = Math.random() > 0.7 ? Math.floor(Math.random() * 4) + 1 : 0;
        data.push(level);
    }
    return data;
};

export default function ActivityGraph() {
    const data = generateData();

    const getColor = (level: number) => {
        switch (level) {
            case 0: return 'bg-border/30'; // Very faint grey
            case 1: return 'bg-alert/20';
            case 2: return 'bg-alert/40';
            case 3: return 'bg-alert/70';
            case 4: return 'bg-alert';
            default: return 'bg-border/30';
        }
    };

    return (
        <div className="mt-8 border border-border p-4 bg-void/50">
            <h3 className="text-concrete text-xs uppercase mb-3 flex justify-between">
                <span>System Activity Log (Year to Date)</span>
                <span>Total Contributions: {data.reduce((a, b) => a + (b > 0 ? 1 : 0), 0) * 12}</span>
            </h3>

            <div className="flex gap-1 flex-wrap w-full h-24 overflow-hidden">
                {data.map((level, i) => (
                    <div
                        key={i}
                        className={`w-2 h-2 ${getColor(level)} hover:border hover:border-signal transition-all`}
                        title={`Day ${i}: Level ${level}`}
                    />
                ))}
            </div>

            <div className="flex gap-2 items-center justify-end mt-2 text-[10px] text-muted">
                <span>Less</span>
                <div className="w-2 h-2 bg-border/30" />
                <div className="w-2 h-2 bg-alert/20" />
                <div className="w-2 h-2 bg-alert/40" />
                <div className="w-2 h-2 bg-alert/70" />
                <div className="w-2 h-2 bg-alert" />
                <span>More</span>
            </div>
        </div>
    );
}