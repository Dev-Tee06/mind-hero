"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface Props {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export default function LessonCard({ id, title, description, icon }: Props) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      className="glass-panel shadow-glow rounded-3xl p-8 flex flex-col justify-between h-full group"
    >
      <div>
        <div className="text-6xl mb-4 drop-shadow-xl transform group-hover:scale-110 transition-transform duration-300">{icon}</div>

        <h3 className="text-2xl font-heading font-extrabold text-white mb-3 drop-shadow-md tracking-wide">
          {title}
        </h3>

        <p className="text-indigo-50 font-bold leading-relaxed">{description}</p>
      </div>

      <Link
        href={`/lessons/${id}`}
        className="mt-6 bg-gradient-to-r from-magical-purple to-magical-pink text-white text-center py-3 rounded-xl font-heading font-extrabold shadow-glow-pink hover:scale-105 hover:shadow-[0_0_20px_rgba(219,39,119,0.8)] transition-all duration-300 uppercase tracking-wider text-sm"
      >
        Start Lesson
      </Link>
    </motion.div>
  );
}
