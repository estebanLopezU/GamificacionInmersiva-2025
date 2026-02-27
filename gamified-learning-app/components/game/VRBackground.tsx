"use client";
import React, { useEffect, useState, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Sphere, Box } from '@react-three/drei';
import * as THREE from 'three';

// ============ ANIMATED STARS ============
const AnimatedStars: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.02;
      groupRef.current.rotation.x += delta * 0.01;
    }
  });
  
  return (
    <group ref={groupRef}>
      <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={0.5} />
    </group>
  );
};

// ============ FLOATING PARTICLES ============
const FloatingParticles: React.FC = () => {
  const meshRef = useRef<THREE.Points>(null);
  
  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(500 * 3);
    const col = new Float32Array(500 * 3);
    const colorOptions = [
      new THREE.Color('#ff6b9d'),
      new THREE.Color('#6b9dff'),
      new THREE.Color('#00ffff'),
      new THREE.Color('#ff00ff'),
      new THREE.Color('#ffcc00')
    ];
    
    for (let i = 0; i < 500; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 60;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 60;
      
      const color = colorOptions[Math.floor(Math.random() * colorOptions.length)];
      col[i * 3] = color.r;
      col[i * 3 + 1] = color.g;
      col[i * 3 + 2] = color.b;
    }
    
    return [pos, col];
  }, []);
  
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime();
      meshRef.current.rotation.y = time * 0.02;
      meshRef.current.rotation.x = Math.sin(time * 0.1) * 0.1;
    }
  });
  
  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        vertexColors
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

// ============ GIANT PLANET WITH ATMOSPHERE ============
const GiantPlanet: React.FC = () => {
  // Planet is now static - no animation
  
  return (
    <group position={[20, 12, -50]}>
      {/* Planet core */}
      <mesh>
        <sphereGeometry args={[12, 64, 64]} />
        <meshStandardMaterial 
          color="#4a1a6b" 
          emissive="#2a0a4b" 
          emissiveIntensity={0.5}
          roughness={0.8}
          metalness={0.2}
        />
      </mesh>
      
      {/* Inner atmosphere glow */}
      <mesh>
        <sphereGeometry args={[13, 32, 32]} />
        <meshBasicMaterial
          color="#ff6b9d"
          transparent
          opacity={0.2}
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
        />
      </mesh>
      
      {/* Outer atmosphere */}
      <mesh>
        <sphereGeometry args={[15, 32, 32]} />
        <meshBasicMaterial
          color="#9d4edd"
          transparent
          opacity={0.1}
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
        />
      </mesh>
      
      {/* Planetary ring */}
      <mesh rotation={[Math.PI / 3, 0, 0]}>
        <ringGeometry args={[16, 24, 64]} />
        <meshBasicMaterial
          color="#ff9ed2"
          transparent
          opacity={0.4}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
};

// ============ MOUNTAIN SILHOUETTES ============
const MountainSilhouette: React.FC<{ z: number; color: string; height: number; opacity: number }> = ({ z, color, height, opacity }) => {
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const vertices: number[] = [];
    const indices: number[] = [];
    const segments = 80;
    const width = 200;
    
    for (let i = 0; i <= segments; i++) {
      const x = (i / segments - 0.5) * width;
      const h = Math.abs(
        Math.sin(i * 0.15) * 0.5 + 
        Math.sin(i * 0.35 + 1) * 0.3 + 
        Math.sin(i * 0.08) * 0.2
      ) * height;
      vertices.push(x, h, 0);
      vertices.push(x, -20, 0);
    }
    
    for (let i = 0; i < segments; i++) {
      indices.push(i * 2, i * 2 + 1, (i + 1) * 2);
      indices.push((i + 1) * 2, i * 2 + 1, (i + 1) * 2 + 1);
    }
    
    geo.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geo.setIndex(indices);
    geo.computeVertexNormals();
    
    return geo;
  }, [height]);
  
  return (
    <mesh position={[0, -5, z]} geometry={geometry}>
      <meshBasicMaterial color={color} transparent opacity={opacity} side={THREE.DoubleSide} />
    </mesh>
  );
};

