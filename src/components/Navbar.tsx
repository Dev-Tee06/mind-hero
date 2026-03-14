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
    <nav className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-white font-extrabold text-2xl"
        >
          🧠 MindHeroes
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-6 text-white font-semibold text-lg">
          <NavItem href="/" label="Home" />
          <NavItem href="/lessons" label="Lessons" />
          <NavItem href="/stories" label="Stories" />
          <NavItem href="/games" label="Games" />
          <NavItem href="/dashboard" label="Dashboard" />
          {!user && <NavItem href="/signup" label="Signup" />}{" "}
          {/* Signup link */}
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center gap-4">
          {user && (
            <div className="w-8 h-8 rounded-full bg-white text-purple-600 flex items-center justify-center font-bold">
              {user.email?.charAt(0).toUpperCase()}
            </div>
          )}
          <button
            className="flex flex-col justify-between w-6 h-6 focus:outline-none"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
          >
            <span
              className={`block h-0.5 w-full bg-white transform transition duration-300 ${
                isMobileOpen ? "rotate-45 translate-y-2" : ""
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

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white font-semibold"
          >
            <div className="flex flex-col gap-4 px-6 py-4">
              <MobileNavItem
                href="/"
                label="Home"
                onClick={() => setIsMobileOpen(false)}
              />
              <MobileNavItem
                href="/lessons"
                label="Lessons"
                onClick={() => setIsMobileOpen(false)}
              />
              <MobileNavItem
                href="/stories"
                label="Stories"
                onClick={() => setIsMobileOpen(false)}
              />
              <MobileNavItem
                href="/games"
                label="Games"
                onClick={() => setIsMobileOpen(false)}
              />
              <MobileNavItem
                href="/dashboard"
                label="Dashboard"
                onClick={() => setIsMobileOpen(false)}
              />
              {!user && (
                <Link
                  href="/signup"
                  onClick={() => setIsMobileOpen(false)}
                  className="bg-white text-purple-600 px-4 py-2 rounded-xl font-semibold shadow hover:bg-gray-100 transition mt-2"
                >
                  Signup
                </Link>
              )}
              {user ? (
                <button
                  onClick={handleLogout}
                  className="bg-white text-purple-600 px-4 py-2 rounded-xl font-semibold shadow hover:bg-gray-100 transition mt-2"
                >
                  Logout
                </button>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setIsMobileOpen(false)}
                  className="bg-white text-purple-600 px-4 py-2 rounded-xl font-semibold shadow hover:bg-gray-100 transition mt-2"
                >
                  Login
                </Link>
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
      <motion.span
        whileHover={{ scale: 1.1 }}
        className="cursor-pointer hover:text-yellow-300 transition"
      >
        {label}
      </motion.span>
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
      <motion.span
        whileTap={{ scale: 0.95 }}
        className="cursor-pointer hover:text-yellow-300 transition text-lg"
      >
        {label}
      </motion.span>
    </Link>
  );
}
