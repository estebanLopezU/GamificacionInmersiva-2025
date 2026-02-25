"use client";
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface GalaxyProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  particleCount?: number;
  size?: number;
  color1?: string;
  color2?: string;
  spiralArms?: number;
}

const Galaxy: React.FC<GalaxyProps> = ({
  position = [-30, 15, -50],
  rotation = [0.3, 0, 0.5],
  particleCount = 3000,
  size = 0.03,
  color1 = '#ff6b9d',
  color2 = '#6b9dff',
  spiralArms = 4
}) => {
  const pointsRef = useRef<THREE.Points>(null);
  
  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const col = new Float32Array(particleCount * 3);
    
    const c1 = new THREE.Color(color1);
    const c2 = new THREE.Color(color2);
    
    for (let i = 0; i < particleCount; i++) {
      // Spiral galaxy distribution
      const armIndex = i % spiralArms;
      const armAngle = (armIndex / spiralArms) * Math.PI * 2;
      
      const radius = Math.random() * 15;
      const spinAngle = radius * 0.5;
      const angle = armAngle + spinAngle;
      
      // Add randomness for natural look
      const randomX = (Math.random() - 0.5) * (radius * 0.3);
      const randomY = (Math.random() - 0.5) * 1;
      const randomZ = (Math.random() - 0.5) * (radius * 0.3);
      
      pos[i * 3] = Math.cos(angle) * radius + randomX;
      pos[i * 3 + 1] = randomY * (1 - radius / 15);
      pos[i * 3 + 2] = Math.sin(angle) * radius + randomZ;
      
      // Color gradient from center to edge
      const t = radius / 15;
      const mixedColor = c1.clone().lerp(c2, t);
      
      // Add brightness variation
      const brightness = 0.5 + Math.random() * 0.5;
      col[i * 3] = mixedColor.r * brightness;
      col[i * 3 + 1] = mixedColor.g * brightness;
      col[i * 3 + 2] = mixedColor.b * brightness;
    }
    
    return { positions: pos, colors: col };
  }, [particleCount, color1, color2, spiralArms]);
  
  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.05;
    }
  });
  
  return (
    <group position={position} rotation={rotation}>
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
      
      {/* Galaxy core glow */}
      <mesh>
        <sphereGeometry args={[1.5, 16, 16]} />
        <meshBasicMaterial
          color={color1}
          transparent
          opacity={0.3}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      
      {/* Outer glow */}
      <mesh>
        <sphereGeometry args={[3, 16, 16]} />
        <meshBasicMaterial
          color={color2}
          transparent
          opacity={0.1}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
};

// Nebula clouds
interface NebulaProps {
  position?: [number, number, number];
  color?: string;
  size?: number;
}

const Nebula: React.FC<NebulaProps> = ({
  position = [20, 5, -40],
  color = '#9d4edd',
  size = 20
}) => {
  const groupRef = useRef<THREE.Group>(null);
  
  const clouds = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * size,
        (Math.random() - 0.5) * size * 0.3,
        (Math.random() - 0.5) * size
      ] as [number, number, number],
      scale: 2 + Math.random() * 4,
      opacity: 0.05 + Math.random() * 0.1
    }));
  }, [size]);
  
  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.getElapsedTime();
      groupRef.current.rotation.y = Math.sin(time * 0.1) * 0.1;
    }
  });
  
  return (
    <group ref={groupRef} position={position}>
      {clouds.map((cloud, i) => (
        <mesh key={i} position={cloud.position}>
          <sphereGeometry args={[cloud.scale, 16, 16]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={cloud.opacity}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
};

// Distant galaxy clusters
interface GalaxyClusterProps {
  count?: number;
}

const GalaxyCluster: React.FC<GalaxyClusterProps> = ({ count = 10 }) => {
  const galaxies = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 200,
        20 + Math.random() * 40,
        -50 - Math.random() * 100
      ] as [number, number, number],
      scale: 0.5 + Math.random() * 1.5,
      color: ['#ff6b9d', '#6b9dff', '#9dff6b', '#ff9d6b'][Math.floor(Math.random() * 4)]
    }));
  }, [count]);
  
  return (
    <group>
      {galaxies.map((galaxy, i) => (
        <mesh key={i} position={galaxy.position}>
          <sphereGeometry args={[galaxy.scale, 8, 8]} />
          <meshBasicMaterial
            color={galaxy.color}
            transparent
            opacity={0.4}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
};

export { Galaxy, Nebula, GalaxyCluster };
export default Galaxy;