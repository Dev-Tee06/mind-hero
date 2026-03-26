"use client";

import Link from "next/link";
import { stories } from "../../data/stories";
import { motion } from "framer-motion";

const storyEmojis: Record<string, string> = {
  "1": "🦁", "2": "✨", "3": "🌳", "4": "❤️",
  "5": "🌱", "6": "💡", "7": "🤝",
};

export default function StoriesPage() {
  return (
    <main className="min-h-screen bg-mesh-premium pt-28 pb-16 px-6">
      {/* Glowing orb decorations */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
        <div className="absolute top-[15%] left-[5%] w-72 h-72 bg-magical-pink/25 rounded-full blur-[100px]" />
        <div className="absolute top-[50%] right-[5%] w-96 h-96 bg-magical-purple/25 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] left-[35%] w-80 h-80 bg-magical-cyan/20 rounded-full blur-[100px]" />
      </div>

      {/* Page Header */}
      <header className="relative z-10 text-center mb-14 max-w-3xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-6xl font-heading font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-cyan-300 mb-5 drop-shadow-lg"
        >
          📖 MindHeroes Stories
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-indigo-50 font-bold leading-relaxed drop-shadow"
        >
          Fun, inspiring, and magical stories that teach kids courage, focus, faith, kindness, and positive thinking!
        </motion.p>
      </header>

      {/* Stories Grid */}
      <div className="relative z-10 grid md:grid-cols-3 sm:grid-cols-2 gap-8 max-w-7xl mx-auto">
        {stories.map((story, idx) => (
          <motion.div
            key={story.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.08 }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="glass-panel rounded-3xl p-8 flex flex-col justify-between hover:shadow-glow transition-all duration-300 border border-white/20 group"
          >
            <div className="flex-1 text-center">
              {/* Emoji Badge */}
              <div className="text-6xl mb-5 drop-shadow-2xl transform group-hover:scale-110 transition-transform duration-300 leading-none">
                {storyEmojis[story.id] ?? "🤝"}
              </div>

              {/* Story Title */}
              <h2 className="text-2xl font-heading font-extrabold text-white mb-3 drop-shadow-md leading-tight">
                {story.title}
              </h2>

              {/* Story Summary */}
              <p className="text-indigo-50 font-bold leading-relaxed">{story.summary}</p>

              {/* Lesson Highlight */}
              {story.content && (
                <p className="mt-4 text-sm text-indigo-200 font-semibold italic text-center">
                  💡 {story.content.split("\n")[1]?.slice(0, 70)}…
                </p>
              )}
            </div>

            {/* Read Story Button */}
            <Link
              href={`/stories/${story.id}`}
              className="mt-7 block bg-gradient-to-r from-magical-purple to-magical-pink text-white font-heading font-extrabold px-4 py-3 rounded-xl text-center hover:scale-105 hover:shadow-glow-pink transition-all duration-300 shadow-md uppercase tracking-wider text-sm"
            >
              Read Story
            </Link>
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <div className="relative z-10 mt-16 text-center">
        <p className="text-xl text-indigo-50 font-bold mb-6 drop-shadow">
          🌟 Complete all stories to become a MindHero Champion!
        </p>
        <Link
          href="/dashboard"
          className="inline-block bg-gradient-to-r from-magical-yellow to-[#fcd34d] text-magical-dark px-10 py-4 rounded-full font-heading font-extrabold text-lg shadow-[0_0_30px_rgba(245,158,11,0.5)] hover:shadow-[0_0_40px_rgba(245,158,11,0.8)] hover:-translate-y-1 transition-all duration-300"
        >
          Go to Dashboard →
        </Link>
      </div>
    </main>
  );
}
