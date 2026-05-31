import { motion } from "framer-motion";

const memories = [
  ["The laugh that fixes ordinary days", "First sparkle"],
  ["Every little plan that became a story", "Best plans"],
  ["The kind of friendship that feels rare", "Rare heart"],
  ["More birthdays, more pictures, more magic", "Future memories"],
  ["A pocket full of moments worth keeping", "Golden days"],
  ["Mannu, glowing through every chapter", "Birthday glow"]
];

export default function MemoryGallery() {
  return (
    <section className="section-panel reveal">
      <p className="eyebrow">Memory gallery</p>
      <h2>Floating polaroids for the moments you will add.</h2>
      <div className="memory-grid">
        {memories.map(([caption, label], index) => (
          <motion.article
            className="polaroid"
            key={label}
            whileHover={{ y: -12, rotate: 0, scale: 1.04 }}
            style={{ "--tilt": `${index % 2 ? 4 : -5}deg`, "--delay": `${index * 0.18}s` }}
          >
            <div className="photo-placeholder">
              <span>{label}</span>
            </div>
            <p>{caption}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
