import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls, Sparkles } from "@react-three/drei";
import { motion } from "framer-motion";
import { useRef, useState } from "react";

function Cake({ wished, onWish }) {
  const groupRef = useRef(null);
  const flameRef = useRef(null);

  useFrame((state) => {
    if (groupRef.current) groupRef.current.rotation.y += 0.004;
    if (flameRef.current) {
      flameRef.current.scale.setScalar((wished ? 1.55 : 1) + Math.sin(state.clock.elapsedTime * 8) * 0.08);
    }
  });

  return (
    <Float speed={1.4} rotationIntensity={0.25} floatIntensity={0.35}>
      <group ref={groupRef} onClick={onWish}>
        <mesh position={[0, -0.9, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[2.4, 2.6, 0.7, 72]} />
          <meshStandardMaterial color="#7b2f5b" roughness={0.45} metalness={0.05} />
        </mesh>
        <mesh position={[0, -0.42, 0]} castShadow>
          <cylinderGeometry args={[2.05, 2.15, 0.55, 72]} />
          <meshStandardMaterial color="#f8b5c8" roughness={0.38} />
        </mesh>
        <mesh position={[0, 0.02, 0]} castShadow>
          <cylinderGeometry args={[1.58, 1.72, 0.55, 72]} />
          <meshStandardMaterial color="#4b2144" roughness={0.4} />
        </mesh>
        {Array.from({ length: 18 }, (_, index) => {
          const angle = (index / 18) * Math.PI * 2;
          return (
            <mesh key={index} position={[Math.cos(angle) * 1.82, -0.13, Math.sin(angle) * 1.82]} castShadow>
              <sphereGeometry args={[0.1, 18, 18]} />
              <meshStandardMaterial color={index % 2 ? "#ffe08a" : "#ffffff"} emissive="#5f2b68" emissiveIntensity={0.25} />
            </mesh>
          );
        })}
        <mesh position={[0, 0.68, 0]} castShadow>
          <cylinderGeometry args={[0.1, 0.1, 0.78, 24]} />
          <meshStandardMaterial color="#fff1b8" />
        </mesh>
        <mesh ref={flameRef} position={[0, 1.16, 0]} castShadow>
          <sphereGeometry args={[0.17, 24, 24]} />
          <meshStandardMaterial color="#ffcf6b" emissive="#ff7a2f" emissiveIntensity={wished ? 3.6 : 2.2} />
        </mesh>
        <pointLight position={[0, 1.5, 0]} color="#ffc46b" intensity={wished ? 5 : 2.2} distance={6} />
      </group>
      <Sparkles count={wished ? 130 : 65} scale={5.2} size={3.2} speed={0.55} color="#ffe08a" />
    </Float>
  );
}

export default function Cake3D({ onWish }) {
  const [wished, setWished] = useState(false);

  const handleWish = () => {
    setWished(true);
    onWish();
  };

  return (
    <section className="section-panel split reveal" id="cake">
      <div>
        <p className="eyebrow">Make a wish</p>
        <h2>Tap the candle and let the room sparkle.</h2>
        <p className="section-copy">
          A rotating layered cake, glowing candle, soft shadows, and tiny golden particles create the first birthday ritual.
        </p>
      </div>
      <motion.div className="scene-frame" whileHover={{ scale: 1.015 }}>
        <Canvas camera={{ position: [0, 1.1, 6], fov: 42 }} shadows>
          <ambientLight intensity={0.6} />
          <directionalLight position={[4, 6, 3]} intensity={1.8} castShadow />
          <Cake wished={wished} onWish={handleWish} />
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.35} />
        </Canvas>
      </motion.div>
    </section>
  );
}
