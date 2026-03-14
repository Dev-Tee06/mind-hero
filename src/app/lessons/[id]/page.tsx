"use client";

import { useParams } from "next/navigation";
import { lessons } from "../../../data/lessons";

export default function LessonPage() {
  const params = useParams();
  const lesson = lessons.find((l) => l.id === String(params.id));

  if (!lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold text-red-500">
        ❌ Lesson not found
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-yellow-100 p-6 md:p-10">
      <div className="max-w-4xl mx-auto">
        {/* Lesson Header */}
        <div className="bg-white shadow-xl rounded-3xl p-8 mb-8 text-center">
          <div className="text-7xl mb-4">{lesson.icon}</div>
          <h1 className="text-5xl font-extrabold text-purple-700 mb-3">
            {lesson.title}
          </h1>
          <p className="text-gray-700 text-lg md:text-xl">
            {lesson.description}
          </p>
        </div>

        {/* Lesson Content */}
        <section className="bg-white rounded-3xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-purple-600 mb-4">
            📖 Lesson Content
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">
            {lesson.content}
          </p>
        </section>

        {/* Practice Section */}
        {lesson.practice && (
          <section className="bg-purple-50 rounded-3xl shadow-lg p-8 mb-8">
            <h2 className="text-3xl font-bold text-purple-700 mb-4">
              📝 Practice
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-800 text-lg">
              {lesson.practice.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>
        )}

        {/* Reflection Section */}
        {lesson.reflection && (
          <section className="bg-pink-50 rounded-3xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-pink-600 mb-4">
              💡 Reflection Questions
            </h2>
            <ul className="list-decimal list-inside space-y-2 text-gray-800 text-lg">
              {lesson.reflection.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </main>
  );
}
