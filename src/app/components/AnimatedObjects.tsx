"use client";
import React from "react";
import { Briefcase, FileText, Search, Users } from "lucide-react";
import { motion, type Variants } from "framer-motion";

const floatVariant: Variants = {
    animate: {
        y: [0, -22, 0],
        x: [0, 6, 0],
        transition: { duration: 6, ease: "easeInOut", repeat: Infinity },
    },
};

const slowFloat: Variants = {
    animate: {
        y: [0, -12, 0],
        transition: { duration: 10, ease: "easeInOut", repeat: Infinity },
    },
};

const drift: Variants = {
    animate: {
        x: [0, -18, 0],
        transition: { duration: 8, ease: "easeInOut", repeat: Infinity },
    },
};

const AnimatedObjects: React.FC = () => {
    return (
        <div aria-hidden className="pointer-events-none">
            <motion.div
                className="absolute -left-8 top-12 w-56 h-56 md:w-72 md:h-72 rounded-full bg-indigo-600/20 backdrop-blur-sm shadow-xl z-10"
                variants={floatVariant}
                animate="animate"
            >
                <div className="w-full h-full flex items-center justify-center text-indigo-200 opacity-95">
                    <Briefcase className="w-28 h-28 md:w-36 md:h-36 text-indigo-300 drop-shadow-lg" />
                </div>
            </motion.div>

            <motion.div
                className="absolute right-6 top-28 w-44 h-44 md:w-56 md:h-56 rounded-2xl bg-white/5 border border-white/5 shadow-2xl z-20"
                variants={slowFloat}
                animate="animate"
            >
                <div className="w-full h-full flex items-center justify-center text-white/90">
                    <FileText className="w-20 h-20 md:w-24 md:h-24 text-amber-300" />
                </div>
            </motion.div>

            <motion.div
                className="absolute left-1/2 -translate-x-1/2 bottom-10 w-40 h-40 md:w-56 md:h-56 rounded-full bg-emerald-600/12 shadow-2xl z-10"
                variants={drift}
                animate="animate"
            >
                <div className="w-full h-full flex items-center justify-center text-emerald-200 opacity-95">
                    <Search className="w-20 h-20 md:w-28 md:h-28 text-emerald-300" />
                </div>
            </motion.div>

            <motion.div
                className="absolute -right-12 bottom-32 w-52 h-52 md:w-72 md:h-72 rounded-full bg-violet-700/10 shadow-lg z-0"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            >
                <div className="w-full h-full flex items-center justify-center text-violet-200 opacity-95">
                    <Users className="w-28 h-28 md:w-36 md:h-36 text-violet-300" />
                </div>
            </motion.div>

            <motion.div
                className="absolute left-10 md:left-24 top-6 w-36 h-44 md:w-52 md:h-64 overflow-hidden rounded-2xl shadow-2xl z-30"
                variants={slowFloat}
                animate="animate"
            >
                <img src="/images/ai.jpg" alt="AI Visual" className="w-full h-full object-cover brightness-90" />
            </motion.div>
        </div>
    );
};

export default AnimatedObjects;
