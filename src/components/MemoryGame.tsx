"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { saveScores } from "../utils/userData";

type Scenario = {
  id: number;
  question: string;
  options: string[];
  correct: string;
  explanation: string;
};

const scenarios: Scenario[] = [
  { id: 1, question: "If someone falls down, should you laugh?", options: ["Yes", "No"], correct: "No", explanation: "Laughing can hurt others' feelings. Help and encourage them instead! 🤗" },
  { id: 2, question: "You are scared to try something new. What should you do?", options: ["Avoid it", "Try it bravely"], correct: "Try it bravely", explanation: "Being courageous helps you grow and learn new skills! 💪" },
  { id: 3, question: "A friend asks you to cheat in class. What should you do?", options: ["Cheat", "Say No and be honest"], correct: "Say No and be honest", explanation: "Discipline and honesty build trust and success! 👍" },
  { id: 4, question: "Someone is sad, what should you do?", options: ["Ignore them", "Comfort and help them"], correct: "Comfort and help them", explanation: "Kindness strengthens friendships and makes the world better! ❤️" },
  { id: 5, question: "You want to quit a difficult task, what should you do?", options: ["Give up", "Keep trying"], correct: "Keep trying", explanation: "Perseverance helps you overcome fear and achieve your goals! 🌟" },
  { id: 6, question: "Is it good to have friends who encourage you to do good things?", options: ["Yes", "No"], correct: "Yes", explanation: "Good friends motivate you to be your best self! 🌈" },
  { id: 7, question: "Should you respect your elders?", options: ["Yes", "No"], correct: "Yes", explanation: "Respecting elders shows kindness and builds good relationships. 🙏" },
  { id: 8, question: "Is it helpful to pray when you are worried?", options: ["Yes", "No"], correct: "Yes", explanation: "Prayer can calm your mind and give you hope! ✨" },
  { id: 9, question: "If a friend shares a secret, should you tell others?", options: ["Yes", "No"], correct: "No", explanation: "Keeping promises builds trust and strong friendships. 🤝" },
  { id: 10, question: "If someone is learning something slowly, should you be patient?", options: ["Yes", "No"], correct: "Yes", explanation: "Patience helps others feel safe and respected. 🌟" },
  { id: 11, question: "Should you help a friend struggling with homework?", options: ["Yes", "No"], correct: "Yes", explanation: "Helping others shows kindness and teamwork. 🤗" },
  { id: 12, question: "Is it good to say thank you when someone helps you?", options: ["Yes", "No"], correct: "Yes", explanation: "Gratitude makes people happy and builds strong relationships. 💖" },
  { id: 13, question: "If you make a mistake, should you apologize?", options: ["Yes", "No"], correct: "Yes", explanation: "Apologizing shows courage and responsibility. 🌟" },
  { id: 14, question: "Should you follow rules at school?", options: ["Yes", "No"], correct: "Yes", explanation: "Following rules keeps everyone safe and happy. 🏫" },
  { id: 15, question: "Is it good to share your toys with friends?", options: ["Yes", "No"], correct: "Yes", explanation: "Sharing shows kindness and makes friends feel valued. 🎁" },
  { id: 16, question: "If someone is new in class, should you be friendly?", options: ["Yes", "No"], correct: "Yes", explanation: "Being friendly helps others feel welcome and happy. 😊" },
  { id: 17, question: "Should you practice skills every day to get better?", options: ["Yes", "No"], correct: "Yes", explanation: "Daily practice helps you grow and achieve your goals! 🌟" },
  { id: 18, question: "If you see someone being bullied, should you join in?", options: ["Yes", "No"], correct: "No", explanation: "Never hurt others. Stand up or tell an adult! 🛡️" },
  { id: 19, question: "Is it good to help clean up after a game or activity?", options: ["Yes", "No"], correct: "Yes", explanation: "Helping shows responsibility and care for your space! 🧹" },
  { id: 20, question: "Should you always try your best even when it's hard?", options: ["Yes", "No"], correct: "Yes", explanation: "Doing your best builds confidence and achievement! 🌈" },
];

