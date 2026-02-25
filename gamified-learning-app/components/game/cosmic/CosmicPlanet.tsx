"use client";
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Custom atmospheric shader for the planet
const atmosphereVertexShader = `
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec2 vUv;
  
  void main() {
    vNormal = normalize(normalMatrix * normal);
    vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const atmosphereFragmentShader = `
  uniform float time;
  uniform vec3 glowColor;
  uniform vec3 coreColor;
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec2 vUv;
  
  // Noise function for surface details
  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }
  
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }
  
  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    for(int i = 0; i < 5; i++) {
      value += amplitude * noise(p);
      p *= 2.0;
      amplitude *= 0.5;
    }
    return value;
  }
  
  void main() {
    // Fresnel effect for atmospheric glow
    vec3 viewDir = normalize(-vPosition);
    float fresnel = pow(1.0 - max(dot(viewDir, vNormal), 0.0), 3.0);
    
    // Animated surface patterns
    vec2 uv = vUv * 4.0;
    float pattern = fbm(uv + time * 0.05);
    float pattern2 = fbm(uv * 2.0 - time * 0.03);
    
    // Color mixing
    vec3 baseColor = mix(coreColor, glowColor, pattern);
    baseColor = mix(baseColor, vec3(1.0, 0.5, 0.8), pattern2 * 0.3);
    
    // Add atmospheric rim
    vec3 atmosphereColor = mix(glowColor, vec3(1.0, 0.8, 0.9), fresnel);
    
    // Final color with glow
    vec3 finalColor = mix(baseColor, atmosphereColor, fresnel * 0.8);
    finalColor += glowColor * fresnel * 0.5;
    
    // Add some bright spots
    float spots = smoothstep(0.6, 0.8, pattern * pattern2);
    finalColor += vec3(1.0, 0.9, 1.0) * spots * 0.3;
    
    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

const glowVertexShader = `
  varying vec3 vNormal;
  varying vec3 vPosition;
  
  void main() {
    vNormal = normalize(normalMatrix * normal);
    vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const glowFragmentShader = `
  uniform vec3 glowColor;
  uniform float intensity;
  varying vec3 vNormal;
  varying vec3 vPosition;
  
  void main() {
    vec3 viewDir = normalize(-vPosition);
    float fresnel = pow(1.0 - max(dot(viewDir, vNormal), 0.0), 2.0);
    vec3 color = glowColor * fresnel * intensity;
    gl_FragColor = vec4(color, fresnel * 0.6);
  }
`;

interface CosmicPlanetProps {
  position?: [number, number, number];
  size?: number;
  coreColor?: string;
  glowColor?: string;
}

const CosmicPlanet: React.FC<CosmicPlanetProps> = ({
  position = [15, 8, -30],
  size = 8,
  coreColor = '#4a1a6b',
  glowColor = '#ff6b9d'
}) => {
  const planetRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  
  const planetMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader: atmosphereVertexShader,
      fragmentShader: atmosphereFragmentShader,
      uniforms: {
        time: { value: 0 },
        glowColor: { value: new THREE.Color(glowColor) },
        coreColor: { value: new THREE.Color(coreColor) }
      }
    });
  }, [coreColor, glowColor]);
  
  const glowMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader: glowVertexShader,
      fragmentShader: glowFragmentShader,
      uniforms: {
        glowColor: { value: new THREE.Color(glowColor) },
        intensity: { value: 1.5 }
      },
      transparent: true,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
  }, [glowColor]);
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    planetMaterial.uniforms.time.value = time;
    
    if (planetRef.current) {
      planetRef.current.rotation.y = time * 0.02;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = time * 0.01;
    }
  });
  
  return (
    <group position={position}>
      {/* Main planet */}
      <mesh ref={planetRef} material={planetMaterial}>
        <sphereGeometry args={[size, 64, 64]} />
      </mesh>
      
      {/* Atmospheric glow */}
      <mesh ref={glowRef} material={glowMaterial}>
        <sphereGeometry args={[size * 1.15, 32, 32]} />
      </mesh>
      
      {/* Outer glow layer */}
      <mesh>
        <sphereGeometry args={[size * 1.3, 32, 32]} />
        <meshBasicMaterial
          color={glowColor}
          transparent
          opacity={0.1}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      
      {/* Planetary ring */}
      <mesh ref={ringRef} rotation={[Math.PI / 3, 0, 0]}>
        <ringGeometry args={[size * 1.4, size * 2, 64]} />
        <meshBasicMaterial
          color="#ff9ed2"
          transparent
          opacity={0.3}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
};

export default CosmicPlanet;