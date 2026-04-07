import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';
import { Suspense } from 'react';
import { ShippingContainer3D } from './ShippingContainer3D';
import { Globe3D } from './Globe3D';

interface Scene3DProps {
  type: 'container' | 'globe';
  className?: string;
}

export const Scene3D = ({ type, className = '' }: Scene3DProps) => {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#00d4ff" />
        <Suspense fallback={null}>
          {type === 'container' ? (
            <>
              <ShippingContainer3D position={[0, 0, 0]} color="#1e90ff" />
              <ShippingContainer3D position={[2.5, 0.5, -1]} rotation={[0, 0.5, 0]} color="#00d4ff" />
              <ShippingContainer3D position={[-2.5, -0.5, -1]} rotation={[0, -0.5, 0]} color="#ff6b35" />
            </>
          ) : (
            <Globe3D />
          )}
          <Environment preset="city" />
        </Suspense>
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={type === 'globe'}
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  );
};
