import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

interface ShippingContainer3DProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  color?: string;
}

export const ShippingContainer3D = ({ 
  position = [0, 0, 0], 
  rotation = [0, 0, 0],
  color = "#1e90ff"
}: ShippingContainer3DProps) => {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group position={position} rotation={rotation}>
      <mesh ref={meshRef} castShadow receiveShadow>
        <boxGeometry args={[2, 1, 1]} />
        <meshStandardMaterial color={color} metalness={0.6} roughness={0.4} />
      </mesh>
      
      {/* Container details */}
      <mesh position={[0, 0, 0.51]} castShadow>
        <boxGeometry args={[1.8, 0.8, 0.02]} />
        <meshStandardMaterial color="#ffffff" metalness={0.3} roughness={0.7} />
      </mesh>
      
      {/* Side corrugations */}
      {[-0.4, -0.2, 0, 0.2, 0.4].map((x, i) => (
        <mesh key={i} position={[x, 0, 0.505]} castShadow>
          <boxGeometry args={[0.05, 0.9, 0.02]} />
          <meshStandardMaterial color="#e0e0e0" metalness={0.4} roughness={0.6} />
        </mesh>
      ))}
    </group>
  );
};
