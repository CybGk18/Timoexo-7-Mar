import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Line, Text } from '@react-three/drei';
import { Mesh, Vector3 } from 'three';

export const Globe3D = () => {
  const globeRef = useRef<Mesh>(null);

  useFrame(() => {
    if (globeRef.current) {
      globeRef.current.rotation.y += 0.002;
    }
  });

  // Pin points for Asia and Europe
  const pinPoints = useMemo(() => [
    {
      position: new Vector3(1.2, 0.6, 0.5), // Asia
      label: "Asia",
      color: "#ff6b35"
    },
    {
      position: new Vector3(-0.4, 0.8, 1.2), // Europe
      label: "Europe",
      color: "#00d4ff"
    },
  ], []);

  // Trade routes connecting Asia and Europe
  const routes = useMemo(() => [
    {
      start: new Vector3(1.2, 0.6, 0.5), // Asia
      end: new Vector3(-0.4, 0.8, 1.2), // Europe
      color: "#00ff88"
    },
  ], []);

  return (
    <group>
      {/* Main Globe - Realistic Earth colors */}
      <Sphere ref={globeRef} args={[1.5, 64, 64]}>
        <meshStandardMaterial
          color="#2a5c8f"
          metalness={0.3}
          roughness={0.7}
          wireframe={false}
          opacity={1}
        />
      </Sphere>

      {/* Ocean overlay with blue tint */}
      <Sphere args={[1.51, 64, 64]}>
        <meshStandardMaterial 
          color="#1e4d7a" 
          opacity={0.3} 
          transparent={true}
          wireframe={true}
        />
      </Sphere>

      {/* Asia continent highlight (light golden) */}
      <Sphere args={[1.52, 32, 32]} position={[0.3, 0.1, 0]} scale={[0.8, 0.7, 0.6]}>
        <meshBasicMaterial 
          color="#FFD700" 
          opacity={0.25} 
          transparent={true} 
          wireframe={false}
        />
      </Sphere>

      {/* Europe continent highlight (light golden) */}
      <Sphere args={[1.52, 32, 32]} position={[-0.2, 0.2, 0.3]} scale={[0.4, 0.35, 0.3]}>
        <meshBasicMaterial 
          color="#FFD700" 
          opacity={0.25} 
          transparent={true} 
          wireframe={false}
        />
      </Sphere>

      {/* Atmosphere glow */}
      <Sphere args={[1.6, 64, 64]}>
        <meshBasicMaterial 
          color="#87ceeb" 
          opacity={0.1} 
          transparent={true} 
          side={1}
        />
      </Sphere>

      {/* Trade routes */}
      {routes.map((route, i) => (
        <Line
          key={i}
          points={[route.start, route.end]}
          color={route.color}
          lineWidth={3}
          opacity={0.8}
          transparent={true}
          dashed={true}
          dashSize={0.1}
          gapSize={0.05}
        />
      ))}

      {/* Pin points for Asia and Europe */}
      {pinPoints.map((pin, i) => (
        <group key={i}>
          {/* Pin marker */}
          <mesh position={pin.position}>
            <cylinderGeometry args={[0.02, 0.06, 0.3, 8]} />
            <meshStandardMaterial
              color={pin.color}
              emissive={pin.color}
              emissiveIntensity={0.8}
            />
          </mesh>
          
          {/* Pin top sphere */}
          <mesh position={[pin.position.x, pin.position.y + 0.15, pin.position.z]}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshStandardMaterial
              color={pin.color}
              emissive={pin.color}
              emissiveIntensity={1}
            />
          </mesh>

          {/* Pulsing ring around pin */}
          <mesh position={pin.position} rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.1, 0.15, 32]} />
            <meshBasicMaterial
              color={pin.color}
              opacity={0.5}
              transparent={true}
            />
          </mesh>
        </group>
      ))}

      {/* Continent Labels */}
      <Text
        position={[1.4, 0.7, 0.6]}
        fontSize={0.15}
        color="#FFD700"
        fontWeight="bold"
        outlineWidth={0.02}
        outlineColor="#000000"
      >
        ASIA
      </Text>

      <Text
        position={[-0.5, 0.9, 1.3]}
        fontSize={0.15}
        color="#FFD700"
        fontWeight="bold"
        outlineWidth={0.02}
        outlineColor="#000000"
      >
        EUROPE
      </Text>
    </group>
  );
};
