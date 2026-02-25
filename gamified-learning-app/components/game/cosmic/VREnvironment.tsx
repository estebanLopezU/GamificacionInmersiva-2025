"use client";
import React, { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { EffectComposer, Bloom, ChromaticAberration, Vignette } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import * as THREE from 'three';

// Import all cosmic components
import CosmicPlanet from './CosmicPlanet';
import { StarField, TwinklingStars, ShootingStars } from './StarField';
import { Galaxy, Nebula, GalaxyCluster } from './Galaxy';
import { MeteorShower, LargeMeteor, AsteroidField } from './MeteorShower';
import { LayeredMountains } from './Mountains';
import { NeonCity, NeonSigns, HolographicDisplays, FlyingVehicles } from './NeonCity';
import { FloatingParticles, Fireflies, EnergyOrbs } from './FloatingParticles';
import { CosmicSky, VolumetricLight, CelestialBody, CosmicLighting } from './CosmicSky';

// Loading component
const LoadingScreen: React.FC = () => (
  <div className="absolute inset-0 flex items-center justify-center bg-black z-50">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-cyan-400 font-mono text-sm tracking-widest uppercase">
        Inicializando Universo...
      </p>
    </div>
  </div>
);

// Post-processing effects
const PostProcessing: React.FC = () => {
  return (
    <EffectComposer>
      <Bloom
        intensity={1.5}
        luminanceThreshold={0.2}
        luminanceSmoothing={0.9}
        mipmapBlur
      />
      <ChromaticAberration
        blendFunction={BlendFunction.NORMAL}
        offset={[0.0005, 0.0005]}
      />
      <Vignette
        offset={0.3}
        darkness={0.9}
        blendFunction={BlendFunction.NORMAL}
      />
    </EffectComposer>
  );
};

// Main scene content
const CosmicScene: React.FC = () => {
  return (
    <>
      {/* Sky and atmosphere */}
      <CosmicSky
        topColor="#050010"
        middleColor="#1a0a3e"
        bottomColor="#ff6b35"
        sunColor="#ff9500"
      />
      
      {/* Lighting */}
      <CosmicLighting
        sunsetIntensity={0.6}
        ambientIntensity={0.2}
      />
      
      {/* Giant planet with atmospheric shader */}
      <CosmicPlanet
        position={[15, 8, -30]}
        size={8}
        coreColor="#4a1a6b"
        glowColor="#ff6b9d"
      />
      
      {/* Stars */}
      <StarField count={5000} size={0.02} spread={100} />
      <TwinklingStars count={300} />
      <ShootingStars count={15} />
      
      {/* Galaxies and nebulae */}
      <Galaxy
        position={[-30, 15, -50]}
        particleCount={2000}
        color1="#ff6b9d"
        color2="#6b9dff"
      />
      <Nebula position={[20, 5, -40]} color="#9d4edd" size={25} />
      <GalaxyCluster count={8} />
      
      {/* Meteors */}
      <MeteorShower count={12} active={true} />
      <LargeMeteor position={[40, 25, -10]} delay={5} />
      <AsteroidField count={30} />
      
      {/* Mountains */}
      <LayeredMountains basePosition={[0, -2, 0]} />
      
      {/* Neon city */}
      <NeonCity position={[0, -2, -15]} buildingCount={25} />
      <NeonSigns position={[0, 0, -10]} />
      <HolographicDisplays position={[0, 0, 0]} />
      <FlyingVehicles count={6} />
      
      {/* Floating particles */}
      <FloatingParticles
        count={800}
        size={0.04}
        spread={40}
        colors={['#ff6b9d', '#6b9dff', '#00ffff', '#ff00ff']}
        speed={0.3}
      />
      <Fireflies count={50} />
      <EnergyOrbs count={15} />
      
      {/* Celestial bodies */}
      <CelestialBody
        position={[30, 8, -60]}
        size={4}
        color="#ffcc00"
        glowColor="#ff9500"
        type="sun"
      />
      
      {/* Volumetric light rays */}
      <VolumetricLight
        position={[25, 5, -40]}
        color="#ff9500"
        intensity={1}
      />
      
      {/* Fog for depth */}
      <fog attach="fog" args={['#0a0515', 30, 120]} />
    </>
  );
};

// Main VR Environment component
interface VREnvironmentProps {
  enableVR?: boolean;
  showVRButton?: boolean;
}

const VREnvironment: React.FC<VREnvironmentProps> = ({
  enableVR = true,
  showVRButton = true
}) => {
  const [loading, setLoading] = useState(true);
  const [vrSupported, setVrSupported] = useState(false);

  useEffect(() => {
    // Check VR support
    if (typeof navigator !== 'undefined' && 'xr' in navigator) {
      (navigator as any).xr?.isSessionSupported?.('immersive-vr')?.then?.((supported: boolean) => {
        setVrSupported(supported);
      });
    }
    
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const enterVR = async () => {
    if (typeof navigator !== 'undefined' && 'xr' in navigator) {
      try {
        const session = await (navigator as any).xr.requestSession('immersive-vr');
        // VR session started
        console.log('VR Session started:', session);
      } catch (error) {
        console.error('VR Session error:', error);
      }
    }
  };

  return (
    <div className="fixed inset-0 -z-10 bg-black overflow-hidden">
      {loading && <LoadingScreen />}
      
      {/* VR Button */}
      {enableVR && showVRButton && vrSupported && (
        <button
          onClick={enterVR}
          className="absolute top-4 right-4 z-20 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-lg hover:scale-105 transition-transform shadow-lg shadow-purple-500/30"
        >
          🥽 Entrar a VR
        </button>
      )}
      
      {/* Main Canvas */}
      <Canvas
        camera={{
          position: [0, 2, 10],
          fov: 75,
          near: 0.1,
          far: 200
        }}
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2
        }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <CosmicScene />
        </Suspense>
        
        {/* Post-processing effects */}
        <PostProcessing />
      </Canvas>
      
      {/* Gradient overlays for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_80%)] opacity-40 pointer-events-none" />
      
      {/* Info overlay */}
      <div className="absolute bottom-4 left-4 z-10 text-white/50 text-xs font-mono">
        <p>🎮 Controles: Click y arrastra para rotar | Scroll para zoom</p>
        <p>🥽 VR: Compatible con dispositivos WebXR</p>
      </div>
    </div>
  );
};

export default VREnvironment;