"use client";
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface StarFieldProps {
  count?: number;
  size?: number;
  spread?: number;
  colors?: string[];
}

const StarField: React.FC<StarFieldProps> = ({
  count = 5000,
  size = 0.02,
  spread = 100,
  colors = ['#ffffff', '#ff9ed2', '#9ed2ff', '#d2ff9e', '#ffcc00']
}) => {
  const pointsRef = useRef<THREE.Points>(null);
  
  // Generate star positions with varying brightness
  const { positions, colors: starColors, sizes } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const siz = new Float32Array(count);
    
    const colorObjects = colors.map(c => new THREE.Color(c));
    
    for (let i = 0; i < count; i++) {
      // Spherical distribution
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = spread * (0.5 + Math.random() * 0.5);
      
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
      
      // Random color from palette
      const color = colorObjects[Math.floor(Math.random() * colorObjects.length)];
      col[i * 3] = color.r;
      col[i * 3 + 1] = color.g;
      col[i * 3 + 2] = color.b;
      
      // Varying sizes
      siz[i] = size * (0.5 + Math.random() * 1.5);
    }
    
    return { positions: pos, colors: col, sizes: siz };
  }, [count, size, spread, colors]);
  
  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.01;
      pointsRef.current.rotation.x += delta * 0.005;
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
      />
    </Points>
  );
};

// Twinkling stars with animation
interface TwinklingStarsProps {
  count?: number;
}

const TwinklingStars: React.FC<TwinklingStarsProps> = ({ count = 500 }) => {
  const pointsRef = useRef<THREE.Points>(null);
  
  const { positions, phases } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const ph = new Float32Array(count);
    
    for (let i = 0; i < count; i++) {
      // Distribute in a dome above
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI * 0.5; // Only upper hemisphere
      const r = 80 + Math.random() * 20;
      
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.cos(phi) + 10;
      pos[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
      
      ph[i] = Math.random() * Math.PI * 2;
    }
    
    return { positions: pos, phases: ph };
  }, [count]);
  
  useFrame((state) => {
    if (pointsRef.current) {
      const time = state.clock.getElapsedTime();
      const material = pointsRef.current.material as THREE.PointsMaterial;
      // Animate opacity for twinkling effect
      material.opacity = 0.6 + Math.sin(time * 2) * 0.3;
    }
  });
  
  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#ffffff"
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.8}
      />
    </Points>
  );
};

// Shooting stars
interface ShootingStarsProps {
  count?: number;
}

const ShootingStars: React.FC<ShootingStarsProps> = ({ count = 20 }) => {
  const groupRef = useRef<THREE.Group>(null);
  
  const stars = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      startPosition: [
        (Math.random() - 0.5) * 100,
        30 + Math.random() * 30,
        (Math.random() - 0.5) * 100
      ] as [number, number, number],
      speed: 0.5 + Math.random() * 1,
      delay: Math.random() * 10,
      length: 2 + Math.random() * 3
    }));
  }, [count]);
  
  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.getElapsedTime();
      
      groupRef.current.children.forEach((child, i) => {
        const star = stars[i];
        const t = ((time + star.delay) % 10) / 10;
        
        // Move from top-right to bottom-left
        child.position.x = star.startPosition[0] - t * 60;
        child.position.y = star.startPosition[1] - t * 50;
        child.position.z = star.startPosition[2] - t * 30;
        
        // Fade out
        const material = (child as THREE.Mesh).material as THREE.MeshBasicMaterial;
        material.opacity = Math.max(0, 1 - t * 1.5);
      });
    }
  });
  
  return (
    <group ref={groupRef}>
      {stars.map((star) => (
        <mesh key={star.id} position={star.startPosition}>
          <capsuleGeometry args={[0.05, star.length, 4, 8]} />
          <meshBasicMaterial
            color="#ffffff"
            transparent
            opacity={0}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
};

export { StarField, TwinklingStars, ShootingStars };
export default StarField;