const Mountains: React.FC = () => {
  return (
    <group>
      <MountainSilhouette z={-80} color="#050010" height={10} opacity={1} />
      <MountainSilhouette z={-70} color="#0a0515" height={12} opacity={0.95} />
      <MountainSilhouette z={-60} color="#0f0a20" height={14} opacity={0.9} />
      <MountainSilhouette z={-50} color="#150a2a" height={16} opacity={0.85} />
      <MountainSilhouette z={-40} color="#1a0f35" height={18} opacity={0.8} />
    </group>
  );
};

// ============ ANIMATED WINDOW ============
const AnimatedWindow: React.FC<{ 
  position: [number, number, number]; 
  initialColor: string;
  initialOpacity: number;
  flickerSpeed: number;
  flickerOffset: number;
}> = ({ position, initialColor, initialOpacity, flickerSpeed, flickerOffset }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshBasicMaterial>(null);
  
  useFrame((state) => {
    if (materialRef.current) {
      const time = state.clock.getElapsedTime();
      // Create subtle flickering effect
      const flicker = Math.sin(time * flickerSpeed + flickerOffset) * 0.3 + 0.7;
      const randomFlicker = Math.random() > 0.995 ? 0.2 : 1; // Occasional random dim
      materialRef.current.opacity = initialOpacity * flicker * randomFlicker;
    }
  });
  
  return (
    <mesh ref={meshRef} position={position}>
      <planeGeometry args={[0.4, 0.8]} />
      <meshBasicMaterial
        ref={materialRef}
        color={initialColor}
        transparent
        opacity={initialOpacity}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
};

// ============ NEON CITY ============
const NeonBuilding: React.FC<{ 
  position: [number, number, number]; 
  width: number; 
  height: number; 
  depth: number; 
  neonColor: string;
  buildingId: number;
}> = ({ position, width, height, depth, neonColor, buildingId }) => {
  const glowRef = useRef<THREE.Mesh>(null);
  const edgeRef = useRef<THREE.LineSegments>(null);
  
  // Subtle neon pulse animation
  useFrame((state) => {
    if (glowRef.current) {
      const time = state.clock.getElapsedTime();
      const pulse = 0.5 + Math.sin(time * 0.5 + buildingId) * 0.2;
      const material = glowRef.current.material as THREE.MeshBasicMaterial;
      material.opacity = pulse;
    }
  });
  
  // Generate window data with memoization
  const windows = useMemo(() => {
    const result: Array<{
      pos: [number, number, number];
      color: string;
      opacity: number;
      flickerSpeed: number;
      flickerOffset: number;
    }> = [];
    
    const rows = Math.floor(height / 2);
    const cols = Math.floor(width / 0.8);
    
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        // Some windows are dark
        if (Math.random() > 0.3) {
          result.push({
            pos: [
              (col - cols / 2 + 0.5) * 0.7,
              row * 1.5 + 1,
              depth / 2 + 0.01
            ],
            color: Math.random() > 0.5 ? '#ffcc00' : '#00ffff',
            opacity: 0.3 + Math.random() * 0.5,
            flickerSpeed: 0.5 + Math.random() * 2,
            flickerOffset: Math.random() * Math.PI * 2
          });
        }
      }
    }
    return result;
  }, [height, width, depth]);
  
  return (
    <group position={position}>
      {/* Building body */}
      <mesh position={[0, height / 2, 0]}>
        <boxGeometry args={[width, height, depth]} />
        <meshBasicMaterial color="#0a0a15" />
      </mesh>
      
      {/* Neon edges with subtle glow */}
      <lineSegments ref={edgeRef} position={[0, height / 2, 0]}>
        <edgesGeometry args={[new THREE.BoxGeometry(width, height, depth)]} />
        <lineBasicMaterial color={neonColor} linewidth={2} transparent opacity={0.8} />
      </lineSegments>
      
      {/* Rooftop glow with pulse */}
      <mesh ref={glowRef} position={[0, height + 0.2, 0]}>
        <boxGeometry args={[width * 0.9, 0.3, depth * 0.9]} />
        <meshBasicMaterial 
          color={neonColor} 
          transparent 
          opacity={0.6}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      
      {/* Animated Windows */}
      {windows.map((win, idx) => (
        <AnimatedWindow
          key={idx}
          position={win.pos}
          initialColor={win.color}
          initialOpacity={win.opacity}
          flickerSpeed={win.flickerSpeed}
          flickerOffset={win.flickerOffset}
        />
      ))}
    </group>
  );
};