export default function LifeScenarioGame({ goBack }: { goBack: () => void }) {
  const { user } = useAuth();
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleSelect = (option: string) => {
    if (selected) return;
    setSelected(option);
    setShowExplanation(true);
    if (option === scenarios[current].correct) setScore(score + 1);
  };

  const nextScenario = () => {
    setSelected(null);
    setShowExplanation(false);
    setCurrent(current + 1);
  };

  useEffect(() => {
    const save = async () => {
      if (current >= scenarios.length && user) {
        await saveScores(user.uid, undefined, score);
      }
    };
    save();
  }, [current, score, user]);

  const progress = Math.round((current / scenarios.length) * 100);
  const scenario = scenarios[current];

  if (current >= scenarios.length) {
    return (
      <main className="min-h-screen bg-mesh-premium flex items-center justify-center p-6">
        <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
          <div className="absolute top-[20%] left-[10%] w-72 h-72 bg-magical-cyan/20 rounded-full blur-[100px]" />
          <div className="absolute bottom-[20%] right-[10%] w-72 h-72 bg-magical-purple/25 rounded-full blur-[100px]" />
        </div>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative z-10 glass-panel rounded-[2rem] p-10 md:p-14 text-center max-w-lg w-full shadow-glow border border-white/20"
        >
          <div className="text-7xl mb-5 drop-shadow-2xl">🎉</div>
          <h1 className="text-4xl font-heading font-extrabold text-white mb-3 drop-shadow-md">
            Well Done!
          </h1>
          <p className="text-indigo-50 font-bold text-xl mb-2">
            Your Score: <span className="text-magical-yellow text-3xl font-extrabold">{score}</span> / {scenarios.length}
          </p>
          <p className="text-indigo-200 font-semibold mb-8 text-sm">
            {score >= 18 ? "🌟 Amazing! You are a true MindHero!" : score >= 12 ? "Great job! Keep building great habits! 💪" : "Keep learning and you'll get there! 🚀"}
          </p>
          <button
            onClick={goBack}
            className="bg-gradient-to-r from-magical-blue to-magical-cyan text-white px-10 py-4 rounded-full font-heading font-extrabold shadow-glow hover:scale-105 transition-all duration-300 uppercase tracking-wide"
          >
            Back to Games
          </button>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-mesh-premium flex flex-col items-center justify-center p-6">
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
        <div className="absolute top-[15%] left-[5%] w-80 h-80 bg-magical-cyan/15 rounded-full blur-[120px]" />
        <div className="absolute bottom-[15%] right-[5%] w-72 h-72 bg-magical-purple/20 rounded-full blur-[100px]" />
      </div>

      <motion.div
        key={current}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative z-10 glass-panel rounded-[2rem] p-8 md:p-12 max-w-lg w-full text-center shadow-glow border border-white/20"
      >
        {/* Header row */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={goBack}
            className="text-indigo-200 hover:text-white font-heading font-bold text-sm transition-colors flex items-center gap-1 group"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span> Games
          </button>
          <span className="text-indigo-200 font-semibold text-sm">
            {current + 1} / {scenarios.length}
          </span>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-white/10 rounded-full h-2 mb-8 overflow-hidden">
          <motion.div
            className="h-2 bg-gradient-to-r from-magical-blue to-magical-cyan rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>

        <h2 className="text-lg text-magical-cyan font-heading font-extrabold uppercase tracking-widest mb-3 drop-shadow">
          🧠 Scenario {current + 1}
        </h2>
        <p className="text-xl md:text-2xl text-white font-extrabold leading-relaxed mb-8 drop-shadow-md">
          {scenario.question}
        </p>

        <div className="flex flex-col gap-4">
          {scenario.options.map((option) => {
            let btnClass =
              "px-6 py-4 rounded-xl font-heading font-extrabold text-white transition-all duration-200 border ";
            if (!selected) {
              btnClass +=
                "glass border-white/20 hover:bg-white/20 hover:scale-[1.02]";
            } else if (option === scenario.correct) {
              btnClass =
                "px-6 py-4 rounded-xl font-heading font-extrabold text-white bg-green-500/40 border border-green-400/60 shadow-[0_0_20px_rgba(74,222,128,0.4)]";
            } else if (option === selected) {
              btnClass =
                "px-6 py-4 rounded-xl font-heading font-extrabold text-white bg-red-500/40 border border-red-400/60";
            } else {
              btnClass =
                "px-6 py-4 rounded-xl font-heading font-extrabold text-white/30 glass border-white/10";
            }

            return (
              <motion.button
                key={option}
                onClick={() => handleSelect(option)}
                whileHover={!selected ? { scale: 1.02 } : {}}
                className={btnClass}
                disabled={!!selected}
              >
                {option}
              </motion.button>
            );
          })}
        </div>

        <AnimatePresence>
          {showExplanation && selected && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`mt-6 p-5 rounded-2xl font-bold text-left border ${
                selected === scenario.correct
                  ? "bg-green-500/15 border-green-400/30 text-green-100"
                  : "bg-red-500/15 border-red-400/30 text-red-100"
              }`}
            >
              <span className="mr-2 text-lg">
                {selected === scenario.correct ? "✅" : "❌"}
              </span>
              {scenario.explanation}
              <div className="mt-5">
                <button
                  onClick={nextScenario}
                  className="bg-gradient-to-r from-magical-blue to-magical-cyan text-white px-7 py-3 rounded-full font-heading font-extrabold hover:scale-105 transition-all duration-300 shadow-glow text-sm uppercase tracking-wide"
                >
                  Next Scenario →
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </main>
  );
}
