import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { FaGift, FaHeart, FaMusic, FaPause, FaPlay } from "react-icons/fa";
import "./styles.css";

const wishes = [
  "May your smile stay as effortless as morning light.",
  "May love find you in small, ordinary moments.",
  "May this year be gentle, bright, and beautifully yours."
];

const memories = [
  "For every laugh that stayed longer than the moment.",
  "For the kindness you carry without making noise.",
  "For the way your presence makes life feel lighter."
];

function HeartRain({ count = 36 }) {
  return (
    <div className="heart-rain" aria-hidden="true">
      {Array.from({ length: count }, (_, index) => (
        <span
          key={index}
          style={{
            "--left": `${(index * 29) % 100}%`,
            "--delay": `${(index % 12) * -0.55}s`,
            "--duration": `${4.6 + (index % 7) * 0.45}s`,
            "--size": `${0.55 + (index % 5) * 0.12}rem`
          }}
        >
          <FaHeart />
        </span>
      ))}
    </div>
  );
}

export default function App() {
  const [musicOn, setMusicOn] = useState(false);
  const [audioContext, setAudioContext] = useState(null);
  const [giftOpen, setGiftOpen] = useState(false);
  const [memoryGiftOpen, setMemoryGiftOpen] = useState(false);
  const [finalMessageOpen, setFinalMessageOpen] = useState(false);
  const [heartSlideOpen, setHeartSlideOpen] = useState(false);
  const melodyTimerRef = useRef(null);
  const gainRef = useRef(null);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      window.clearTimeout(melodyTimerRef.current);
    };
  }, []);

  const playBirthdayMelody = (context, gain) => {
    const melody = [
      [392, 0.28],
      [392, 0.28],
      [440, 0.56],
      [392, 0.56],
      [523.25, 0.56],
      [493.88, 1.05],
      [392, 0.28],
      [392, 0.28],
      [440, 0.56],
      [392, 0.56],
      [587.33, 0.56],
      [523.25, 1.05],
      [392, 0.28],
      [392, 0.28],
      [784, 0.56],
      [659.25, 0.56],
      [523.25, 0.56],
      [493.88, 0.56],
      [440, 1.1]
    ];

    let startAt = context.currentTime + 0.05;
    melody.forEach(([frequency, duration]) => {
      const oscillator = context.createOscillator();
      const noteGain = context.createGain();
      oscillator.type = "triangle";
      oscillator.frequency.value = frequency;
      noteGain.gain.setValueAtTime(0, startAt);
      noteGain.gain.linearRampToValueAtTime(0.18, startAt + 0.025);
      noteGain.gain.exponentialRampToValueAtTime(0.001, startAt + duration);
      oscillator.connect(noteGain);
      noteGain.connect(gain);
      oscillator.start(startAt);
      oscillator.stop(startAt + duration + 0.04);
      startAt += duration;
    });

    return (startAt - context.currentTime + 0.4) * 1000;
  };

  const startSoftMusic = async () => {
    if (musicOn && audioContext) {
      window.clearTimeout(melodyTimerRef.current);
      if (gainRef.current) gainRef.current.gain.setTargetAtTime(0, audioContext.currentTime, 0.03);
      window.setTimeout(() => audioContext.suspend(), 80);
      setMusicOn(false);
      return;
    }

    if (audioContext) {
      await audioContext.resume();
      if (gainRef.current) gainRef.current.gain.setTargetAtTime(0.13, audioContext.currentTime, 0.04);
      const loopMelody = () => {
        const nextDelay = playBirthdayMelody(audioContext, gainRef.current);
        melodyTimerRef.current = window.setTimeout(loopMelody, nextDelay);
      };
      loopMelody();
      setMusicOn(true);
      return;
    }

    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const context = new AudioContext();
    const gain = context.createGain();
    gain.gain.value = 0.13;
    gain.connect(context.destination);

    gainRef.current = gain;
    const loopMelody = () => {
      const nextDelay = playBirthdayMelody(context, gain);
      melodyTimerRef.current = window.setTimeout(loopMelody, nextDelay);
    };
    loopMelody();
    setAudioContext(context);
    setMusicOn(true);
  };

  const sendLove = () => {
    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.7 },
      colors: ["#f7b7c8", "#f5d78e", "#ffffff", "#c7a6ff"]
    });
  };

  const openGift = () => {
    setGiftOpen(true);
    confetti({
      particleCount: 70,
      spread: 58,
      origin: { y: 0.62 },
      colors: ["#f7b7c8", "#f5d78e", "#ffffff", "#c7a6ff"]
    });
  };

  const openMemoryGift = () => {
    setMemoryGiftOpen(true);
    confetti({
      particleCount: 60,
      spread: 52,
      origin: { y: 0.66 },
      colors: ["#f7b7c8", "#f5d78e", "#ffffff", "#c7a6ff"]
    });
  };

  const openHeartSlide = () => {
    setHeartSlideOpen(true);
    confetti({
      particleCount: 80,
      spread: 65,
      origin: { y: 0.7 },
      colors: ["#f7b7c8", "#f5d78e", "#ffffff", "#c7a6ff"]
    });
  };

  return (
    <main className="soft-page">
      <div className="soft-backdrop" aria-hidden="true" />

      <button className="music-toggle" onClick={startSoftMusic} aria-label={musicOn ? "Pause music" : "Play music"}>
        <FaMusic />
        {musicOn ? <FaPause /> : <FaPlay />}
      </button>

      <section className="hero-love">
        <motion.div
          className="photo-frame"
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          aria-label="Mannu photo frame"
        />
        <motion.p className="small-line" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
          A birthday note for
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          Mannu
        </motion.h1>
        <motion.p
          className="hero-message"
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          Happy Birthday to someone who makes life feel warmer, softer, and more beautiful just by being in it.
        </motion.p>
        <motion.a
          className="primary-link"
          href="#letter"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.65 }}
        >
          Read your note
        </motion.a>
      </section>

      <section className="letter-section" id="letter">
        <motion.article
          className="letter-card"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.7 }}
        >
          <HeartRain count={28} />
          <span>Dear Mannu,</span>
          <p>
            I did not want this to feel like just another birthday wish. I wanted it to feel like a quiet little place
            made only for you, filled with warmth, care, and the kind of happiness you deserve.
          </p>
          <p>
            Thank you for being such a wonderful part of life. May your birthday be filled with laughter, peace, sweet
            surprises, and memories that stay close to your heart for a long time.
          </p>
          <strong>Happy Birthday, Mannu.</strong>
        </motion.article>
      </section>

      <section className="gift-section">
        <p className="small-line">One small gift</p>
        <motion.div
          className={`gift-wrap ${giftOpen ? "opened" : ""}`}
          initial={{ opacity: 0, y: 34 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
        >
          <div className="gift-copy">
            <h2>A song for the feeling.</h2>
            <p>
              Open this little gift and let <strong>her</strong> by JVKE play, because some songs say the soft things
              words cannot hold.
            </p>
            {!giftOpen && (
              <button className="gift-button" onClick={openGift}>
                <FaGift />
                Open gift
              </button>
            )}
          </div>

          <button className="gift-box-simple" onClick={openGift} aria-label="Open song gift">
            <span className="gift-lid" />
            <span className="gift-body" />
            <span className="gift-ribbon-vertical" />
            <span className="gift-ribbon-horizontal" />
            <FaGift />
          </button>

          {giftOpen && (
            <motion.div
              className="video-card"
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <HeartRain count={34} />
              <iframe
                title="JVKE - her official lyric video"
                src="https://www.youtube.com/embed/f5-IY_Ja1RM?autoplay=1&rel=0&modestbranding=1"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </motion.div>
          )}
        </motion.div>
      </section>

      <section className="gift-section">
        <p className="small-line">One more gift</p>
        <motion.div
          className={`gift-wrap memory-gift ${memoryGiftOpen ? "opened" : ""}`}
          initial={{ opacity: 0, y: 34 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
        >
          <div className="gift-copy">
            <h2>A memory made by me.</h2>
            <p>
              This one is not from the internet. It is edited by me, kept here like a small memory you can open whenever
              you want to feel the moment again.
            </p>
            {!memoryGiftOpen && (
              <button className="gift-button" onClick={openMemoryGift}>
                <FaGift />
                Open this gift
              </button>
            )}
          </div>

          <button className="gift-box-simple lavender-gift" onClick={openMemoryGift} aria-label="Open edited video gift">
            <span className="gift-lid" />
            <span className="gift-body" />
            <span className="gift-ribbon-vertical" />
            <span className="gift-ribbon-horizontal" />
            <FaGift />
          </button>

          {memoryGiftOpen && (
            <motion.div
              className="video-card personal-video-card"
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <HeartRain count={34} />
              <video src="/edited-gift.mp4" controls autoPlay playsInline />
            </motion.div>
          )}
        </motion.div>
      </section>

      <section className="simple-section">
        <p className="small-line">Little things I hope for you</p>
        <div className="wish-grid">
          {wishes.map((wish, index) => (
            <motion.article
              className="wish-card"
              key={wish}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
            >
              <FaHeart />
              <p>{wish}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="simple-section memory-section">
        <p className="small-line">Because some people become memories before moments end</p>
        <div className="memory-list">
          {memories.map((memory) => (
            <motion.div
              className="memory-row"
              key={memory}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              {memory}
            </motion.div>
          ))}
        </div>
      </section>

      <section className="final-note">
        {!finalMessageOpen ? (
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="small-line">Last little thing</p>
            <h2>Open this.</h2>
            <p>There is one message I wanted to keep for the end.</p>
            <button className="primary-link as-button" onClick={() => setFinalMessageOpen(true)}>
              Open this
            </button>
          </motion.div>
        ) : (
          <motion.article
            className="final-message-card"
            initial={{ opacity: 0, y: 26, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <HeartRain count={30} />
            <span>For you, Mannu</span>
            <p>
              I know we are apart, and I know things have not worked the way we once wished they would. But you are
              still really close to my heart, in every way, and especially as a friend.
            </p>
            <p>
              On your birthday, I just hope we can make things a little normal again, slowly and honestly. Maybe
              something small from your side, whenever your heart feels ready.
            </p>
            <strong>Happy Birthday. You still matter to me.</strong>
            <button className="primary-link as-button" onClick={sendLove}>
              Send birthday love
            </button>
          </motion.article>
        )}
      </section>

      <section className="heart-ending">
        {!heartSlideOpen ? (
          <motion.div
            className="heart-invitation"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="small-line">From my heart</p>
            <button className="heart-button" onClick={openHeartSlide} aria-label="Open message from my heart">
              <FaHeart />
            </button>
            <p>Click the heart.</p>
          </motion.div>
        ) : (
          <motion.article
            className="heart-slide"
            initial={{ opacity: 0, y: 34, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7 }}
          >
            <HeartRain count={42} />
            <span>From my heart</span>
            <p>I don't know when we'll meet again...</p>
            <p>Or maybe we never will.</p>
            <p>But one thing is still true today —</p>
            <p>The peace I felt with you, I never found with anyone else.</p>
            <p>Everyone says our story has ended...</p>
            <p>But deep inside, I feel there are still pages left unwritten.</p>
            <p>Some people become memories, yet somehow they never stop living in our hearts.</p>
            <p>And no matter how far life takes us, a part of me will always smile when I think of you.</p>
            <strong>Happy Birthday, Mannu ❤️</strong>
            <p>May your life be filled with happiness, love, and beautiful moments.</p>
            <p className="last-line">
              But in the end, I will see you with someone else, but you will see me with everything I told you I'd have.
            </p>
          </motion.article>
        )}
      </section>
    </main>
  );
}
