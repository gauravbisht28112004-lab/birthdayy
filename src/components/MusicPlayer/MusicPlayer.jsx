import { useEffect, useRef, useState } from "react";
import { FaPause, FaPlay, FaVolumeMute, FaVolumeUp } from "react-icons/fa";

export default function MusicPlayer({ celebrateSignal }) {
  const audioRef = useRef(null);
  const gainRef = useRef(null);
  const oscRef = useRef([]);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(0.22);

  const createAudio = () => {
    if (audioRef.current) return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const context = new AudioContext();
    const gain = context.createGain();
    gain.gain.value = volume;
    gain.connect(context.destination);

    const notes = [261.63, 329.63, 392, 523.25];
    oscRef.current = notes.map((frequency, index) => {
      const osc = context.createOscillator();
      const noteGain = context.createGain();
      osc.type = index % 2 ? "triangle" : "sine";
      osc.frequency.value = frequency;
      noteGain.gain.value = 0.045 / (index + 1);
      osc.connect(noteGain);
      noteGain.connect(gain);
      osc.start();
      return osc;
    });

    audioRef.current = context;
    gainRef.current = gain;
  };

  const play = async () => {
    createAudio();
    await audioRef.current.resume();
    setPlaying(true);
  };

  const pause = async () => {
    if (!audioRef.current) return;
    await audioRef.current.suspend();
    setPlaying(false);
  };

  useEffect(() => {
    if (!gainRef.current) return;
    gainRef.current.gain.setTargetAtTime(muted ? 0 : volume, audioRef.current.currentTime, 0.04);
  }, [muted, volume]);

  useEffect(() => {
    if (celebrateSignal) {
      play();
      setVolume(0.38);
    }
  }, [celebrateSignal]);

  return (
    <aside className="music-player" aria-label="Birthday music controls">
      <button onClick={playing ? pause : play} aria-label={playing ? "Pause music" : "Play music"}>
        {playing ? <FaPause /> : <FaPlay />}
      </button>
      <button onClick={() => setMuted((value) => !value)} aria-label={muted ? "Unmute music" : "Mute music"}>
        {muted ? <FaVolumeMute /> : <FaVolumeUp />}
      </button>
      <input
        aria-label="Music volume"
        type="range"
        min="0"
        max="0.6"
        step="0.01"
        value={volume}
        onChange={(event) => setVolume(Number(event.target.value))}
      />
    </aside>
  );
}
