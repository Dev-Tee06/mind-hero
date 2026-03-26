"use client";

import { useParams, useRouter } from "next/navigation";
import { lessons } from "../../../data/lessons";
import { motion } from "framer-motion";

export default function LessonPage() {
  const params = useParams();
  const router = useRouter();
  const lesson = lessons.find((l) => l.id === String(params.id));

  if (!lesson) {
    return (
      <main className="min-h-screen bg-mesh-premium flex items-center justify-center pt-24">
        <div className="glass-panel p-12 rounded-3xl text-center shadow-glow max-w-md mx-4">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-2xl font-heading font-extrabold text-white mb-4">Lesson Not Found</h2>
          <button
            onClick={() => router.push("/lessons")}
            className="bg-gradient-to-r from-magical-purple to-magical-pink text-white px-8 py-3 rounded-full font-heading font-extrabold shadow-glow-pink hover:scale-105 transition-all"
          >
            Back to Lessons
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-mesh-premium pt-28 pb-16 px-6">
      {/* Glowing orbs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
        <div className="absolute top-[20%] left-[5%] w-80 h-80 bg-magical-purple/25 rounded-full blur-[120px]" />
        <div className="absolute bottom-[15%] right-[5%] w-72 h-72 bg-magical-pink/20 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => router.push("/lessons")}
          className="mb-8 flex items-center gap-2 text-indigo-200 hover:text-white font-heading font-bold transition-colors group"
        >
          <span className="group-hover:-translate-x-1 transition-transform">←</span> All Lessons
        </motion.button>

        {/* Lesson Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel shadow-glow rounded-[2rem] p-8 md:p-12 mb-8 text-center relative overflow-hidden"
        >
          <div className="absolute -top-16 -right-16 w-56 h-56 bg-magical-cyan/20 rounded-full blur-3xl pointer-events-none" />
          <div className="text-7xl md:text-8xl mb-5 leading-none drop-shadow-2xl">
            {lesson.icon}
          </div>
          <div className="flex flex-wrap gap-2 justify-center mb-4">
            <span className="text-xs font-heading font-bold text-magical-yellow glass px-3 py-1 rounded-full uppercase tracking-wider">{lesson.category}</span>
            <span className="text-xs font-semibold text-indigo-200 glass px-3 py-1 rounded-full">⏱ {lesson.estimatedTime}</span>
            <span className="text-xs font-semibold text-indigo-200 glass px-3 py-1 rounded-full">⚡ {lesson.xp} XP</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-heading font-extrabold text-white mb-4 drop-shadow-md leading-tight">
            {lesson.title}
          </h1>
          <p className="text-indigo-50 text-lg md:text-xl font-bold leading-relaxed max-w-2xl mx-auto">
            {lesson.description}
          </p>
        </motion.div>

        {/* Lesson Content */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-panel rounded-[2rem] p-8 md:p-10 mb-6 border border-white/20 shadow-glow"
        >
          <h2 className="text-2xl font-heading font-extrabold text-white mb-5 drop-shadow-md">
            📖 Lesson Content
          </h2>
          <p className="text-indigo-50 text-lg leading-loose font-bold whitespace-pre-line">
            {lesson.content}
          </p>
        </motion.section>

        {/* Practice Section */}
        {lesson.practice && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-panel rounded-[2rem] p-8 md:p-10 mb-6 border border-magical-purple/40 shadow-glow"
          >
            <h2 className="text-2xl font-heading font-extrabold text-white mb-5 drop-shadow-md">
              📝 Practice
            </h2>
            <ul className="space-y-3">
              {lesson.practice.map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-indigo-50 font-bold text-lg leading-relaxed">
                  <span className="mt-1 w-6 h-6 shrink-0 rounded-full bg-magical-purple flex items-center justify-center text-white text-xs font-extrabold">{index + 1}</span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.section>
        )}

        {/* Reflection Section */}
        {lesson.reflection && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-panel rounded-[2rem] p-8 md:p-10 mb-6 border border-magical-pink/40 shadow-glow-pink"
          >
            <h2 className="text-2xl font-heading font-extrabold text-white mb-5 drop-shadow-md">
              💡 Reflection Questions
            </h2>
            <ul className="space-y-3">
              {lesson.reflection.map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-indigo-50 font-bold text-lg leading-relaxed">
                  <span className="mt-1 w-6 h-6 shrink-0 rounded-full bg-magical-pink flex items-center justify-center text-white text-xs font-extrabold">{index + 1}</span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.section>
        )}

        {/* Affirmation */}
        {lesson.confession && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="glass-panel rounded-[2rem] p-8 text-center border border-magical-yellow/30 shadow-[0_0_30px_rgba(245,158,11,0.2)] relative overflow-hidden mb-10"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-magical-yellow/5 to-magical-pink/5 z-0" />
            <div className="relative z-10">
              <div className="text-4xl mb-3">🌟</div>
              <p className="text-xl md:text-2xl font-heading font-extrabold text-white italic drop-shadow-md leading-relaxed">
                &ldquo;{lesson.confession}&rdquo;
              </p>
            </div>
          </motion.div>
        )}

        {/* Footer Nav */}
        <div className="flex justify-center">
          <button
            onClick={() => router.push("/lessons")}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-magical-purple to-magical-pink text-white px-10 py-4 rounded-full font-heading font-extrabold text-lg shadow-glow-pink hover:scale-105 transition-all duration-300"
          >
            ← Back to All Lessons
          </button>
        </div>
      </div>
    </main>
  );
}