const NeonCity: React.FC = () => {
  const buildings = useMemo(() => {
    const result: React.ReactNode[] = [];
    const colors = ['#ff00ff', '#00ffff', '#ff6b9d', '#6b9dff', '#ff9500'];
    
    // Create city grid
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 6; col++) {
        const x = (col - 2.5) * 6;
        const z = -row * 5 - 20;
        const height = 5 + Math.random() * 15;
        const width = 2 + Math.random() * 2;
        const depth = 2 + Math.random() * 2;
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        result.push(
          <NeonBuilding
            key={`${row}-${col}`}
            position={[x, -5, z]}
            width={width}
            height={height}
            depth={depth}
            neonColor={color}
            buildingId={row * 6 + col}
          />
        );
      }
    }
    
    return result;
  }, []);
  
  return <group>{buildings}</group>;
};

// ============ DIGITAL DUST PARTICLES ============
const DigitalDust: React.FC = () => {
  const pointsRef = useRef<THREE.Points>(null);
  
  const [positions, colors, speeds] = useMemo(() => {
    const count = 200;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const spd = new Float32Array(count);
    
    const colorOptions = [
      new THREE.Color('#00ffff'),
      new THREE.Color('#ff00ff'),
      new THREE.Color('#ffcc00'),
      new THREE.Color('#ff6b9d')
    ];
    
    for (let i = 0; i < count; i++) {
      // Concentrate particles near the city area
      pos[i * 3] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 1] = Math.random() * 25 - 5;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 30 - 25;
      
      const color = colorOptions[Math.floor(Math.random() * colorOptions.length)];
      col[i * 3] = color.r;
      col[i * 3 + 1] = color.g;
      col[i * 3 + 2] = color.b;
      
      spd[i] = 0.2 + Math.random() * 0.5;
    }
    
    return [pos, col, spd];
  }, []);
  
  useFrame((state) => {
    if (pointsRef.current) {
      const time = state.clock.getElapsedTime();
      const positionAttr = pointsRef.current.geometry.attributes.position;
      const positions = positionAttr.array as Float32Array;
      
      for (let i = 0; i < positions.length / 3; i++) {
        // Gentle floating motion
        positions[i * 3 + 1] += Math.sin(time * speeds[i] + i) * 0.002;
        positions[i * 3] += Math.cos(time * speeds[i] * 0.5 + i) * 0.001;
        
        // Reset particles that go too high
        if (positions[i * 3 + 1] > 20) {
          positions[i * 3 + 1] = -5;
        }
      }
      
      positionAttr.needsUpdate = true;
    }
  });
  
  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        vertexColors
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
};

// ============ METEOR SHOWER ============
const Meteor: React.FC<{ delay: number }> = ({ delay }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const startPos = useMemo(() => ({
    x: 30 + Math.random() * 40,
    y: 20 + Math.random() * 20,
    z: -10 + Math.random() * 30
  }), []);
  
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime() + delay;
      const progress = (time % 8) / 8;
      
      meshRef.current.position.x = startPos.x - progress * 80;
      meshRef.current.position.y = startPos.y - progress * 50;
      meshRef.current.position.z = startPos.z - progress * 20;
      
      const material = meshRef.current.material as THREE.MeshBasicMaterial;
      material.opacity = Math.max(0, 1 - progress * 1.5) * 0.8;
    }
  });
  
  return (
    <mesh ref={meshRef} position={[startPos.x, startPos.y, startPos.z]}>
      <capsuleGeometry args={[0.1, 2, 4, 8]} />
      <meshBasicMaterial
        color="#ff9500"
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
};

const MeteorShower: React.FC = () => {
  return (
    <group>
      {Array.from({ length: 10 }).map((_, i) => (
        <Meteor key={i} delay={i * 2} />
      ))}
    </group>
  );
};

