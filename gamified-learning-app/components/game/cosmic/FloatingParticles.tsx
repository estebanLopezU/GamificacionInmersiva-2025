"use client";
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface FloatingParticlesProps {
  count?: number;
  size?: number;
  spread?: number;
  colors?: string[];
  speed?: number;
}

const FloatingParticles: React.FC<FloatingParticlesProps> = ({
  count = 1000,
  size = 0.05,
  spread = 30,
  colors = ['#ff6b9d', '#6b9dff', '#ffcc00', '#00ffff', '#ff00ff'],
  speed = 0.5
}) => {
  const pointsRef = useRef<THREE.Points>(null);
  
  const { positions, velocities, colors: particleColors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    
    const colorObjects = colors.map(c => new THREE.Color(c));
    
    for (let i = 0; i < count; i++) {
      // Random position in a cube
      pos[i * 3] = (Math.random() - 0.5) * spread;
      pos[i * 3 + 1] = (Math.random() - 0.5) * spread;
      pos[i * 3 + 2] = (Math.random() - 0.5) * spread;
      
      // Random velocity
      vel[i * 3] = (Math.random() - 0.5) * 0.02;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.02;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.02;
      
      // Random color
      const color = colorObjects[Math.floor(Math.random() * colorObjects.length)];
      col[i * 3] = color.r;
      col[i * 3 + 1] = color.g;
      col[i * 3 + 2] = color.b;
    }
    
    return { positions: pos, velocities: vel, colors: col };
  }, [count, spread, colors]);
  
  useFrame((state, delta) => {
    if (pointsRef.current) {
      const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
      const time = state.clock.getElapsedTime();
      
      for (let i = 0; i < count; i++) {
        // Gentle floating motion
        positions[i * 3] += Math.sin(time * speed + i) * 0.002;
        positions[i * 3 + 1] += Math.cos(time * speed * 0.7 + i) * 0.002;
        positions[i * 3 + 2] += Math.sin(time * speed * 0.5 + i) * 0.002;
        
        // Keep particles in bounds
        if (Math.abs(positions[i * 3]) > spread / 2) {
          positions[i * 3] *= 0.99;
        }
        if (Math.abs(positions[i * 3 + 1]) > spread / 2) {
          positions[i * 3 + 1] *= 0.99;
        }
        if (Math.abs(positions[i * 3 + 2]) > spread / 2) {
          positions[i * 3 + 2] *= 0.99;
        }
      }
      
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
      pointsRef.current.rotation.y = time * 0.02;
    }
  });
  
  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        size={size}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        vertexColors
        opacity={0.6}
      />
    </Points>
  );
};

// Fireflies / magical particles
interface FirefliesProps {
  count?: number;
}

