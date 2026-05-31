import { motion } from "framer-motion";
import { FaBirthdayCake, FaChevronDown, FaHeart } from "react-icons/fa";

export default function Hero({ onCelebrate }) {
  return (
    <section className="hero section-panel" id="top">
      <div className="floating-symbols" aria-hidden="true">
        {["♡", "✦", "✧", "🎈", "♡", "✦"].map((symbol, index) => (
          <motion.span
            key={`${symbol}-${index}`}
            animate={{ y: [-12, 18, -12], rotate: [-6, 8, -6] }}
            transition={{ duration: 4 + index, repeat: Infinity, ease: "easeInOut" }}
            style={{ "--x": `${10 + index * 16}%`, "--d": `${index * 0.6}s` }}
          >
            {symbol}
          </motion.span>
        ))}
      </div>

      <motion.p className="eyebrow" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
        A little universe made for
      </motion.p>
      <motion.h1
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        Happy Birthday
      </motion.h1>
      <motion.div
        className="typewriter"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.65 }}
      >
        To The Most Amazing Friend
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.15, duration: 0.9 }}
      >
        Mannu
      </motion.h2>
      <motion.button
        className="gold-button"
        onClick={onCelebrate}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.98 }}
        aria-label="Start birthday celebration"
      >
        <FaBirthdayCake />
        Begin The Celebration
        <FaHeart />
      </motion.button>
      <a className="scroll-cue" href="#cake" aria-label="Scroll to birthday cake">
        <FaChevronDown />
      </a>
    </section>
  );
}
