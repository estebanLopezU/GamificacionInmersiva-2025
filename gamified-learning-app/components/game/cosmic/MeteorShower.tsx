"use client";
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface Meteor {
  id: number;
  startPosition: THREE.Vector3;
  direction: THREE.Vector3;
  speed: number;
  length: number;
  thickness: number;
  color: string;
  trail: number;
}

interface MeteorShowerProps {
  count?: number;
  active?: boolean;
}

const MeteorShower: React.FC<MeteorShowerProps> = ({ 
  count = 15,
  active = true 
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const meteorsRef = useRef<Meteor[]>([]);
  const meshesRef = useRef<THREE.Mesh[]>([]);
  
  // Initialize meteors
  useMemo(() => {
    meteorsRef.current = Array.from({ length: count }, (_, i) => createMeteor(i));
  }, [count]);
  
  function createMeteor(id: number): Meteor {
    const startX = 50 + Math.random() * 50;
    const startY = 30 + Math.random() * 40;
    const startZ = -20 + Math.random() * 40;
    
    return {
      id,
      startPosition: new THREE.Vector3(startX, startY, startZ),
      direction: new THREE.Vector3(
        -1 - Math.random() * 0.5,
        -0.5 - Math.random() * 0.3,
        -0.2 + Math.random() * 0.4
      ).normalize(),
      speed: 30 + Math.random() * 40,
      length: 3 + Math.random() * 5,
      thickness: 0.05 + Math.random() * 0.1,
      color: ['#ff6b35', '#ff9500', '#ffcc00', '#ffffff'][Math.floor(Math.random() * 4)],
      trail: 0
    };
  }
  
  useFrame((state, delta) => {
    if (!active || !groupRef.current) return;
    
    const time = state.clock.getElapsedTime();
    
    groupRef.current.children.forEach((child, i) => {
      const mesh = child as THREE.Mesh;
      const meteor = meteorsRef.current[i];
      
      if (!meteor) return;
      
      // Calculate progress (0 to 1)
      const cycleTime = (time * 0.1 + i * 0.3) % 1;
      
      if (cycleTime < 0.02) {
        // Reset meteor
        meteorsRef.current[i] = createMeteor(i);
      }
      
      const progress = cycleTime;
      const distance = progress * 100;
      
      // Update position
      mesh.position.copy(meteor.startPosition);
      mesh.position.addScaledVector(meteor.direction, distance);
      
      // Orient meteor along direction
      mesh.lookAt(mesh.position.clone().add(meteor.direction));
      
      // Fade in and out
      const material = mesh.material as THREE.MeshBasicMaterial;
      const fadeIn = Math.min(progress * 10, 1);
      const fadeOut = Math.max(0, 1 - progress * 1.5);
      material.opacity = fadeIn * fadeOut * 0.8;
      
      // Scale based on speed
      const scale = 1 + (meteor.speed / 50) * progress;
      mesh.scale.set(meteor.thickness * scale, meteor.thickness * scale, meteor.length * (1 + progress * 2));
    });
  });
  
  return (
    <group ref={groupRef}>
      {meteorsRef.current.map((meteor) => (
        <mesh key={meteor.id}>
          <capsuleGeometry args={[meteor.thickness, meteor.length, 4, 8]} />
          <meshBasicMaterial
            color={meteor.color}
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

// Single large meteor with trail
interface LargeMeteorProps {
  position?: [number, number, number];
  delay?: number;
}

const LargeMeteor: React.FC<LargeMeteorProps> = ({ 
  position = [40, 25, -10],
  delay = 0 
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const trailRef = useRef<THREE.Points>(null);
  
  const trailPositions = useMemo(() => {
    const count = 100;
    const positions = new Float32Array(count * 3);
    return positions;
  }, []);
  
  useFrame((state) => {
    if (!groupRef.current) return;
    
    const time = state.clock.getElapsedTime() + delay;
    const cycle = time % 20;
    
    if (cycle < 8) {
      // Meteor visible
      const progress = cycle / 8;
      
      groupRef.current.position.x = position[0] - progress * 80;
      groupRef.current.position.y = position[1] - progress * 50;
      groupRef.current.position.z = position[2] - progress * 20;
      
      // Update trail
      if (trailRef.current) {
        const positions = trailRef.current.geometry.attributes.position.array as Float32Array;
        for (let i = 0; i < 100; i++) {
          const t = i / 100;
          positions[i * 3] = t * 20;
          positions[i * 3 + 1] = t * 12;
          positions[i * 3 + 2] = t * 5;
        }
        trailRef.current.geometry.attributes.position.needsUpdate = true;
      }
      
      groupRef.current.visible = true;
    } else {
      groupRef.current.visible = false;
    }
  });
  
  return (
    <group ref={groupRef} position={position}>
      {/* Meteor head */}
      <mesh>
        <sphereGeometry args={[0.3, 8, 8]} />
        <meshBasicMaterial
          color="#ff6b35"
          transparent
          opacity={0.9}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      
      {/* Glow */}
      <mesh>
        <sphereGeometry args={[0.6, 8, 8]} />
        <meshBasicMaterial
          color="#ff9500"
          transparent
          opacity={0.4}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      
      {/* Trail particles */}
      <points ref={trailRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[trailPositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#ffcc00"
          size={0.1}
          transparent
          opacity={0.6}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
};

// Asteroid field in the distance
interface AsteroidFieldProps {
  count?: number;
}

const AsteroidField: React.FC<AsteroidFieldProps> = ({ count = 50 }) => {
  const groupRef = useRef<THREE.Group>(null);
  
  const asteroids = useMemo(() => {
    return Array.from({ length: count }, () => ({
      position: [
        (Math.random() - 0.5) * 200,
        -10 + Math.random() * 60,
        -80 - Math.random() * 50
      ] as [number, number, number],
      scale: 0.2 + Math.random() * 0.8,
      rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI] as [number, number, number],
      rotationSpeed: (Math.random() - 0.5) * 0.02
    }));
  }, [count]);
  
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.children.forEach((child, i) => {
        child.rotation.x += asteroids[i].rotationSpeed;
        child.rotation.y += asteroids[i].rotationSpeed * 0.7;
      });
    }
  });
  
  return (
    <group ref={groupRef}>
      {asteroids.map((asteroid, i) => (
        <mesh 
          key={i} 
          position={asteroid.position}
          rotation={asteroid.rotation}
          scale={asteroid.scale}
        >
          <dodecahedronGeometry args={[1, 0]} />
          <meshBasicMaterial
            color="#4a4a6a"
            transparent
            opacity={0.3}
            wireframe
          />
        </mesh>
      ))}
    </group>
  );
};

export { MeteorShower, LargeMeteor, AsteroidField };
export default MeteorShower;