"use client";

import { motion } from "framer-motion";

export default function Clouds() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* CLOUD 1 */}
      <motion.div
        className="absolute top-20 left-[-200px] text-white text-7xl opacity-70"
        animate={{ x: ["0%", "120vw"] }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      >
        ☁️
      </motion.div>

      {/* CLOUD 2 */}
      <motion.div
        className="absolute top-40 left-[-250px] text-white text-6xl opacity-60"
        animate={{ x: ["0%", "120vw"] }}
        transition={{ duration: 75, repeat: Infinity, ease: "linear" }}
      >
        ☁️
      </motion.div>

      {/* CLOUD 3 */}
      <motion.div
        className="absolute top-64 left-[-300px] text-white text-8xl opacity-70"
        animate={{ x: ["0%", "120vw"] }}
        transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
      >
        ☁️
      </motion.div>

      {/* CLOUD 4 */}
      <motion.div
        className="absolute bottom-40 left-[-200px] text-white text-7xl opacity-60"
        animate={{ x: ["0%", "120vw"] }}
        transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
      >
        ☁️
      </motion.div>
    </div>
  );
}
