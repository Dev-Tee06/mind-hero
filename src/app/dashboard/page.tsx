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
    <main className="min-h-screen bg-mesh-premium pt-28 pb-12 px-6">
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-heading font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-cyan-300 drop-shadow-lg">
            👋 Welcome, {user?.displayName || "Young Hero"}!
          </h1>
          <p className="text-xl text-indigo-50 mt-4 max-w-2xl mx-auto font-bold drop-shadow-md">Ready to continue your magical journey today?</p>
        </motion.div>

        <section className="glass-panel p-8 rounded-[2rem] shadow-glow mb-10 border border-white/20">
          <h2 className="text-3xl font-heading font-bold text-white mb-6 text-center drop-shadow-md">
            Your Scores
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="glass rounded-3xl p-8 text-center border-t border-l border-white/30 relative overflow-hidden group shadow-xl"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-magical-purple to-magical-pink"></div>
              <p className="text-2xl font-heading font-extrabold text-white mb-2 drop-shadow-md">Puzzle Game</p>
              <p className="text-5xl font-extrabold text-white drop-shadow-lg group-hover:scale-110 transition-transform duration-300">{scores.puzzleScore} <span className="text-2xl text-indigo-100">/ 5</span></p>
              <div className="absolute -bottom-10 -right-10 text-[100px] opacity-20 drop-shadow-2xl">🧩</div>
            </motion.div>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="glass rounded-3xl p-8 text-center border-t border-l border-white/30 relative overflow-hidden group shadow-xl"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-magical-pink to-magical-yellow"></div>
              <p className="text-2xl font-heading font-extrabold text-white mb-2 drop-shadow-md">Memory Game</p>
              <p className="text-5xl font-extrabold text-white drop-shadow-lg group-hover:scale-110 transition-transform duration-300">{scores.memoryScore} <span className="text-2xl text-indigo-100">/ 20</span></p>
              <div className="absolute -bottom-10 -left-10 text-[100px] opacity-20 drop-shadow-2xl">🧠</div>
            </motion.div>
          </div>
        </section>

        <section className="glass-panel p-8 rounded-[2rem] shadow-glow border border-white/20">
          <h2 className="text-3xl font-heading font-bold text-white mb-6 text-center drop-shadow-md">
            Your Badges 🏅
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {badges.map((badge, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * idx }}
                className={`p-6 rounded-2xl flex flex-col items-center justify-center text-center font-medium transition-all duration-300 border ${
                  badge.earned
                    ? "bg-gradient-to-r from-purple-500/80 to-pink-500/80 backdrop-blur-md text-white shadow-glow-pink border-white/40 scale-100"
                    : "glass text-indigo-200/60 border-white/10 scale-95 hover:scale-100"
                }`}
              >
                <p className={`text-2xl font-heading font-bold ${badge.earned ? "text-white" : "text-white/50"}`}>{badge.title}</p>
                <p className="text-sm mt-2">{badge.description}</p>
                {badge.earned && <div className="text-4xl mt-3 animate-bounce">⭐</div>}
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
