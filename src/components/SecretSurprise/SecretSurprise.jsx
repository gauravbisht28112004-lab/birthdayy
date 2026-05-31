import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { FaLockOpen } from "react-icons/fa";

function Portal() {
  const portalRef = useRef(null);

  useFrame(() => {
    if (portalRef.current) portalRef.current.rotation.z += 0.01;
  });

  return (
    <Float floatIntensity={0.5}>
      <group ref={portalRef}>
        <mesh>
          <torusGeometry args={[1.25, 0.08, 22, 140]} />
          <meshStandardMaterial color="#ff9ac2" emissive="#a953ff" emissiveIntensity={1.8} />
        </mesh>
        <mesh rotation={[0.5, 0.1, 0.3]}>
          <torusGeometry args={[0.88, 0.04, 18, 140]} />
          <meshStandardMaterial color="#ffe08a" emissive="#ffb443" emissiveIntensity={2.1} />
        </mesh>
        <Sparkles count={120} scale={3.2} size={4} speed={0.9} color="#fff0b8" />
      </group>
    </Float>
  );
}

export default function SecretSurprise() {
  const [unlocked, setUnlocked] = useState(false);

  return (
    <section className={`section-panel secret reveal ${unlocked ? "unlocked" : ""}`}>
      <p className="eyebrow">Secret surprise</p>
      <h2>A hidden message behind a little portal.</h2>
      <motion.button className="gold-button" onClick={() => setUnlocked(true)} whileTap={{ scale: 0.98 }}>
        <FaLockOpen />
        Unlock Secret Surprise
      </motion.button>
      <div className="portal-scene">
        <Canvas camera={{ position: [0, 0, 4.2], fov: 48 }}>
          <ambientLight intensity={0.8} />
          <pointLight position={[2, 2, 2]} intensity={2.5} color="#ffe08a" />
          <Portal />
        </Canvas>
      </div>
      {unlocked && (
        <motion.article className="secret-card" initial={{ opacity: 0, scale: 0.88 }} animate={{ opacity: 1, scale: 1 }}>
          Mannu, your friendship makes life softer, brighter, and more beautiful. May this birthday bring you the exact
          kind of happiness your heart has been quietly wishing for.
        </motion.article>
      )}
    </section>
  );
}
