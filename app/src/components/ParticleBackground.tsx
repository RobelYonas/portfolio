import { useRef, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticleFieldProps {
  count?: number;
  mousePosition: React.MutableRefObject<{ x: number; y: number }>;
}

const ParticleField: React.FC<ParticleFieldProps> = ({ count = 80, mousePosition }) => {
  const meshRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  const [positions, velocities] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;

      velocities[i * 3] = (Math.random() - 0.5) * 0.01;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.01;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.005;
    }

    return [positions, velocities];
  }, [count]);

  const linePositions = useMemo(() => {
    return new Float32Array(count * count * 6);
  }, [count]);

  const lineColors = useMemo(() => {
    return new Float32Array(count * count * 6);
  }, [count]);

  useFrame(() => {
    if (!meshRef.current) return;

    const positionAttribute = meshRef.current.geometry.attributes.position;
    const posArray = positionAttribute.array as Float32Array;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Update positions
      posArray[i3] += velocities[i3];
      posArray[i3 + 1] += velocities[i3 + 1];
      posArray[i3 + 2] += velocities[i3 + 2];

      // Boundary check and bounce
      if (Math.abs(posArray[i3]) > 10) velocities[i3] *= -1;
      if (Math.abs(posArray[i3 + 1]) > 10) velocities[i3 + 1] *= -1;
      if (Math.abs(posArray[i3 + 2]) > 5) velocities[i3 + 2] *= -1;

      // Mouse repulsion
      const mouseX = mousePosition.current.x * 10;
      const mouseY = mousePosition.current.y * 10;
      const dx = posArray[i3] - mouseX;
      const dy = posArray[i3 + 1] - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 3) {
        const force = (3 - dist) / 3;
        posArray[i3] += dx * force * 0.02;
        posArray[i3 + 1] += dy * force * 0.02;
      }
    }

    positionAttribute.needsUpdate = true;

    // Update lines
    if (linesRef.current) {
      const linePosArray = linesRef.current.geometry.attributes.position.array as Float32Array;
      const lineColorArray = linesRef.current.geometry.attributes.color.array as Float32Array;
      let lineIndex = 0;

      for (let i = 0; i < count; i++) {
        for (let j = i + 1; j < count; j++) {
          const dx = posArray[i * 3] - posArray[j * 3];
          const dy = posArray[i * 3 + 1] - posArray[j * 3 + 1];
          const dz = posArray[i * 3 + 2] - posArray[j * 3 + 2];
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < 3 && lineIndex < count * count * 6 - 6) {
            linePosArray[lineIndex] = posArray[i * 3];
            linePosArray[lineIndex + 1] = posArray[i * 3 + 1];
            linePosArray[lineIndex + 2] = posArray[i * 3 + 2];
            linePosArray[lineIndex + 3] = posArray[j * 3];
            linePosArray[lineIndex + 4] = posArray[j * 3 + 1];
            linePosArray[lineIndex + 5] = posArray[j * 3 + 2];

            const alpha = 1 - dist / 3;
            lineColorArray[lineIndex] = 0.9 * alpha;
            lineColorArray[lineIndex + 1] = 0.49 * alpha;
            lineColorArray[lineIndex + 2] = 0.13 * alpha;
            lineColorArray[lineIndex + 3] = 0.9 * alpha;
            lineColorArray[lineIndex + 4] = 0.49 * alpha;
            lineColorArray[lineIndex + 5] = 0.13 * alpha;

            lineIndex += 6;
          }
        }
      }

      // Clear remaining lines
      for (let i = lineIndex; i < count * count * 6; i++) {
        linePosArray[i] = 0;
        lineColorArray[i] = 0;
      }

      linesRef.current.geometry.attributes.position.needsUpdate = true;
      linesRef.current.geometry.attributes.color.needsUpdate = true;
    }
  });

  return (
    <>
      <points ref={meshRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.08}
          color="#e67e22"
          transparent
          opacity={0.8}
          sizeAttenuation
        />
      </points>

      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[lineColors, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          vertexColors
          transparent
          opacity={0.3}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
    </>
  );
};

const ParticleBackground: React.FC = () => {
  const mousePosition = useRef({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      };
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0"
      style={{ background: 'linear-gradient(to bottom, #1a1a1a, #0f0f0f)' }}
    >
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ParticleField mousePosition={mousePosition} count={60} />
      </Canvas>
    </div>
  );
};

export default ParticleBackground;
