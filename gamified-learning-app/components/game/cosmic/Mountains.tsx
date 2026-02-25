"use client";
import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface MountainsProps {
  position?: [number, number, number];
  color?: string;
  layers?: number;
  spread?: number;
}

const Mountains: React.FC<MountainsProps> = ({
  position = [0, -2, -30],
  color = '#1a0a2e',
  layers = 5,
  spread = 80
}) => {
  const groupRef = useRef<THREE.Group>(null);
  
  // Generate mountain layers
  const mountainLayers = useMemo(() => {
    return Array.from({ length: layers }, (_, layerIndex) => {
      const depth = layerIndex * 10;
      const layerColor = new THREE.Color(color).lerp(
        new THREE.Color('#2d1b4e'),
        layerIndex / layers
      );
      
      // Generate mountain peaks
      const peakCount = 15 + layerIndex * 5;
      const peaks: Array<{
        position: [number, number, number];
        height: number;
        width: number;
      }> = [];
      
      for (let i = 0; i < peakCount; i++) {
        const x = (i / peakCount - 0.5) * spread;
        const baseHeight = 3 + Math.random() * 8;
        const height = baseHeight * (1 - layerIndex * 0.15);
        const width = 2 + Math.random() * 4;
        
        peaks.push({
          position: [x, 0, -depth],
          height,
          width
        });
      }
      
      return {
        depth,
        color: layerColor,
        opacity: 0.8 - layerIndex * 0.1,
        peaks
      };
    });
  }, [color, layers, spread]);
  
  return (
    <group ref={groupRef} position={position}>
      {mountainLayers.map((layer, layerIndex) => (
        <group key={layerIndex}>
          {layer.peaks.map((peak, peakIndex) => (
            <mesh
              key={peakIndex}
              position={peak.position}
            >
              {/* Cone-shaped mountain */}
              <coneGeometry args={[peak.width, peak.height, 4]} />
              <meshBasicMaterial
                color={layer.color}
                transparent
                opacity={layer.opacity}
                depthWrite={false}
              />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  );
};

// Procedural mountain range with custom geometry
interface MountainRangeProps {
  position?: [number, number, number];
  color?: string;
  width?: number;
  height?: number;
  segments?: number;
}

const MountainRange: React.FC<MountainRangeProps> = ({
  position = [0, -2, -25],
  color = '#1a0a2e',
  width = 100,
  height = 15,
  segments = 50
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Create procedural mountain silhouette
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const vertices: number[] = [];
    const indices: number[] = [];
    
    // Generate height map using noise-like function
    const heights: number[] = [];
    for (let i = 0; i <= segments; i++) {
      const x = (i / segments - 0.5) * width;
      // Combine multiple sine waves for natural look
      let h = 0;
      h += Math.sin(i * 0.3) * 0.3;
      h += Math.sin(i * 0.7 + 1) * 0.2;
      h += Math.sin(i * 1.5 + 2) * 0.1;
      h += Math.sin(i * 0.1) * 0.4;
      h = (h + 1) * 0.5; // Normalize to 0-1
      h = Math.pow(h, 1.5); // Make peaks sharper
      heights.push(h * height);
    }
    
    // Create vertices for the mountain range
    for (let i = 0; i <= segments; i++) {
      const x = (i / segments - 0.5) * width;
      const y = heights[i];
      
      // Top vertex
      vertices.push(x, y, 0);
      // Bottom vertex
      vertices.push(x, -2, 0);
    }
    
    // Create indices for triangles
    for (let i = 0; i < segments; i++) {
      const topLeft = i * 2;
      const bottomLeft = i * 2 + 1;
      const topRight = (i + 1) * 2;
      const bottomRight = (i + 1) * 2 + 1;
      
      indices.push(topLeft, bottomLeft, topRight);
      indices.push(topRight, bottomLeft, bottomRight);
    }
    
    geo.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geo.setIndex(indices);
    geo.computeVertexNormals();
    
    return geo;
  }, [width, height, segments]);
  
  return (
    <mesh ref={meshRef} position={position} geometry={geometry}>
      <meshBasicMaterial
        color={color}
        transparent
        opacity={0.9}
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </mesh>
  );
};

// Layered mountain silhouettes for depth
interface LayeredMountainsProps {
  basePosition?: [number, number, number];
}

const LayeredMountains: React.FC<LayeredMountainsProps> = ({
  basePosition = [0, -2, 0]
}) => {
  const groupRef = useRef<THREE.Group>(null);
  
  const layers = useMemo(() => [
    { z: -60, color: '#0d0515', height: 8, opacity: 0.95 },
    { z: -50, color: '#150a20', height: 10, opacity: 0.9 },
    { z: -40, color: '#1a0f2e', height: 12, opacity: 0.85 },
    { z: -30, color: '#251540', height: 14, opacity: 0.8 },
    { z: -20, color: '#2d1b4e', height: 16, opacity: 0.75 }
  ], []);
  
  const layerGeometries = useMemo(() => {
    return layers.map(layer => {
      const segments = 80;
      const vertices: number[] = [];
      const indices: number[] = [];
      const width = 120;
      
      const heights: number[] = [];
      for (let i = 0; i <= segments; i++) {
        let h = 0;
        h += Math.sin(i * 0.2 + layer.z * 0.1) * 0.4;
        h += Math.sin(i * 0.5 + layer.z * 0.05) * 0.25;
        h += Math.sin(i * 1.2) * 0.15;
        h += Math.sin(i * 0.05) * 0.2;
        h = (h + 1) * 0.5;
        h = Math.pow(h, 1.3);
        heights.push(h * layer.height);
      }
      
      for (let i = 0; i <= segments; i++) {
        const x = (i / segments - 0.5) * width;
        const y = heights[i];
        vertices.push(x, y, 0);
        vertices.push(x, -5, 0);
      }
      
      for (let i = 0; i < segments; i++) {
        const topLeft = i * 2;
        const bottomLeft = i * 2 + 1;
        const topRight = (i + 1) * 2;
        const bottomRight = (i + 1) * 2 + 1;
        
        indices.push(topLeft, bottomLeft, topRight);
        indices.push(topRight, bottomLeft, bottomRight);
      }
      
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
      geo.setIndex(indices);
      geo.computeVertexNormals();
      
      return { geometry: geo, ...layer };
    });
  }, [layers]);
  
  return (
    <group ref={groupRef} position={basePosition}>
      {layerGeometries.map((layer, i) => (
        <mesh key={i} position={[0, 0, layer.z]} geometry={layer.geometry}>
          <meshBasicMaterial
            color={layer.color}
            transparent
            opacity={layer.opacity}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
};

export { Mountains, MountainRange, LayeredMountains };
export default Mountains;