const Fireflies: React.FC<FirefliesProps> = ({ count = 100 }) => {
  const groupRef = useRef<THREE.Group>(null);
  
  const fireflies = useMemo(() => {
    return Array.from({ length: count }, () => ({
      position: [
        (Math.random() - 0.5) * 40,
        Math.random() * 10,
        (Math.random() - 0.5) * 40
      ] as [number, number, number],
      phase: Math.random() * Math.PI * 2,
      speed: 0.5 + Math.random() * 1,
      color: ['#ffcc00', '#ff9500', '#ffffff'][Math.floor(Math.random() * 3)]
    }));
  }, [count]);
  
  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.getElapsedTime();
      
      groupRef.current.children.forEach((child, i) => {
        const firefly = fireflies[i];
        
        // Floating motion
        child.position.x = firefly.position[0] + Math.sin(time * firefly.speed + firefly.phase) * 2;
        child.position.y = firefly.position[1] + Math.sin(time * firefly.speed * 1.3 + firefly.phase) * 1;
        child.position.z = firefly.position[2] + Math.cos(time * firefly.speed + firefly.phase) * 2;
        
        // Pulsing glow
        const mesh = child as THREE.Mesh;
        const material = mesh.material as THREE.MeshBasicMaterial;
        const pulse = 0.3 + Math.sin(time * 3 + firefly.phase) * 0.3;
        material.opacity = pulse;
        
        // Scale pulse
        const scale = 0.5 + Math.sin(time * 2 + firefly.phase) * 0.3;
        child.scale.setScalar(scale);
      });
    }
  });
  
  return (
    <group ref={groupRef}>
      {fireflies.map((firefly, i) => (
        <mesh key={i} position={firefly.position}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshBasicMaterial
            color={firefly.color}
            transparent
            opacity={0.5}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
};

// Energy orbs
interface EnergyOrbsProps {
  count?: number;
}

const EnergyOrbs: React.FC<EnergyOrbsProps> = ({ count = 20 }) => {
  const groupRef = useRef<THREE.Group>(null);
  
  const orbs = useMemo(() => {
    return Array.from({ length: count }, () => ({
      position: [
        (Math.random() - 0.5) * 50,
        2 + Math.random() * 15,
        (Math.random() - 0.5) * 50
      ] as [number, number, number],
      scale: 0.2 + Math.random() * 0.5,
      color: ['#ff00ff', '#00ffff', '#ff6b9d', '#9d4edd'][Math.floor(Math.random() * 4)],
      rotationSpeed: (Math.random() - 0.5) * 2,
      floatSpeed: 0.5 + Math.random()
    }));
  }, [count]);
  
  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.getElapsedTime();
      
      groupRef.current.children.forEach((child, i) => {
        const orb = orbs[i];
        
        // Floating motion
        child.position.y = orb.position[1] + Math.sin(time * orb.floatSpeed + i) * 2;
        child.rotation.x = time * orb.rotationSpeed;
        child.rotation.y = time * orb.rotationSpeed * 0.7;
        
        // Pulsing
        const scale = orb.scale * (1 + Math.sin(time * 2 + i) * 0.2);
        child.scale.setScalar(scale);
      });
    }
  });
  
  return (
    <group ref={groupRef}>
      {orbs.map((orb, i) => (
        <group key={i} position={orb.position}>
          {/* Core */}
          <mesh>
            <icosahedronGeometry args={[orb.scale, 1]} />
            <meshBasicMaterial
              color={orb.color}
              transparent
              opacity={0.6}
              blending={THREE.AdditiveBlending}
              wireframe
            />
          </mesh>
          
          {/* Glow */}
          <mesh>
            <sphereGeometry args={[orb.scale * 1.5, 16, 16]} />
            <meshBasicMaterial
              color={orb.color}
              transparent
              opacity={0.2}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
};

// Dust motes in light beams
interface DustMotesProps {
  count?: number;
  lightPosition?: [number, number, number];
}

const DustMotes: React.FC<DustMotesProps> = ({ 
  count = 200,
  lightPosition = [10, 10, -5]
}) => {
  const pointsRef = useRef<THREE.Points>(null);
  
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      // Concentrate around light beam area
      pos[i * 3] = lightPosition[0] + (Math.random() - 0.5) * 15;
      pos[i * 3 + 1] = Math.random() * 20;
      pos[i * 3 + 2] = lightPosition[2] + (Math.random() - 0.5) * 15;
    }
    
    return pos;
  }, [count, lightPosition]);
  
  useFrame((state) => {
    if (pointsRef.current) {
      const time = state.clock.getElapsedTime();
      const pos = pointsRef.current.geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < count; i++) {
        // Slow drift
        pos[i * 3] += Math.sin(time * 0.1 + i * 0.1) * 0.005;
        pos[i * 3 + 1] += 0.005; // Slow rise
        pos[i * 3 + 2] += Math.cos(time * 0.1 + i * 0.1) * 0.005;
        
        // Reset when too high
        if (pos[i * 3 + 1] > 20) {
          pos[i * 3 + 1] = 0;
        }
      }
      
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });
  
  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#ffcc88"
        size={0.03}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.4}
      />
    </Points>
  );
};

export { FloatingParticles, Fireflies, EnergyOrbs, DustMotes };
export default FloatingParticles;