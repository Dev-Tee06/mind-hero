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
  {
    id: 1,
    question: "If someone falls down, should you laugh?",
    options: ["Yes", "No"],
    correct: "No",
    explanation:
      "Laughing can hurt others' feelings. Help and encourage them instead! 🤗",
  },
  {
    id: 2,
    question: "You are scared to try something new. What should you do?",
    options: ["Avoid it", "Try it bravely"],
    correct: "Try it bravely",
    explanation: "Being courageous helps you grow and learn new skills! 💪",
  },
  {
    id: 3,
    question: "A friend asks you to cheat in class. What should you do?",
    options: ["Cheat", "Say No and be honest"],
    correct: "Say No and be honest",
    explanation: "Discipline and honesty build trust and success! 👍",
  },
  {
    id: 4,
    question: "Someone is sad, what should you do?",
    options: ["Ignore them", "Comfort and help them"],
    correct: "Comfort and help them",
    explanation:
      "Kindness strengthens friendships and makes the world better! ❤️",
  },
  {
    id: 5,
    question: "You want to quit a difficult task, what should you do?",
    options: ["Give up", "Keep trying"],
    correct: "Keep trying",
    explanation:
      "Perseverance helps you overcome fear and achieve your goals! 🌟",
  },
  {
    id: 6,
    question: "Is it good to have friends who encourage you to do good things?",
    options: ["Yes", "No"],
    correct: "Yes",
    explanation: "Good friends motivate you to be your best self! 🌈",
  },
  {
    id: 7,
    question: "Should you respect your elders?",
    options: ["Yes", "No"],
    correct: "Yes",
    explanation:
      "Respecting elders shows kindness and builds good relationships. 🙏",
  },
  {
    id: 8,
    question: "Is it helpful to pray when you are worried?",
    options: ["Yes", "No"],
    correct: "Yes",
    explanation: "Prayer can calm your mind and give you hope! ✨",
  },
  {
    id: 9,
    question: "If a friend shares a secret, should you tell others?",
    options: ["Yes", "No"],
    correct: "No",
    explanation: "Keeping promises builds trust and strong friendships. 🤝",
  },
  {
    id: 10,
    question: "If someone is learning something slowly, should you be patient?",
    options: ["Yes", "No"],
    correct: "Yes",
    explanation: "Patience helps others feel safe and respected. 🌟",
  },
  {
    id: 11,
    question: "Should you help a friend struggling with homework?",
    options: ["Yes", "No"],
    correct: "Yes",
    explanation: "Helping others shows kindness and teamwork. 🤗",
  },
  {
    id: 12,
    question: "Is it good to say thank you when someone helps you?",
    options: ["Yes", "No"],
    correct: "Yes",
    explanation:
      "Gratitude makes people happy and builds strong relationships. 💖",
  },
  {
    id: 13,
    question: "If you make a mistake, should you apologize?",
    options: ["Yes", "No"],
    correct: "Yes",
    explanation: "Apologizing shows courage and responsibility. 🌟",
  },
  {
    id: 14,
    question: "Should you follow rules at school?",
    options: ["Yes", "No"],
    correct: "Yes",
    explanation: "Following rules keeps everyone safe and happy. 🏫",
  },
  {
    id: 15,
    question: "Is it good to share your toys with friends?",
    options: ["Yes", "No"],
    correct: "Yes",
    explanation: "Sharing shows kindness and makes friends feel valued. 🎁",
  },
  {
    id: 16,
    question: "If someone is new in class, should you be friendly?",
    options: ["Yes", "No"],
    correct: "Yes",
    explanation: "Being friendly helps others feel welcome and happy. 😊",
  },
  {
    id: 17,
    question: "Should you practice skills every day to get better?",
    options: ["Yes", "No"],
    correct: "Yes",
    explanation: "Daily practice helps you grow and achieve your goals! 🌟",
  },
  {
    id: 18,
    question: "If you see someone being bullied, should you join in?",
    options: ["Yes", "No"],
    correct: "No",
    explanation: "Never hurt others. Stand up or tell an adult! 🛡️",
  },
  {
    id: 19,
    question: "Is it good to help clean up after a game or activity?",
    options: ["Yes", "No"],
    correct: "Yes",
    explanation: "Helping shows responsibility and care for your space! 🧹",
  },
  {
    id: 20,
    question: "Should you always try your best even when it’s hard?",
    options: ["Yes", "No"],
    correct: "Yes",
    explanation: "Doing your best builds confidence and achievement! 🌈",
  },
];

export default function LifeScenarioGame({ goBack }: { goBack: () => void }) {
  const { user } = useAuth();
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleSelect = (option: string) => {
    setSelected(option);
    setShowExplanation(true);
    if (option === scenarios[current].correct) setScore(score + 1);
  };

  const nextScenario = () => {
    setSelected(null);
    setShowExplanation(false);
    setCurrent(current + 1);
  };

  // Save memoryScore after completing all scenarios
  useEffect(() => {
    const save = async () => {
      if (current >= scenarios.length && user) {
        await saveScores(user.uid, undefined, score); // only update memoryScore
      }
    };
    save();
  }, [current, score, user]);

  if (current >= scenarios.length) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-yellow-100 via-pink-100 to-purple-100 flex flex-col items-center justify-center p-10">
        <div className="bg-white p-8 rounded-3xl shadow-xl text-center max-w-xl">
          <h1 className="text-4xl font-bold text-purple-700 mb-4">
            🎉 Well Done!
          </h1>
          <p className="text-gray-700 mb-6">
            You completed all scenarios! Your Score: {score} /{" "}
            {scenarios.length}
          </p>
          <button
            onClick={goBack}
            className="bg-gradient-to-r from-purple-400 to-pink-400 text-white px-6 py-2 rounded-2xl font-semibold hover:scale-105 transition"
          >
            Back to Games
          </button>
        </div>
      </main>
    );
  }

  const scenario = scenarios[current];

  return (
    <main className="min-h-screen bg-gradient-to-br from-yellow-100 via-pink-100 to-purple-100 flex flex-col items-center p-10">
      <div className="max-w-xl w-full bg-white rounded-3xl shadow-xl p-8 text-center">
        <h2 className="text-3xl font-bold text-purple-700 mb-6">
          🧠 Scenario {current + 1} of {scenarios.length}
        </h2>
        <p className="text-xl text-gray-700 mb-6">{scenario.question}</p>

        <div className="flex flex-col gap-4">
          {scenario.options.map((option) => (
            <motion.button
              key={option}
              onClick={() => handleSelect(option)}
              whileHover={{ scale: 1.05 }}
              className={`px-6 py-3 rounded-2xl font-semibold text-white transition ${
                selected
                  ? option === scenario.correct
                    ? "bg-green-500"
                    : option === selected
                      ? "bg-red-500"
                      : "bg-gray-300 text-gray-700"
                  : "bg-purple-400 hover:bg-purple-500"
              }`}
              disabled={!!selected}
            >
              {option}
            </motion.button>
          ))}
        </div>

        <AnimatePresence>
          {showExplanation && selected && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-6 bg-gray-100 p-4 rounded-xl text-gray-800"
            >
              <span className="mr-2">
                {selected === scenario.correct ? "👍" : "😢"}
              </span>
              {scenario.explanation}
              <div className="mt-4">
                <button
                  onClick={nextScenario}
                  className="bg-gradient-to-r from-purple-400 to-pink-400 text-white px-4 py-2 rounded-xl font-semibold hover:scale-105 transition"
                >
                  Next Scenario
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
