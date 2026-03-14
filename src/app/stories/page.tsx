"use client";

import Link from "next/link";
import { stories } from "../../data/stories";
import { motion } from "framer-motion";

export default function StoriesPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-yellow-100 via-pink-100 to-purple-100 p-6 md:p-10">
      {/* Page Header */}
      <header className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-purple-700 mb-4">
          📖 MindHeroes Stories
        </h1>
        <p className="text-xl text-gray-700 max-w-3xl mx-auto">
          Enjoy fun, inspiring, and magical stories that teach kids courage,
          focus, memory skills, faith, kindness, and positive thinking!
        </p>
      </header>

      {/* Stories Grid */}
      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-8 max-w-7xl mx-auto">
        {stories.map((story) => (
          <motion.div
            key={story.id}
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl shadow-xl p-6 flex flex-col justify-between hover:shadow-2xl transition-all duration-300"
          >
            <div className="flex-1">
              {/* Emoji Badge */}
              <div className="text-4xl mb-3 text-center animate-bounce">
                {story.id === "1"
                  ? "🦁"
                  : story.id === "2"
                    ? "✨"
                    : story.id === "3"
                      ? "🌳"
                      : story.id === "4"
                        ? "❤️"
                        : story.id === "5"
                          ? "🌱"
                          : story.id === "6"
                            ? "💡"
                            : "🤝"}
              </div>

              {/* Story Title */}
              <h2 className="text-2xl font-bold text-purple-700 mb-3 text-center">
                {story.title}
              </h2>

              {/* Story Summary */}
              <p className="text-gray-700 text-center">{story.summary}</p>

              {/* Optional Lesson Highlight */}
              {story.content && (
                <p className="mt-4 text-sm text-gray-500 text-center italic">
                  💡 Lesson: {story.content.split("\n")[1].slice(0, 60)}...
                </p>
              )}
            </div>

            {/* Read Story Button */}
            <Link
              href={`/stories/${story.id}`}
              className="mt-6 bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 text-white font-semibold px-4 py-2 rounded-2xl text-center hover:scale-105 transition-all duration-300 shadow-md"
            >
              Read Story
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Extra Call-to-Action */}
      <div className="mt-12 text-center">
        <p className="text-lg text-gray-700 mb-4">
          🌟 Complete all stories to become a MindHero Champion!
        </p>
        <Link
          href="/dashboard"
          className="bg-gradient-to-r from-pink-400 to-purple-500 text-white font-bold px-6 py-3 rounded-2xl hover:scale-105 transition-all duration-300 shadow-lg"
        >
          Go to Dashboard
        </Link>
      </div>
    </main>
  );
}
