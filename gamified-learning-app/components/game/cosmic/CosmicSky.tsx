"use client";
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Custom gradient sky shader
const skyVertexShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  
  void main() {
    vUv = uv;
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const skyFragmentShader = `
  uniform float time;
  uniform vec3 topColor;
  uniform vec3 middleColor;
  uniform vec3 bottomColor;
  uniform vec3 sunColor;
  uniform float sunPosition;
  varying vec2 vUv;
  varying vec3 vPosition;
  
  void main() {
    // Create gradient
    vec3 color;
    
    // Multi-stop gradient
    if (vUv.y > 0.6) {
      // Top to middle
      float t = (vUv.y - 0.6) / 0.4;
      color = mix(middleColor, topColor, t);
    } else if (vUv.y > 0.3) {
      // Middle gradient
      float t = (vUv.y - 0.3) / 0.3;
      color = mix(bottomColor, middleColor, t);
    } else {
      // Bottom
      float t = vUv.y / 0.3;
      color = mix(bottomColor * 0.5, bottomColor, t);
    }
    
    // Add sunset glow
    float sunsetGlow = smoothstep(0.2, 0.5, vUv.y) * smoothstep(0.8, 0.5, vUv.y);
    float sunsetIntensity = pow(1.0 - abs(vUv.y - 0.35), 3.0);
    color = mix(color, sunColor, sunsetIntensity * 0.4);
    
    // Add subtle animation
    float wave = sin(vUv.x * 10.0 + time * 0.5) * 0.02;
    color += wave * sunsetGlow * 0.1;
    
    gl_FragColor = vec4(color, 1.0);
  }
`;

interface CosmicSkyProps {
  topColor?: string;
  middleColor?: string;
  bottomColor?: string;
  sunColor?: string;
}

const CosmicSky: React.FC<CosmicSkyProps> = ({
  topColor = '#0a0015',
  middleColor = '#1a0a3e',
  bottomColor = '#ff6b35',
  sunColor = '#ff9500'
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader: skyVertexShader,
      fragmentShader: skyFragmentShader,
      uniforms: {
        time: { value: 0 },
        topColor: { value: new THREE.Color(topColor) },
        middleColor: { value: new THREE.Color(middleColor) },
        bottomColor: { value: new THREE.Color(bottomColor) },
        sunColor: { value: new THREE.Color(sunColor) },
        sunPosition: { value: 0.35 }
      },
      side: THREE.BackSide,
      depthWrite: false
    });
  }, [topColor, middleColor, bottomColor, sunColor]);
  
  useFrame((state) => {
    material.uniforms.time.value = state.clock.getElapsedTime();
  });
  
  return (
    <mesh ref={meshRef} material={material}>
      <sphereGeometry args={[150, 32, 32]} />
    </mesh>
  );
};

// Volumetric light rays
interface VolumetricLightProps {
  position?: [number, number, number];
  color?: string;
  intensity?: number;
}

