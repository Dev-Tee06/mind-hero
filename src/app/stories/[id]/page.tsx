"use client";

import { useParams, useRouter } from "next/navigation";
import { stories } from "../../../data/stories";

export default function StoryPage() {
  const params = useParams();
  const router = useRouter();

  const storyIndex = stories.findIndex((s) => s.id === params.id);
  const story = stories[storyIndex];

  if (!story) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold text-red-500">
        ❌ Story not found
      </div>
    );
  }

  const prevStory = stories[storyIndex - 1];
  const nextStory = stories[storyIndex + 1];

  return (
    <main className="min-h-screen bg-gradient-to-br from-yellow-100 via-pink-100 to-purple-100 p-6 md:p-10">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Story Header */}
        <div className="bg-white rounded-3xl shadow-xl p-8 text-center">
          <h1 className="text-4xl font-extrabold text-purple-700 mb-3">
            {story.title}
          </h1>
          <p className="text-gray-700 text-lg">{story.summary}</p>
        </div>

        {/* Story Content */}
        <section className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-3xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-purple-600 mb-4">📖 Story</h2>
          <p className="text-gray-800 text-lg leading-relaxed whitespace-pre-line">
            {story.content}
          </p>
        </section>

        {/* Practice Section */}
        {story.practice && story.practice.length > 0 && (
          <section className="bg-gradient-to-r from-yellow-50 via-yellow-100 to-yellow-50 rounded-3xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-yellow-700 mb-4">
              📝 Practice
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-800 text-lg">
              {story.practice.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          {prevStory ? (
            <button
              onClick={() => router.push(`/stories/${prevStory.id}`)}
              className="bg-purple-400 text-white px-4 py-2 rounded-xl font-semibold hover:scale-105 transition"
            >
              ← Previous
            </button>
          ) : (
            <div />
          )}

          {nextStory ? (
            <button
              onClick={() => router.push(`/stories/${nextStory.id}`)}
              className="bg-pink-400 text-white px-4 py-2 rounded-xl font-semibold hover:scale-105 transition"
            >
              Next →
            </button>
          ) : (
            <div />
          )}
        </div>
      </div>
    </main>
  );
}
