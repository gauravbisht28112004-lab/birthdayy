import { motion } from "framer-motion";
import { useState } from "react";
import { FaGift } from "react-icons/fa";

export default function GiftBox() {
  const [open, setOpen] = useState(false);

  return (
    <section className="section-panel split reveal">
      <div>
        <p className="eyebrow">A tiny gift</p>
        <h2>Open it and a handwritten wish appears.</h2>
        <p className="section-copy">
          The box is intentionally tactile: ribbon movement, warm glow, and a paper card that unfolds like a keepsake.
        </p>
      </div>
      <div className={`gift-stage ${open ? "open" : ""}`}>
        <motion.button
          className="gift-box"
          onClick={() => setOpen(true)}
          whileHover={{ rotateY: 8, rotateX: -5, scale: 1.03 }}
          aria-label="Open birthday gift"
        >
          <span className="gift-lid" />
          <span className="gift-body" />
          <span className="gift-ribbon-x" />
          <span className="gift-ribbon-y" />
          <FaGift />
        </motion.button>
        <motion.article
          className="message-card"
          initial={false}
          animate={open ? { opacity: 1, y: -40, scale: 1 } : { opacity: 0, y: 40, scale: 0.85 }}
        >
          Thank you for being such a wonderful part of life. May your birthday be filled with happiness, laughter and
          unforgettable memories.
        </motion.article>
      </div>
    </section>
  );
}
