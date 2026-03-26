"use client";

import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function Navbar() {
  const { user } = useAuth();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleLogout = async () => {
    await signOut(auth);
    setIsMobileOpen(false);
  };

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl z-50 transition-all duration-300">
      <div className="glass rounded-full px-6 py-4 flex justify-between items-center shadow-glass border border-white/20 hover:border-white/40 hover:bg-white/20 transition-all duration-500">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-white font-heading font-extrabold text-2xl tracking-tight drop-shadow-md"
        >
          🧠 MindHeroes
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-8 text-white/90 font-semibold text-lg items-center">
          <NavItem href="/" label="Home" />
          <NavItem href="/lessons" label="Lessons" />
          <NavItem href="/stories" label="Stories" />
          <NavItem href="/games" label="Games" />
          <NavItem href="/dashboard" label="Dashboard" />
          
          {!user ? (
            <Link
              href="/signup"
              className="bg-white/10 hover:bg-white/30 border border-white/30 text-white px-6 py-2 rounded-full backdrop-blur-md shadow-glow transition-all duration-300 font-heading tracking-wide"
            >
              Sign Up
            </Link>
          ) : (
            <div className="flex items-center gap-4 ml-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-magical-pink to-magical-yellow text-white flex items-center justify-center font-bold shadow-glow-pink border border-white/50">
                {user.email?.charAt(0).toUpperCase()}
              </div>
            </div>
          )}
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center gap-4 z-50">
          <button
            className="flex flex-col justify-between w-6 h-5 focus:outline-none z-50 relative"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
          >
            <span
              className={`block h-0.5 w-full bg-white transform transition duration-300 ${
                isMobileOpen ? "rotate-45 translate-y-2.5" : ""
              }`}
            ></span>
            <span
              className={`block h-0.5 w-full bg-white transition duration-300 ${
                isMobileOpen ? "opacity-0" : ""
              }`}
            ></span>
            <span
              className={`block h-0.5 w-full bg-white transform transition duration-300 ${
                isMobileOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            ></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="md:hidden absolute top-20 left-0 w-full rounded-3xl overflow-hidden shadow-2xl border border-indigo-400/30 p-2"
            style={{
              background: "linear-gradient(135deg, rgba(76,29,149,0.95) 0%, rgba(109,40,217,0.92) 50%, rgba(49,46,129,0.95) 100%)",
              backdropFilter: "blur(20px)",
            }}
          >
            <div className="flex flex-col gap-2 p-4">
              <MobileNavItem href="/" label="Home" onClick={() => setIsMobileOpen(false)} />
              <MobileNavItem href="/lessons" label="Lessons" onClick={() => setIsMobileOpen(false)} />
              <MobileNavItem href="/stories" label="Stories" onClick={() => setIsMobileOpen(false)} />
              <MobileNavItem href="/games" label="Games" onClick={() => setIsMobileOpen(false)} />
              <MobileNavItem href="/dashboard" label="Dashboard" onClick={() => setIsMobileOpen(false)} />
              
              <div className="h-px w-full bg-white/20 my-4"></div>
              
              {!user ? (
                <>
                  <Link
                    href="/login"
                    onClick={() => setIsMobileOpen(false)}
                    className="w-full text-center text-white/90 hover:text-white py-3 font-semibold text-lg transition"
                  >
                    Log In
                  </Link>
                  <Link
                    href="/signup"
                    onClick={() => setIsMobileOpen(false)}
                    className="w-full text-center bg-magical-pink hover:bg-pink-500 text-white py-3 rounded-2xl font-heading font-semibold shadow-glow-pink transition-all"
                  >
                    Sign Up
                  </Link>
                </>
              ) : (
                <button
                  onClick={handleLogout}
                  className="w-full text-center bg-white/10 hover:bg-white/20 text-white py-3 border border-white/20 rounded-2xl font-semibold shadow-glass transition-all"
                >
                  Log Out
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

function NavItem({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href}>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative group cursor-pointer px-2 py-1"
      >
        <span className="relative z-10 group-hover:text-white transition-colors duration-300 font-heading font-medium tracking-wide drop-shadow-sm">
          {label}
        </span>
        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-magical-pink group-hover:w-full transition-all duration-300 ease-out shadow-glow-pink"></span>
      </motion.div>
    </Link>
  );
}

function MobileNavItem({
  href,
  label,
  onClick,
}: {
  href: string;
  label: string;
  onClick: () => void;
}) {
  return (
    <Link href={href} onClick={onClick}>
      <motion.div
        whileTap={{ scale: 0.95 }}
        className="w-full p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-transparent hover:border-white/10 cursor-pointer text-white font-heading text-xl shadow-sm transition-all text-center"
      >
        {label}
      </motion.div>
    </Link>
  );
}
