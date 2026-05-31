import { motion } from "framer-motion";
import { useState } from "react";
import { FaEnvelopeOpenText, FaGem, FaHeart, FaStar } from "react-icons/fa";
import { GiTreasureMap } from "react-icons/gi";

const steps = [
  {
    icon: FaEnvelopeOpenText,
    title: "Envelope",
    message: "Today is your special day and I wanted to make something special for you."
  },
  { icon: FaHeart, title: "Heart", message: "You deserve all the happiness in the world." },
  { icon: FaStar, title: "Star", message: "May every wish you make today come true." },
  { icon: GiTreasureMap, title: "Treasure", message: "A treasure of beautiful memories and future adventures." },
  { icon: FaGem, title: "Final Wish", message: "May all your dreams come true." }
];

export default function BirthdayJourney({ onFinalWish }) {
  const [active, setActive] = useState(0);

  const reveal = (index) => {
    setActive(index);
    if (index === steps.length - 1) onFinalWish();
  };

  return (
    <section className="section-panel reveal">
      <p className="eyebrow">Birthday journey</p>
      <h2>Five little doors, one warm wish at a time.</h2>
      <div className="journey-grid">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const selected = active === index;
          return (
            <motion.button
              className={`journey-step ${selected ? "selected" : ""}`}
              key={step.title}
              onClick={() => reveal(index)}
              whileHover={{ y: -8 }}
              aria-label={`Open ${step.title}`}
            >
              <Icon />
              <span>{step.title}</span>
            </motion.button>
          );
        })}
      </div>
      <motion.article
        className="journey-message"
        key={active}
        initial={{ opacity: 0, y: 20, rotateX: -12 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
      >
        {steps[active].message}
      </motion.article>
    </section>
  );
}
