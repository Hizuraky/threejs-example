import * as THREE from "three"
import React, { useRef, useState, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { vertexShader, fragmentShader } from "./shader"

export const TCanvas = () => {
  let frame = 0

  const Box = ({ position }: { position: number[] }) => {
    const ref = useRef<THREE.Mesh>(null!)
    const [hovered, hover] = useState(false)

    useFrame(() => {
      ref.current.rotation.x += 0.1
      ref.current.rotation.y += 0.1
      ref.current.position.z -= 0.001
      if (hovered) {
        ref.current.position.x += position[0] < 0 ? -0.002 : 0.002
        ref.current.position.y += position[1] < 0 ? -0.002 : 0.002
      }
    })

    return (
      <mesh
        position={
          new THREE.Vector3(
            ref.current?.position.x ?? position[0],
            ref.current?.position.y ?? position[1],
            ref.current?.position.z ?? position[2]
          )
        }
        ref={ref}
        onPointerOver={() => hover(true)}
        onPointerOut={() => hover(false)}
      >
        <boxGeometry args={[0.01, 0.01, 0.01]} />
        <meshStandardMaterial
          color={"rgb(" + ~~(30 * Math.random()) + ", " + ~~(30 * Math.random()) + ", " + ~~(200 * Math.random()) + ")"}
        />
      </mesh>
    )
  }

  const Plane = () => {
    const planePositions = useMemo(() => {
      const planeGeometry = new THREE.PlaneGeometry(6, 6, 128, 128)
      const positions = planeGeometry.attributes.position.array

      return positions
    }, [])

    const shaderArgs = useMemo(
      () => ({
        uniforms: {
          uTime: { value: 0 }
        },
        vertexShader,
        fragmentShader
      }),
      []
    )

    const vec = new THREE.Vector3()

    useFrame((state) => {
      frame < 3 && (frame += 0.0005)
      shaderArgs.uniforms.uTime.value++
      state.camera.position.lerp(vec.set(0, 0, frame), 0.1)
      state.camera.updateProjectionMatrix()
    })

    const PlaneGeometry = () => (
      <>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" array={planePositions} itemSize={3} count={planePositions.length / 3} />
        </bufferGeometry>
        <shaderMaterial args={[shaderArgs]} depthTest={false} depthWrite={false} />
      </>
    )

    return (
      <>
        <points rotation={[-Math.PI / 3, 1, 3]}>
          <PlaneGeometry />
        </points>
        <points rotation={[-Math.PI / -3, 1, -3]}>
          <PlaneGeometry />
        </points>
      </>
    )
  }

  return (
    <div className="canvas">
      <Canvas>
        <pointLight position={[1, 1, 1]} />
        {[...Array(10)].map((_, i) => (
          <Box key={i} position={[Math.random() * 0.8 - 0.4, Math.random() * 0.8 - 0.4, Math.random() - 0.5]} />
        ))}
        {[...Array(20)].map((_, i) => (
          <Box key={i} position={[Math.random() * 1.6 - 0.8, Math.random() * 1.6 - 0.8, Math.random() - 0.1]} />
        ))}
        {[...Array(40)].map((_, i) => (
          <Box key={i} position={[Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() + 1]} />
        ))}
        {[...Array(50)].map((_, i) => (
          <Box key={i} position={[Math.random() * 4 - 2, Math.random() * 4 - 2, Math.random() + 2]} />
        ))}
        {[...Array(60)].map((_, i) => (
          <Box key={i} position={[Math.random() * 6 - 3, Math.random() * 6 - 3, Math.random() + 3]} />
        ))}
        <Plane />
      </Canvas>
    </div>
  )
}
