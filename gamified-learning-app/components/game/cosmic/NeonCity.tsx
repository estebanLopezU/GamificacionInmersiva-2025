"use client";
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface Building {
  position: [number, number, number];
  width: number;
  height: number;
  depth: number;
  color: string;
  neonColor: string;
  windows: boolean;
}

interface NeonCityProps {
  position?: [number, number, number];
  buildingCount?: number;
  spread?: number;
}

const NeonCity: React.FC<NeonCityProps> = ({
  position = [0, -2, -15],
  buildingCount = 30,
  spread = 60
}) => {
  const groupRef = useRef<THREE.Group>(null);
  
  // Generate buildings
  const buildings = useMemo(() => {
    const neonColors = ['#ff00ff', '#00ffff', '#ff6b9d', '#6b9dff', '#ff9500', '#9d4edd'];
    const buildingColors = ['#0a0a15', '#0f0f20', '#151525', '#1a1a30'];
    
    return Array.from({ length: buildingCount }, (_, i) => {
      const row = Math.floor(i / 10);
      const col = i % 10;
      
      return {
        position: [
          (col - 5) * 6 + (Math.random() - 0.5) * 2,
          0,
          -row * 4 + (Math.random() - 0.5) * 2
        ] as [number, number, number],
        width: 1.5 + Math.random() * 2,
        height: 3 + Math.random() * 12,
        depth: 1.5 + Math.random() * 2,
        color: buildingColors[Math.floor(Math.random() * buildingColors.length)],
        neonColor: neonColors[Math.floor(Math.random() * neonColors.length)],
        windows: Math.random() > 0.3
      };
    });
  }, [buildingCount]);
  
  useFrame((state) => {
    if (groupRef.current) {
      // Subtle city animation
      const time = state.clock.getElapsedTime();
      groupRef.current.children.forEach((child, i) => {
        if (child.children[1]) {
          // Animate neon glow
          const neon = child.children[1] as THREE.Mesh;
          const material = neon.material as THREE.MeshBasicMaterial;
          material.opacity = 0.6 + Math.sin(time * 2 + i) * 0.2;
        }
      });
    }
  });
  
  return (
    <group ref={groupRef} position={position}>
      {buildings.map((building, i) => (
        <group key={i} position={building.position}>
          {/* Building base */}
          <mesh position={[0, building.height / 2, 0]}>
            <boxGeometry args={[building.width, building.height, building.depth]} />
            <meshBasicMaterial color={building.color} transparent opacity={0.9} />
          </mesh>
          
          {/* Neon outline */}
          <lineSegments position={[0, building.height / 2, 0]}>
            <edgesGeometry args={[new THREE.BoxGeometry(building.width, building.height, building.depth)]} />
            <lineBasicMaterial color={building.neonColor} transparent opacity={0.8} />
          </lineSegments>
          
          {/* Rooftop glow */}
          <mesh position={[0, building.height + 0.1, 0]}>
            <boxGeometry args={[building.width * 0.8, 0.1, building.depth * 0.8]} />
            <meshBasicMaterial
              color={building.neonColor}
              transparent
              opacity={0.5}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
          
          {/* Windows */}
          {building.windows && (
            <group position={[0, building.height / 2, building.depth / 2 + 0.01]}>
              {Array.from({ length: Math.floor(building.height / 1.5) }, (_, row) => (
                Array.from({ length: Math.floor(building.width / 0.6) }, (_, col) => (
                  <mesh
                    key={`${row}-${col}`}
                    position={[
                      (col - Math.floor(building.width / 0.6) / 2 + 0.5) * 0.5,
                      row * 1.2 - building.height / 2 + 1,
                      0
                    ]}
                  >
                    <planeGeometry args={[0.3, 0.5]} />
                    <meshBasicMaterial
                      color={Math.random() > 0.3 ? '#ffcc00' : '#00ffff'}
                      transparent
                      opacity={0.3 + Math.random() * 0.4}
                      blending={THREE.AdditiveBlending}
                      depthWrite={false}
                    />
                  </mesh>
                ))
              ))}
            </group>
          )}
        </group>
      ))}
    </group>
  );
};

// Neon signs and holographic billboards
interface NeonSignsProps {
  position?: [number, number, number];
}

