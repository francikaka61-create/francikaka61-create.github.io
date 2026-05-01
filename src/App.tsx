/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, Suspense } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Float, MeshDistortMaterial } from '@react-three/drei';
import { Trophy, Star, Shield, Zap, Settings, Menu, Info, Users, Gift } from 'lucide-react';

// --- 3D Fighter Component ---
function BrawlerModel() {
  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
      <group rotation={[0, Math.PI / 4, 0]}>
        {/* Main Body */}
        <mesh>
          <sphereGeometry args={[1.5, 64, 64]} />
          <MeshDistortMaterial
            color="#FFCE00"
            speed={3}
            distort={0.1}
            radius={1}
            metalness={0.1}
            roughness={0.8}
          />
        </mesh>
        
        {/* Face Group */}
        <group position={[0, 0, 0.4]}>
          {/* Eyes */}
          <mesh position={[0.5, 0.4, 1.1]}>
            <sphereGeometry args={[0.2, 16, 16]} />
            <meshBasicMaterial color="black" />
          </mesh>
          <mesh position={[-0.5, 0.4, 1.1]}>
            <sphereGeometry args={[0.2, 16, 16]} />
            <meshBasicMaterial color="black" />
          </mesh>
          
          {/* Grin */}
          <mesh position={[0, 0, 1.2]} rotation={[0.4, 0, 0]}>
            <torusGeometry args={[0.3, 0.05, 16, 32, Math.PI]} />
            <meshBasicMaterial color="black" />
          </mesh>
        </group>

        {/* Shadow Plane */}
        <mesh position={[0, -1.8, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[1.8, 32]} />
          <meshBasicMaterial color="black" transparent opacity={0.3} />
        </mesh>
      </group>
    </Float>
  );
}

