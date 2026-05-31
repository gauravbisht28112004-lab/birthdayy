import { motion } from "framer-motion";
import { FaMagic } from "react-icons/fa";

export default function FinalCelebration({ celebrating, onCelebrate }) {
  return (
    <section className={`finale section-panel reveal ${celebrating ? "celebrating" : ""}`}>
      <p className="eyebrow">Grand finale</p>
      <h2>HAPPY BIRTHDAY MANNU</h2>
      <motion.button className="gold-button large" onClick={onCelebrate} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }}>
        <FaMagic />
        Celebrate Birthday
      </motion.button>
      <div className="finale-sky" aria-hidden="true">
        {Array.from({ length: 18 }, (_, index) => (
          <span
            key={index}
            style={{ "--i": index, "--left": `${(index * 31) % 100}%`, "--top": `${(index * 17) % 100}%` }}
          />
        ))}
      </div>
    </section>
  );
}
