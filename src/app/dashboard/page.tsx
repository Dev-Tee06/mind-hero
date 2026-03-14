"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { getScores } from "../../utils/userData";
import { motion } from "framer-motion";

type Scores = {
  puzzleScore: number;
  memoryScore: number;
};

type Badge = {
  title: string;
  description: string;
  earned: boolean;
};

export default function Dashboard() {
  const { user } = useAuth();
  const [scores, setScores] = useState<Scores>({
    puzzleScore: 0,
    memoryScore: 0,
  });
  const [badges, setBadges] = useState<Badge[]>([]);

  useEffect(() => {
    if (user) {
      const fetchScores = async () => {
        const data = await getScores(user.uid);
        setScores({
          puzzleScore: data.puzzleScore || 0,
          memoryScore: data.memoryScore || 0,
        });

        // Set badges based on scores
        const newBadges: Badge[] = [
          {
            title: "Puzzle Novice",
            description: "Score at least 3 points in Puzzle Game",
            earned: (data.puzzleScore || 0) >= 3,
          },
          {
            title: "Puzzle Master",
            description: "Score 5 points in Puzzle Game",
            earned: (data.puzzleScore || 0) === 5,
          },
          {
            title: "Memory Novice",
            description: "Score at least 5 points in Memory Game",
            earned: (data.memoryScore || 0) >= 5,
          },
          {
            title: "Memory Champion",
            description: "Score 20 points in Memory Game",
            earned: (data.memoryScore || 0) === 20,
          },
        ];
        setBadges(newBadges);
      };
      fetchScores();
    }
  }, [user]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-yellow-100 via-pink-100 to-purple-100 p-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-extrabold text-purple-700 mb-6 text-center">
          👋 Welcome, {user?.displayName || "Young Hero"}!
        </h1>

        <section className="bg-white p-6 rounded-3xl shadow-xl mb-10">
          <h2 className="text-3xl font-bold text-purple-700 mb-4 text-center">
            Your Scores
          </h2>
          <div className="flex justify-around gap-6 flex-wrap">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="bg-purple-200 rounded-2xl p-6 flex-1 text-center"
            >
              <p className="text-xl font-semibold">Puzzle Game</p>
              <p className="text-4xl font-bold">{scores.puzzleScore} / 5</p>
            </motion.div>
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="bg-pink-200 rounded-2xl p-6 flex-1 text-center"
            >
              <p className="text-xl font-semibold">Memory Game</p>
              <p className="text-4xl font-bold">{scores.memoryScore} / 20</p>
            </motion.div>
          </div>
        </section>

        <section className="bg-white p-6 rounded-3xl shadow-xl">
          <h2 className="text-3xl font-bold text-purple-700 mb-4 text-center">
            Your Badges 🏅
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {badges.map((badge, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 rounded-2xl flex flex-col items-center justify-center text-center font-semibold transition ${
                  badge.earned
                    ? "bg-gradient-to-r from-purple-400 to-pink-400 text-white shadow-lg"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                <p className="text-xl">{badge.title}</p>
                <p className="text-sm mt-1">{badge.description}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
