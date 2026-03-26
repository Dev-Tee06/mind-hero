"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../utils/firebase";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/dashboard");
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <main className="min-h-screen bg-mesh-premium flex items-center justify-center pt-24 pb-12 px-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md glass-panel p-10 rounded-[2rem] shadow-glow relative z-10"
      >
        <h1 className="text-4xl font-heading font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-cyan-300 mb-8 text-center drop-shadow-md">
          Welcome Back
        </h1>
        
        <div className="space-y-5">
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/10 border border-white/20 p-4 rounded-xl text-white placeholder-indigo-200 outline-none focus:border-magical-pink focus:bg-white/20 transition-all font-medium"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/10 border border-white/20 p-4 rounded-xl text-white placeholder-indigo-200 outline-none focus:border-magical-pink focus:bg-white/20 transition-all font-medium"
            />
          </div>
          <button
            onClick={handleLogin}
            className="w-full bg-gradient-to-r from-magical-purple to-magical-pink text-white py-4 rounded-xl font-heading font-bold text-lg shadow-glow-pink hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(219,39,119,0.7)] transition-all duration-300 mt-4"
          >
            Log In
          </button>
        </div>
      </motion.div>
    </main>
  );
}
