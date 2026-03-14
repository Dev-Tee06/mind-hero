"use client";

import { useState } from "react";
import LessonCard from "../../components/LessonCard";
import { lessons } from "../../data/lessons";
import { motion } from "framer-motion";

export default function LessonsPage() {
  const [search, setSearch] = useState("");

  const filteredLessons = lessons.filter((lesson) =>
    lesson.title.toLowerCase().includes(search.toLowerCase()),
  );

  // Featured lesson (first lesson in the array)
  const featuredLesson = lessons[0];

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-yellow-100">
      {/* HERO */}
      <section className="text-center py-12 px-6">
        <h1 className="text-4xl font-extrabold text-purple-700 mb-4">
          📚 MindHeroes Lessons
        </h1>

        <p className="text-lg text-purple-600 max-w-2xl mx-auto">
          Discover powerful lessons that help children grow their minds, build
          confidence, develop kindness, and become true MindHeroes.
        </p>

        {/* SEARCH */}
        <div className="mt-6">
          <input
            type="text"
            placeholder="Search lessons..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-3 rounded-xl shadow-md w-70 outline-none"
          />
        </div>
      </section>

      {/* FEATURED LESSON */}
      <section className="max-w-6xl mx-auto px-6 mb-12">
        <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col md:flex-row gap-6 items-center">
          <div className="text-6xl">{featuredLesson.icon}</div>

          <div>
            <h2 className="text-2xl font-bold text-purple-700">
              ⭐ Featured Lesson: {featuredLesson.title}
            </h2>

            <p className="text-gray-600 mt-2">{featuredLesson.description}</p>
          </div>
        </div>
      </section>

      {/* LESSON GRID */}
      <section className="max-w-6xl mx-auto px-6 pb-12">
        <h2 className="text-3xl font-bold text-center text-purple-700 mb-8">
          Explore Lessons
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {filteredLessons.map((lesson) => (
            <motion.div key={lesson.id} whileHover={{ scale: 1.05 }}>
              <LessonCard
                id={lesson.id}
                title={lesson.title}
                description={lesson.description}
                icon={lesson.icon}
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* BENEFITS */}
      <section className="bg-gradient-to-r from-purple-200 via-pink-200 to-yellow-200 py-12">
        <h2 className="text-4xl font-bold text-center text-purple-700 mb-10">
          What You Will Learn 🧠
        </h2>

        <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto text-center px-6">
          <div className="bg-white p-6 rounded-xl shadow">
            <div className="text-4xl">💡</div>
            <p className="font-semibold mt-2">Smart Thinking</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <div className="text-4xl">🌍</div>
            <p className="font-semibold mt-2">Healthy Environment</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <div className="text-4xl">🎵</div>
            <p className="font-semibold mt-2">Positive Music</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <div className="text-4xl">👫</div>
            <p className="font-semibold mt-2">Good Friends</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <div className="text-4xl">🔁</div>
            <p className="font-semibold mt-2">Strong Habits</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <div className="text-4xl">🛡️</div>
            <p className="font-semibold mt-2">Protect Your Mind</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <div className="text-4xl">❤️</div>
            <p className="font-semibold mt-2">Kindness</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <div className="text-4xl">🌟</div>
            <p className="font-semibold mt-2">Confidence</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center py-14 px-6">
        <h2 className="text-4xl font-bold text-pink-600">
          Start Your Learning Journey 🚀
        </h2>

        <p className="text-gray-700 mt-3">
          Complete lessons, grow your mind, and become a true MindHero.
        </p>
      </section>
    </main>
  );
}
