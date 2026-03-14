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
      whileHover={{ scale: 1.05 }}
      className="bg-white shadow-xl rounded-2xl p-6 flex flex-col justify-between"
    >
      <div>
        <div className="text-5xl mb-3">{icon}</div>

        <h3 className="text-xl font-bold text-purple-700 mb-2">{title}</h3>

        <p className="text-gray-600">{description}</p>
      </div>

      <Link
        href={`/lessons/${id}`}
        className="mt-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-center py-2 rounded-lg font-semibold hover:scale-105 transition"
      >
        Start Lesson
      </Link>
    </motion.div>
  );
}
