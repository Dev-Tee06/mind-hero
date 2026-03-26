"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Mascot from "../components/Mascot";
import { useState, useEffect } from "react";

type Bubble = {
  id: number;
  size: number;
  color: string;
  left: string;
  duration: number;
  type: "circle" | "star";
};

export default function Home() {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);

  useEffect(() => {
    let idCounter = 0;

    const colors = ["#F9A8D4", "#A78BFA", "#60A5FA", "#FCD34D", "#F87171", "#38BDF8"];
    const types = ["circle", "star", "circle"]; // More circles than stars

    const createBubble = () => {
      const bubble: Bubble = {
        id: idCounter++,
        size: Math.floor(Math.random() * 40) + 15, // 15-55px
        color: colors[Math.floor(Math.random() * colors.length)],
        left: `${Math.floor(Math.random() * 100)}%`,
        duration: Math.random() * 15 + 10, // 10-25s to rise
        type: types[Math.floor(Math.random() * types.length)] as
          | "circle"
          | "star",
      };
      setBubbles((prev) => [...prev, bubble]);
      setTimeout(() => {
        setBubbles((prev) => prev.filter((b) => b.id !== bubble.id));
      }, bubble.duration * 1000);
    };

    const interval = setInterval(createBubble, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-mesh-premium flex flex-col items-center relative overflow-hidden pt-24 pb-12">
      {/* 🌈 ENDLESS MAGICAL BUBBLES */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {bubbles.map((bubble) => (
          <motion.div
            key={bubble.id}
            className={`absolute ${bubble.type === "circle" ? "rounded-full backdrop-blur-sm border border-white/20 shadow-glass" : ""} text-2xl flex items-center justify-center`}
            style={{
              width: bubble.size,
              height: bubble.size,
              left: bubble.left,
              color: bubble.type === "star" ? bubble.color : undefined,
              backgroundColor:
                bubble.type === "circle" ? `${bubble.color}40` : undefined, // Transparent bg
              fontSize: bubble.type === "star" ? bubble.size : 0,
              opacity: 0.8,
              bottom: "-100px", // Start below the screen
            }}
            initial={{ y: 0, x: 0, scale: 0, rotate: 0 }}
            animate={{ 
              y: -1200, 
              x: Math.random() * 100 - 50, 
              scale: 1,
              rotate: bubble.type === "star" ? 360 : 0
            }}
            transition={{ duration: bubble.duration, ease: "linear" }}
          >
            {bubble.type === "star" ? "✨" : ""}
          </motion.div>
        ))}
        
        {/* Abstract glowing orbs in background */}
        <div className="absolute top-[20%] left-[10%] w-[300px] h-[300px] bg-magical-pink/30 rounded-full blur-[100px] mix-blend-screen animate-blob z-0"></div>
        <div className="absolute top-[40%] right-[10%] w-[400px] h-[400px] bg-magical-purple/30 rounded-full blur-[120px] mix-blend-screen animate-blob animation-delay-2000 z-0"></div>
        <div className="absolute bottom-[20%] left-[30%] w-[350px] h-[350px] bg-magical-cyan/30 rounded-full blur-[100px] mix-blend-screen animate-blob animation-delay-4000 z-0"></div>
      </div>

      {/* HERO SECTION */}
      <section className="flex flex-col items-center text-center p-6 sm:p-10 relative z-10 w-full max-w-7xl mx-auto mt-8 xl:mt-16">
        <motion.div
          initial={{ scale: 0, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="relative group"
        >
          <div className="absolute inset-0 bg-white/20 blur-2xl rounded-full scale-110 group-hover:scale-150 transition-transform duration-500 z-0"></div>
          <div className="relative z-10 animate-float">
            <Mascot />
          </div>
        </motion.div>

        <motion.h1
          className="text-5xl md:text-7xl font-heading font-extrabold mt-8 text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-cyan-300 drop-shadow-lg tracking-tight"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          MindHeroes <span className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]">🧠✨</span>
        </motion.h1>

        <motion.p 
          className="text-xl md:text-2xl mt-6 text-indigo-50 max-w-3xl leading-relaxed font-bold drop-shadow-md"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          A magical place where kids learn life lessons, explore stories, play
          games, and become heroes of their own minds.
        </motion.p>

        <motion.div 
          className="flex flex-wrap gap-6 mt-12 justify-center"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <Link
            href="/lessons"
            className="group relative bg-magical-pink hover:bg-pink-500 text-white px-8 py-4 rounded-2xl text-xl font-heading font-bold shadow-glow-pink hover:-translate-y-1 transition-all duration-300 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              📚 Start Learning
            </span>
            <div className="absolute inset-0 h-full w-full scale-0 rounded-2xl transition-all duration-300 group-hover:scale-100 group-hover:bg-white/20 z-0"></div>
          </Link>

          <Link
            href="/stories"
            className="group relative glass hover:bg-white/20 text-white px-8 py-4 rounded-2xl text-xl font-heading font-bold shadow-glass hover:-translate-y-1 transition-all duration-300 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              📖 Read Stories
            </span>
            <div className="absolute inset-0 h-full w-full scale-0 rounded-2xl transition-all duration-300 group-hover:scale-100 group-hover:bg-white/10 z-0"></div>
          </Link>

          <Link
            href="/games"
            className="group relative bg-magical-yellow hover:bg-yellow-400 text-magical-dark px-8 py-4 rounded-2xl text-xl font-heading font-bold shadow-[0_0_20px_rgba(245,158,11,0.5)] hover:-translate-y-1 transition-all duration-300 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              🎮 Play Games
            </span>
            <div className="absolute inset-0 h-full w-full scale-0 rounded-2xl transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30 z-0"></div>
          </Link>
        </motion.div>
      </section>

      {/* FEATURES SECTION */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 p-10 max-w-7xl relative z-10 mt-16">
        <motion.div
          whileHover={{ y: -10, scale: 1.02 }}
          className="glass-panel rounded-3xl p-8 text-center group transition-all duration-300 hover:shadow-glow"
        >
          <div className="text-6xl mb-6 transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 drop-shadow-2xl">📚</div>
          <h3 className="text-3xl font-heading font-extrabold text-white mb-3 drop-shadow-md">Life Lessons</h3>
          <p className="text-indigo-50 font-bold leading-relaxed">
            Learn powerful lessons about kindness, courage, discipline, and
            wisdom.
          </p>
        </motion.div>

        <motion.div
          whileHover={{ y: -10, scale: 1.02 }}
          className="glass-panel rounded-3xl p-8 text-center group transition-all duration-300 hover:shadow-glow"
        >
          <div className="text-6xl mb-6 transform group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-300 drop-shadow-2xl">📖</div>
          <h3 className="text-3xl font-heading font-extrabold text-white mb-3 drop-shadow-md">Inspiring Stories</h3>
          <p className="text-indigo-50 font-bold leading-relaxed">
            Fun stories that teach important values and grow imagination.
          </p>
        </motion.div>

        <motion.div
          whileHover={{ y: -10, scale: 1.02 }}
          className="glass-panel rounded-3xl p-8 text-center group transition-all duration-300 hover:shadow-glow"
        >
          <div className="text-6xl mb-6 transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 drop-shadow-2xl">🎮</div>
          <h3 className="text-3xl font-heading font-extrabold text-white mb-3 drop-shadow-md">Fun Games</h3>
          <p className="text-indigo-50 font-bold leading-relaxed">
            Brain games that improve memory, thinking, and creativity.
          </p>
        </motion.div>
      </section>

      {/* BENEFITS SECTION */}
      <section className="w-full max-w-7xl mx-auto py-20 relative z-10 px-6">
        <div className="glass-panel rounded-[3rem] p-8 md:p-14 text-center border border-white/20 shadow-glow">
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-br from-white to-pink-200 mb-10 drop-shadow-md">
            Why Kids Love MindHeroes <span className="text-yellow-300 inline-block animate-bounce">⭐</span>
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              {i:"🧠", t:"Grow Your Mind"},
              {i:"🎯", t:"Daily Challenges"},
              {i:"🏆", t:"Earn Badges"},
              {i:"🎨", t:"Fun Activities"},
            ].map(({i, t}) => (
              <div key={t} className="glass rounded-2xl py-6 px-3 hover:bg-white/20 transition-colors duration-300 group flex flex-col items-center gap-3">
                <span className="text-4xl leading-none drop-shadow-md">{i}</span>
                <p className="font-heading font-bold text-white text-sm md:text-base text-center tracking-wide leading-snug">{t}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="w-full relative z-10 px-6 pb-20 mt-10">
        <motion.div 
          className="max-w-4xl mx-auto glass-panel rounded-3xl p-12 text-center relative overflow-hidden"
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.3 }}
        >
          {/* Decorative glowing backings */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-magical-pink/50 rounded-full blur-3xl z-0"></div>
          <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-magical-cyan/40 rounded-full blur-3xl z-0"></div>
          
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-white drop-shadow-md">
              Ready to Become a MindHero? 🚀
            </h2>

            <p className="text-xl text-indigo-100 font-medium mb-10 max-w-2xl mx-auto">
              Start your adventure today and grow your mind! Join thousands of other heroes on their journey.
            </p>

            <Link
              href="/signup"
              className="inline-block bg-gradient-to-r from-magical-yellow to-[#fcd34d] text-magical-dark px-10 py-5 rounded-full font-heading font-extrabold text-xl shadow-[0_0_30px_rgba(245,158,11,0.6)] hover:shadow-[0_0_40px_rgba(245,158,11,0.8)] hover:-translate-y-1 transition-all duration-300"
            >
              Start Your Free Journey
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
