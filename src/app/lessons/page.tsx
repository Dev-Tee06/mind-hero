"use client";

import { useState } from "react";
import Link from "next/link";
import { lessons } from "../../data/lessons";
import { motion } from "framer-motion";

export default function LessonsPage() {
  const [search, setSearch] = useState("");

  const filteredLessons = lessons.filter((lesson) =>
    lesson.title.toLowerCase().includes(search.toLowerCase()),
  );

  const featuredLesson = lessons[0];

  return (
    <main className="min-h-screen bg-mesh-premium pt-28 pb-16 px-6">
      {/* Glowing orb decorations */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
        <div className="absolute top-[20%] left-[5%] w-80 h-80 bg-magical-purple/25 rounded-full blur-[120px]" />
        <div className="absolute top-[55%] right-[5%] w-96 h-96 bg-magical-pink/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[15%] left-[40%] w-72 h-72 bg-magical-cyan/20 rounded-full blur-[100px]" />
      </div>

      {/* PAGE HEADER */}
      <header className="relative z-10 text-center mb-14 max-w-3xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-6xl font-heading font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-cyan-300 mb-5 drop-shadow-lg"
        >
          📚 MindHeroes Lessons
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-indigo-50 font-bold leading-relaxed drop-shadow"
        >
          Discover powerful lessons that help children grow their minds, build
          confidence, develop kindness, and become true MindHeroes.
        </motion.p>

        {/* SEARCH */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-10 relative max-w-md mx-auto"
        >
          <input
            type="text"
            placeholder="✨ Search magical lessons..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-6 py-4 rounded-full bg-white/10 backdrop-blur-md border border-white/30 text-white placeholder-indigo-200 shadow-glass outline-none focus:border-magical-pink focus:bg-white/20 transition-all font-semibold text-lg"
          />
        </motion.div>
      </header>

      {/* FEATURED LESSON */}
      <section className="relative z-10 max-w-5xl mx-auto mb-16">
        <motion.div
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.3 }}
          className="glass-panel rounded-[2rem] p-8 md:p-10 flex flex-col md:flex-row gap-8 items-center shadow-glow border border-white/20 relative overflow-hidden"
        >
          <div className="absolute -top-16 -left-16 w-56 h-56 bg-magical-purple/30 rounded-full blur-3xl pointer-events-none" />
          <div className="text-7xl md:text-8xl leading-none drop-shadow-2xl animate-float shrink-0">
            {featuredLesson.icon}
          </div>
          <div className="relative z-10">
            <p className="text-magical-yellow font-heading font-extrabold uppercase tracking-widest text-sm mb-2">
              ⭐ Featured Lesson
            </p>
            <h2 className="text-2xl md:text-3xl font-heading font-extrabold text-white mb-3 drop-shadow-md leading-tight">
              {featuredLesson.title}
            </h2>
            <p className="text-indigo-50 text-lg leading-relaxed font-bold mb-4">
              {featuredLesson.description}
            </p>
            <div className="flex gap-3 flex-wrap text-sm text-indigo-200 font-semibold mb-5">
              <span className="glass px-3 py-1 rounded-full">{featuredLesson.category}</span>
              <span className="glass px-3 py-1 rounded-full">⏱ {featuredLesson.estimatedTime}</span>
              <span className="glass px-3 py-1 rounded-full">⚡ {featuredLesson.xp} XP</span>
            </div>
            <Link
              href={`/lessons/${featuredLesson.id}`}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-magical-purple to-magical-pink text-white px-8 py-3 rounded-full font-heading font-extrabold shadow-glow-pink hover:scale-105 transition-all duration-300 uppercase tracking-wide text-sm"
            >
              Start Lesson →
            </Link>
          </div>
        </motion.div>
      </section>

      {/* LESSONS GRID */}
      <section className="relative z-10 max-w-6xl mx-auto pb-16">
        <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-center text-white mb-10 drop-shadow-md">
          Explore All Lessons
        </h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {filteredLessons.map((lesson, idx) => (
            <motion.div
              key={lesson.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.07 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="glass-panel rounded-3xl p-8 flex flex-col justify-between hover:shadow-glow transition-all duration-300 border border-white/20 group"
            >
              <div className="flex-1">
                <div className="text-5xl mb-4 drop-shadow-xl leading-none transform group-hover:scale-110 transition-transform duration-300">
                  {lesson.icon}
                </div>
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="text-xs font-heading font-bold text-magical-yellow/90 glass px-2 py-0.5 rounded-full uppercase tracking-wider">
                    {lesson.category}
                  </span>
                  <span className="text-xs font-semibold text-indigo-200 glass px-2 py-0.5 rounded-full">
                    ⏱ {lesson.estimatedTime}
                  </span>
                </div>
                <h3 className="text-xl font-heading font-extrabold text-white mb-2 drop-shadow-md leading-tight">
                  {lesson.title}
                </h3>
                <p className="text-indigo-50 font-bold leading-relaxed text-sm">
                  {lesson.description}
                </p>
              </div>

              <Link
                href={`/lessons/${lesson.id}`}
                className="mt-6 block bg-gradient-to-r from-magical-purple to-magical-pink text-white text-center py-3 rounded-xl font-heading font-extrabold shadow-glow-pink hover:scale-105 transition-all duration-300 uppercase tracking-wider text-sm"
              >
                Start Lesson
              </Link>
            </motion.div>
          ))}

          {filteredLessons.length === 0 && (
            <div className="col-span-3 text-center py-16">
              <p className="text-2xl text-indigo-200 font-bold">No lessons match your search ✨</p>
            </div>
          )}
        </div>
      </section>

      {/* BENEFITS */}
      <section className="relative z-10 w-full max-w-7xl mx-auto py-10">
        <div className="glass-panel p-8 md:p-12 rounded-[3rem] border border-white/20 shadow-glow-pink">
          <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-center text-white mb-10 drop-shadow-md">
            What You Will Learn 🧠
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { i: "💡", t: "Smart Thinking" },
              { i: "🌍", t: "Healthy World" },
              { i: "🎵", t: "Positive Music" },
              { i: "👫", t: "Good Friends" },
              { i: "🔁", t: "Strong Habits" },
              { i: "🛡️", t: "Protect Mind" },
              { i: "❤️", t: "Kindness" },
              { i: "🌟", t: "Confidence" },
            ].map((b, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.04 }}
                className="glass hover:bg-white/20 py-5 px-2 rounded-2xl transition-all duration-300 border border-white/10 flex flex-col items-center justify-center gap-2 shadow-md"
              >
                <span className="text-3xl leading-none drop-shadow-lg">{b.i}</span>
                <p className="font-heading font-extrabold text-white text-xs md:text-sm text-center tracking-wide leading-snug">
                  {b.t}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 text-center py-16 max-w-2xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-yellow-300 drop-shadow-lg mb-4">
          Start Your Learning Journey 🚀
        </h2>
        <p className="text-xl text-indigo-50 font-bold mb-8">
          Complete lessons, grow your mind, and become a true MindHero.
        </p>
        <Link
          href="/dashboard"
          className="inline-block bg-gradient-to-r from-magical-yellow to-[#fcd34d] text-magical-dark px-10 py-4 rounded-full font-heading font-extrabold text-lg shadow-[0_0_30px_rgba(245,158,11,0.5)] hover:shadow-[0_0_40px_rgba(245,158,11,0.8)] hover:-translate-y-1 transition-all duration-300"
        >
          View My Dashboard →
        </Link>
      </section>
    </main>
  );
}