const VolumetricLight: React.FC<VolumetricLightProps> = ({
  position = [20, 5, -30],
  color = '#ff9500',
  intensity = 1
}) => {
  const groupRef = useRef<THREE.Group>(null);
  
  const rays = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => ({
      angle: (i / 12) * Math.PI * 2,
      length: 20 + Math.random() * 30,
      width: 0.5 + Math.random() * 1.5,
      opacity: 0.05 + Math.random() * 0.1
    }));
  }, []);
  
  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.getElapsedTime();
      groupRef.current.rotation.z = time * 0.02;
      
      groupRef.current.children.forEach((child, i) => {
        const material = (child as THREE.Mesh).material as THREE.MeshBasicMaterial;
        material.opacity = rays[i].opacity * (0.8 + Math.sin(time + i) * 0.2);
      });
    }
  });
  
  return (
    <group ref={groupRef} position={position}>
      {rays.map((ray, i) => (
        <mesh
          key={i}
          rotation={[0, 0, ray.angle]}
          position={[0, ray.length / 2, 0]}
        >
          <planeGeometry args={[ray.width, ray.length]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={ray.opacity}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
};

// Sun/Moon with glow
interface CelestialBodyProps {
  position?: [number, number, number];
  size?: number;
  color?: string;
  glowColor?: string;
  type?: 'sun' | 'moon';
}

const CelestialBody: React.FC<CelestialBodyProps> = ({
  position = [30, 10, -60],
  size = 5,
  color = '#ffcc00',
  glowColor = '#ff9500',
  type = 'sun'
}) => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.getElapsedTime();
      // Subtle pulsing
      const scale = 1 + Math.sin(time * 0.5) * 0.02;
      groupRef.current.scale.setScalar(scale);
    }
  });
  
  return (
    <group ref={groupRef} position={position}>
      {/* Core */}
      <mesh>
        <circleGeometry args={[size, 32]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={type === 'sun' ? 1 : 0.9}
        />
      </mesh>
      
      {/* Inner glow */}
      <mesh>
        <circleGeometry args={[size * 1.3, 32]} />
        <meshBasicMaterial
          color={glowColor}
          transparent
          opacity={0.5}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      
      {/* Outer glow */}
      <mesh>
        <circleGeometry args={[size * 2, 32]} />
        <meshBasicMaterial
          color={glowColor}
          transparent
          opacity={0.2}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      
      {/* Corona rays for sun */}
      {type === 'sun' && (
        <group>
          {Array.from({ length: 16 }, (_, i) => (
            <mesh
              key={i}
              rotation={[0, 0, (i / 16) * Math.PI * 2]}
            >
              <planeGeometry args={[0.5, size * 3]} />
              <meshBasicMaterial
                color={glowColor}
                transparent
                opacity={0.1}
                blending={THREE.AdditiveBlending}
                depthWrite={false}
              />
            </mesh>
          ))}
        </group>
      )}
    </group>
  );
};

// Ambient light setup for the scene
interface CosmicLightingProps {
  sunsetIntensity?: number;
  ambientIntensity?: number;
}

const CosmicLighting: React.FC<CosmicLightingProps> = ({
  sunsetIntensity = 0.5,
  ambientIntensity = 0.3
}) => {
  const lightRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (lightRef.current) {
      const time = state.clock.getElapsedTime();
      // Subtle light movement
      lightRef.current.rotation.y = time * 0.05;
    }
  });
  
  return (
    <group ref={lightRef}>
      {/* Main sunset light */}
      <directionalLight
        position={[30, 10, -20]}
        intensity={sunsetIntensity}
        color="#ff9500"
      />
      
      {/* Ambient fill */}
      <ambientLight intensity={ambientIntensity} color="#4a1a6b" />
      
      {/* Rim light from planet */}
      <pointLight
        position={[15, 8, -30]}
        intensity={20}
        color="#ff6b9d"
        distance={100}
      />
      
      {/* City glow */}
      <pointLight
        position={[0, 2, -15]}
        intensity={15}
        color="#00ffff"
        distance={50}
      />
      
      {/* Accent lights */}
      <pointLight
        position={[-20, 5, -10]}
        intensity={10}
        color="#ff00ff"
        distance={40}
      />
      <pointLight
        position={[20, 5, -10]}
        intensity={10}
        color="#6b9dff"
        distance={40}
      />
    </group>
  );
};

// Fog effect for depth
interface CosmicFogProps {
  color?: string;
  near?: number;
  far?: number;
}

const CosmicFog: React.FC<CosmicFogProps> = ({
  color = '#0a0515',
  near = 20,
  far = 100
}) => {
  return null; // Fog is applied via Canvas prop, this is just for documentation
};

export { CosmicSky, VolumetricLight, CelestialBody, CosmicLighting, CosmicFog };
export default CosmicSky;