// ============ SUN WITH GLOW ============
const Sun: React.FC = () => {
  const sunRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (sunRef.current) {
      const time = state.clock.getElapsedTime();
      const scale = 1 + Math.sin(time * 0.5) * 0.05;
      sunRef.current.scale.setScalar(scale);
    }
  });
  
  return (
    <group position={[40, 15, -80]}>
      {/* Sun core */}
      <mesh ref={sunRef}>
        <circleGeometry args={[8, 32]} />
        <meshBasicMaterial color="#ffcc00" />
      </mesh>
      
      {/* Inner glow */}
      <mesh>
        <circleGeometry args={[12, 32]} />
        <meshBasicMaterial 
          color="#ff9500" 
          transparent 
          opacity={0.5}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      
      {/* Outer glow */}
      <mesh>
        <circleGeometry args={[18, 32]} />
        <meshBasicMaterial 
          color="#ff6b35" 
          transparent 
          opacity={0.2}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
};

// ============ SCENES ============
const FullScene: React.FC = () => {
  return (
    <>
      {/* Background */}
      <color attach="background" args={['#050010']} />
      
      {/* Lighting */}
      <ambientLight intensity={0.4} color="#4a1a6b" />
      <directionalLight position={[40, 20, -30]} intensity={1} color="#ff9500" />
      <pointLight position={[20, 12, -50]} intensity={50} color="#ff6b9d" distance={100} />
      <pointLight position={[0, 10, -30]} intensity={30} color="#00ffff" distance={80} />
      <pointLight position={[-20, 5, -20]} intensity={20} color="#ff00ff" distance={60} />
      
      {/* Static background elements */}
      <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={0} />
      <GiantPlanet />
      <Mountains />
      
      {/* Animated city with life */}
      <NeonCity />
      <DigitalDust />
      
      {/* Fog for depth */}
      <fog attach="fog" args={['#0a0515', 40, 150]} />
    </>
  );
};

const MinimalScene: React.FC = () => (
  <>
    <color attach="background" args={['#050010']} />
    <ambientLight intensity={0.3} color="#4a1a6b" />
    <directionalLight position={[30, 10, -20]} intensity={0.5} color="#ff9500" />
    <Stars radius={80} depth={40} count={3000} factor={4} fade />
    <OrbitControls autoRotate autoRotateSpeed={0.5} />
  </>
);

const PerformanceScene: React.FC = () => (
  <>
    <color attach="background" args={['#050010']} />
    <ambientLight intensity={0.3} />
    <Stars radius={50} depth={30} count={2000} factor={3} fade />
  </>
);

// ============ UI COMPONENTS ============
const LoadingScreen: React.FC = () => (
  <div className="absolute inset-0 flex items-center justify-center bg-black z-50">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-cyan-400 font-mono text-sm tracking-widest uppercase">
        Cargando Universo...
      </p>
    </div>
  </div>
);

const GradientFallback: React.FC = () => (
  <div className="fixed inset-0 -z-10 bg-gradient-to-b from-[#050010] via-[#1a0a3e] to-[#ff6b35]" />
);

// ============ MAIN COMPONENT ============
interface VRBackgroundProps {
  style?: 'full' | 'minimal' | 'performance';
}

const VRBackground: React.FC<VRBackgroundProps> = ({ style = 'full' }) => {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return <GradientFallback />;

  if (style === 'performance') {
    return (
      <div className="fixed inset-0 -z-10 bg-black overflow-hidden">
        <Canvas camera={{ position: [0, 5, 20], fov: 60 }}>
          <PerformanceScene />
        </Canvas>
      </div>
    );
  }

  if (style === 'minimal') {
    return (
      <div className="fixed inset-0 -z-10 bg-black overflow-hidden">
        <Canvas camera={{ position: [0, 5, 20], fov: 60 }}>
          <MinimalScene />
        </Canvas>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30 pointer-events-none" />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 -z-10 bg-black overflow-hidden">
      {loading && <LoadingScreen />}
      
      <Canvas
        camera={{ position: [0, 10, 40], fov: 60, near: 0.1, far: 500 }}
        gl={{ antialias: true, alpha: false }}
        dpr={[1, 2]}
      >
        <FullScene />
      </Canvas>
      
      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,transparent_0%,black_70%)] opacity-50 pointer-events-none" />
    </div>
  );
};

export default VRBackground;
export type { VRBackgroundProps };