const NeonSigns: React.FC<NeonSignsProps> = ({
  position = [0, 0, -10]
}) => {
  const groupRef = useRef<THREE.Group>(null);
  
  const signs = useMemo(() => [
    { position: [-15, 8, -5], text: 'CYBER', color: '#ff00ff', size: 2 },
    { position: [15, 10, -8], text: 'NEON', color: '#00ffff', size: 1.5 },
    { position: [-8, 12, -12], text: '2099', color: '#ff6b9d', size: 1.8 },
    { position: [10, 6, -3], text: 'TECH', color: '#9d4edd', size: 1.2 }
  ], []);
  
  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.getElapsedTime();
      groupRef.current.children.forEach((child, i) => {
        // Flickering effect
        const material = (child as THREE.Mesh).material as THREE.MeshBasicMaterial;
        const flicker = Math.sin(time * 10 + i * 3) > 0.95 ? 0.3 : 1;
        material.opacity = 0.8 * flicker;
      });
    }
  });
  
  return (
    <group ref={groupRef} position={position}>
      {signs.map((sign, i) => (
        <mesh key={i} position={sign.position}>
          <planeGeometry args={[sign.size * 2, sign.size * 0.6]} />
          <meshBasicMaterial
            color={sign.color}
            transparent
            opacity={0.8}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
};

// Holographic displays
interface HolographicDisplaysProps {
  position?: [number, number, number];
}

const HolographicDisplays: React.FC<HolographicDisplaysProps> = ({
  position = [0, 0, 0]
}) => {
  const groupRef = useRef<THREE.Group>(null);
  
  const displays = useMemo(() => [
    { position: [-20, 5, -20] as [number, number, number], color: '#00ffff', size: [4, 6] as [number, number] },
    { position: [20, 6, -25] as [number, number, number], color: '#ff00ff', size: [5, 7] as [number, number] },
    { position: [0, 8, -30] as [number, number, number], color: '#ff6b9d', size: [8, 4] as [number, number] }
  ], []);
  
  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.getElapsedTime();
      groupRef.current.children.forEach((child, i) => {
        // Holographic scan lines effect
        child.position.y = displays[i].position[1] + Math.sin(time + i) * 0.1;
        const mesh = child as THREE.Mesh;
        const material = mesh.material as THREE.MeshBasicMaterial;
        material.opacity = 0.15 + Math.sin(time * 2) * 0.05;
      });
    }
  });
  
  return (
    <group ref={groupRef} position={position}>
      {displays.map((display, i) => (
        <mesh key={i} position={display.position}>
          <planeGeometry args={display.size} />
          <meshBasicMaterial
            color={display.color}
            transparent
            opacity={0.2}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
};

// Flying vehicles
interface FlyingVehiclesProps {
  count?: number;
}

const FlyingVehicles: React.FC<FlyingVehiclesProps> = ({ count = 8 }) => {
  const groupRef = useRef<THREE.Group>(null);
  
  const vehicles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      startPosition: [
        (Math.random() - 0.5) * 80,
        5 + Math.random() * 15,
        -10 - Math.random() * 30
      ] as [number, number, number],
      speed: 5 + Math.random() * 10,
      direction: Math.random() > 0.5 ? 1 : -1,
      color: ['#00ffff', '#ff00ff', '#ffcc00'][Math.floor(Math.random() * 3)]
    }));
  }, [count]);
  
  useFrame((state, delta) => {
    if (groupRef.current) {
      const time = state.clock.getElapsedTime();
      
      groupRef.current.children.forEach((child, i) => {
        const vehicle = vehicles[i];
        const cycle = (time * vehicle.speed * 0.1) % 1;
        
        child.position.x = vehicle.startPosition[0] + cycle * 100 * vehicle.direction;
        child.position.y = vehicle.startPosition[1] + Math.sin(time * 2 + i) * 0.5;
        
        // Reset position when off screen
        if (child.position.x > 60 || child.position.x < -60) {
          child.position.x = -60 * vehicle.direction;
        }
      });
    }
  });
  
  return (
    <group ref={groupRef}>
      {vehicles.map((vehicle, i) => (
        <group key={i} position={vehicle.startPosition}>
          {/* Vehicle body */}
          <mesh>
            <capsuleGeometry args={[0.1, 0.4, 4, 8]} />
            <meshBasicMaterial color="#1a1a2e" />
          </mesh>
          
          {/* Engine glow */}
          <mesh position={[-0.3 * vehicle.direction, 0, 0]}>
            <sphereGeometry args={[0.08, 8, 8]} />
            <meshBasicMaterial
              color={vehicle.color}
              transparent
              opacity={0.8}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
          
          {/* Trail */}
          <mesh position={[0.3 * vehicle.direction, 0, 0]}>
            <capsuleGeometry args={[0.03, 0.5, 4, 8]} />
            <meshBasicMaterial
              color={vehicle.color}
              transparent
              opacity={0.4}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
};

export { NeonCity, NeonSigns, HolographicDisplays, FlyingVehicles };
export default NeonCity;