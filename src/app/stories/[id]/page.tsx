"use client";

import { useParams, useRouter } from "next/navigation";
import { stories } from "../../../data/stories";
import { motion } from "framer-motion";

const storyEmojis: Record<string, string> = {
  "1": "🦁", "2": "✨", "3": "🌳", "4": "❤️",
  "5": "🌱", "6": "💡", "7": "🤝",
};

export default function StoryPage() {
  const params = useParams();
  const router = useRouter();

  const storyIndex = stories.findIndex((s) => s.id === params.id);
  const story = stories[storyIndex];

  if (!story) {
    return (
      <main className="min-h-screen bg-mesh-premium flex items-center justify-center pt-24">
        <div className="glass-panel p-12 rounded-3xl text-center shadow-glow max-w-md mx-4">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-2xl font-heading font-extrabold text-white mb-4">Story Not Found</h2>
          <button
            onClick={() => router.push("/stories")}
            className="bg-gradient-to-r from-magical-purple to-magical-pink text-white px-8 py-3 rounded-full font-heading font-extrabold shadow-glow-pink hover:scale-105 transition-all"
          >
            Back to Stories
          </button>
        </div>
      </main>
    );
  }

  const prevStory = stories[storyIndex - 1];
  const nextStory = stories[storyIndex + 1];

  return (
    <main className="min-h-screen bg-mesh-premium pt-28 pb-16 px-6">
      {/* Glowing orbs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
        <div className="absolute top-[15%] left-[5%] w-80 h-80 bg-magical-pink/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[15%] right-[5%] w-72 h-72 bg-magical-purple/25 rounded-full blur-[100px]" />
        <div className="absolute top-[55%] left-[35%] w-64 h-64 bg-magical-cyan/15 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto space-y-6">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => router.push("/stories")}
          className="flex items-center gap-2 text-indigo-200 hover:text-white font-heading font-bold transition-colors group"
        >
          <span className="group-hover:-translate-x-1 transition-transform">←</span> All Stories
        </motion.button>

        {/* Story Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel rounded-[2rem] p-8 md:p-12 text-center shadow-glow border border-white/20 relative overflow-hidden"
        >
          <div className="absolute -top-16 -right-16 w-56 h-56 bg-magical-pink/20 rounded-full blur-3xl pointer-events-none" />
          <div className="text-7xl mb-5 leading-none drop-shadow-2xl">
            {storyEmojis[String(story.id)] ?? "📖"}
          </div>
          <h1 className="text-3xl md:text-5xl font-heading font-extrabold text-white mb-4 drop-shadow-md leading-tight">
            {story.title}
          </h1>
          <p className="text-indigo-50 text-lg md:text-xl font-bold leading-relaxed max-w-2xl mx-auto">
            {story.summary}
          </p>
        </motion.div>

        {/* Story Content */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-panel rounded-[2rem] p-8 md:p-10 border border-white/20 shadow-glow"
        >
          <h2 className="text-2xl font-heading font-extrabold text-white mb-5 drop-shadow-md">
            📖 Story
          </h2>
          <p className="text-indigo-50 text-lg leading-loose font-bold whitespace-pre-line">
            {story.content}
          </p>
        </motion.section>

        {/* Practice Section */}
        {story.practice && story.practice.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-panel rounded-[2rem] p-8 md:p-10 border border-magical-yellow/30 shadow-[0_0_30px_rgba(245,158,11,0.15)]"
          >
            <h2 className="text-2xl font-heading font-extrabold text-white mb-5 drop-shadow-md">
              📝 Practice
            </h2>
            <ul className="space-y-3">
              {story.practice.map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-indigo-50 font-bold text-lg leading-relaxed">
                  <span className="mt-1 w-6 h-6 shrink-0 rounded-full bg-magical-yellow/80 flex items-center justify-center text-magical-dark text-xs font-extrabold">
                    {index + 1}
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.section>
        )}

        {/* Prev / Next Navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex justify-between items-center gap-4 pt-4"
        >
          {prevStory ? (
            <button
              onClick={() => router.push(`/stories/${prevStory.id}`)}
              className="flex items-center gap-2 glass px-6 py-3 rounded-full font-heading font-extrabold text-white border border-white/20 hover:bg-white/20 hover:-translate-x-1 transition-all duration-300 text-sm"
            >
              ← Previous Story
            </button>
          ) : (
            <div />
          )}

          {nextStory ? (
            <button
              onClick={() => router.push(`/stories/${nextStory.id}`)}
              className="flex items-center gap-2 bg-gradient-to-r from-magical-purple to-magical-pink text-white px-6 py-3 rounded-full font-heading font-extrabold shadow-glow-pink hover:scale-105 hover:translate-x-1 transition-all duration-300 text-sm"
            >
              Next Story →
            </button>
          ) : (
            <div />
          )}
        </motion.div>

        {/* Back to Stories */}
        <div className="text-center pt-2 pb-4">
          <button
            onClick={() => router.push("/stories")}
            className="text-indigo-200 hover:text-white font-heading font-bold transition-colors text-sm underline underline-offset-4"
          >
            ← Back to all Stories
          </button>
        </div>
      </div>
    </main>
  );
}