// --- Loading Screen Component ---
function LoadingScreen({ onFinish }: { onFinish: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onFinish, 500); // Small delay after 100%
          return 100;
        }
        return prev + Math.random() * 5;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [onFinish]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-blue-600"
      style={{
        background: 'radial-gradient(circle, #0076FF 0%, #00367C 100%)',
      }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="mb-12 text-center"
      >
        <h1 className="brawl-text text-6xl text-yellow-400">BRAWL</h1>
        <h2 className="brawl-text text-4xl text-white">STUDIO</h2>
      </motion.div>

      <div className="w-64 h-6 border-4 border-black bg-white rounded-full overflow-hidden shadow-[4px_4px_0px_rgba(0,0,0,0.2)]">
        <motion.div
          className="h-full bg-yellow-400"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
        />
      </div>
      <p className="mt-4 text-white font-bold tracking-widest text-sm drop-shadow-md">
        LOADING... {Math.round(progress)}%
      </p>

      {/* Decorative dots */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full"
            style={{
              width: Math.random() * 20 + 5 + 'px',
              height: Math.random() * 20 + 5 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}

// --- Main App Component ---
export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#0F1123] font-sans text-white">
      <AnimatePresence>
        {loading && <LoadingScreen onFinish={() => setLoading(false)} />}
      </AnimatePresence>

      {/* Main Menu UI */}
      <div className="relative z-10 w-full h-full flex flex-col pointer-events-none">
        
        {/* Top Bar */}
        <header className="p-6 flex justify-between items-start pointer-events-auto">
          {/* Player Profile */}
          <div className="flex items-center bg-black/60 rounded-full p-1.5 pr-6 border-3 border-[#2A2E45] shadow-lg">
            <div className="w-12 h-12 bg-[#FFD200] rounded-full border-3 border-white flex items-center justify-center text-black font-display text-2xl">
              S
            </div>
            <div className="ml-4">
              <div className="font-display text-lg leading-none tracking-wide text-white uppercase">Super_User</div>
              <div className="text-[#FFD200] font-bold text-xs uppercase tracking-wider">Level 42</div>
            </div>
          </div>
          
          {/* Currency Group */}
          <div className="flex gap-4">
            <div className="flex h-10 items-center bg-black/60 rounded-lg px-4 border-2 border-[#FFD200] font-display text-lg min-w-[120px]">
              <span className="mr-2">🪙</span> 12,450
            </div>
            <div className="flex h-10 items-center bg-black/60 rounded-lg px-4 border-2 border-[#00FF90] font-display text-lg min-w-[100px]">
              <span className="mr-2">💎</span> 84
            </div>
            <div className="flex h-10 items-center bg-black/60 rounded-lg px-4 border-2 border-[#333] font-display text-lg">
              <Star className="w-4 h-4 text-purple-400 mr-2" /> 2,100
            </div>
          </div>
        </header>

        {/* Sidebar */}
        <div className="absolute left-6 top-32 flex flex-col gap-6 pointer-events-auto">
          <button className="gaming-card w-28 h-28 flex flex-col justify-center items-center -rotate-2">
            <div className="text-4xl mb-1">🛒</div>
            <span className="text-[10px] uppercase font-bold tracking-[2px] opacity-80">Shop</span>
          </button>
          <button className="gaming-card w-28 h-28 flex flex-col justify-center items-center rotate-2">
            <div className="text-4xl mb-1">🥊</div>
            <span className="text-[10px] uppercase font-bold tracking-[2px] opacity-80">Brawlers</span>
          </button>
          <button className="gaming-card w-28 h-28 flex flex-col justify-center items-center -rotate-1">
            <div className="text-4xl mb-1">🏆</div>
            <span className="text-[10px] uppercase font-bold tracking-[2px] opacity-80">Trophies</span>
          </button>
        </div>

        {/* Character Info (Floating above pedestal) */}
        <div className="flex-1 flex flex-col items-center justify-end pb-48 pointer-events-none">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center z-20"
          >
            <div className="bg-[#FFD200] text-black px-4 py-0.5 rounded font-bold text-xs inline-block mb-2">RANK 25</div>
            <h1 className="brawl-text text-7xl uppercase tracking-widest italic">TANK-BOT</h1>
          </motion.div>
        </div>

        {/* Bottom Controls */}
        <footer className="p-8 flex justify-end items-end gap-6 pointer-events-auto">
          {/* Mode Selector */}
          <div className="w-64 h-24 bg-gradient-to-b from-[#4B0082] to-[#2E004F] border-4 border-[#7B2CBF] rounded-2xl p-6 flex flex-col justify-center shadow-[0_8px_0_#1A002E]">
            <div className="text-xl font-display uppercase italic text-white leading-tight">Brawl Ball</div>
            <div className="text-[#B197FC] text-sm font-bold uppercase tracking-tighter">Backyard Bowl</div>
          </div>

          {/* Play Button */}
          <button 
            className="play-btn w-64 h-28 rounded-[25px] flex items-center justify-center -rotate-1"
            onClick={() => console.log('Play button is non-functional')}
          >
            <span className="brawl-text text-5xl italic text-black uppercase tracking-tighter shadow-none">PLAY</span>
          </button>
        </footer>
      </div>

      {/* 3D Scene Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div 
          className="absolute inset-0" 
          style={{ background: 'radial-gradient(circle at 50% 50%, #242A5E 0%, #0F1123 100%)' }}
        ></div>
        
        {/* Stage Pedestal Shadow */}
        <div className="absolute bottom-[100px] left-1/2 -translate-x-1/2 w-[400px] h-[60px] bg-black/40 rounded-[50%] blur-xl"></div>

        <Canvas shadows gl={{ antialias: true }}>
          <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />
          <ambientLight intensity={1.2} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1.5} castShadow />
          <pointLight position={[-10, -10, -10]} intensity={0.5} />
          
          <Suspense fallback={null}>
            <BrawlerModel />
          </Suspense>

          <OrbitControls 
            enablePan={false} 
            enableZoom={false} 
            minPolarAngle={Math.PI / 2.5} 
            maxPolarAngle={Math.PI / 1.5}
          />
        </Canvas>
      </div>

      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_200px_rgba(0,0,0,0.7)]"></div>
    </div>
  );
}
