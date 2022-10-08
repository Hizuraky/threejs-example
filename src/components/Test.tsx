import * as THREE from "three"
import { Vector3 } from "three"
import React, { useRef, useState, useMemo } from "react"
import { Canvas, useFrame, ThreeElements } from "@react-three/fiber"
import { vertexShader, fragmentShader } from "./shader"

export const Test = () => {
  const ref3 = useRef<HTMLDivElement>(null)
  let x = 10
  let y = 10
  const click = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    x = e.pageX
    y = e.pageY
  }

  const Box = (props: ThreeElements["mesh"]) => {
    const ref = useRef<THREE.Mesh>(null!)
    const [hovered, hover] = useState(false)
    const [clicked, click] = useState(false)
    const vec = new THREE.Vector3()
    useFrame((state, delta) => {
      ref.current.rotation.x += 0.01
      ref.current.rotation.y += 0.01
      // state.camera.lookAt(ref.current.position)
      // state.camera.position.lerp(vec.set(ref.current.rotation.y, 0, ref.current.rotation.y), 0.1)
      // state.camera.updateProjectionMatrix()
    })
    return (
      <mesh
        {...props}
        ref={ref}
        scale={clicked ? 1.5 : 1}
        onClick={(event) => click(!clicked)}
        onPointerOver={(event) => hover(true)}
        onPointerOut={(event) => hover(false)}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
      </mesh>
    )
  }

  const Line = () => {
    const ref = useRef<THREE.Mesh>(null!)
    const [hovered, hover] = useState(false)
    const [clicked, click] = useState(false)
    const vec = new THREE.Vector3()
    const points: any = []
    points.push(new Vector3(-2, 0, 0))
    points.push(new Vector3(0, 2, 0))
    points.push(new Vector3(2, 0, 0))

    useFrame((state, delta) => {
      ref.current.rotation.x += 0.01
      ref.current.rotation.y += 0.01
      // state.camera.lookAt(ref.current.position)
      // state.camera.position.lerp(vec.set(ref.current.rotation.y, 0, ref.current.rotation.y), 0.1)
      // state.camera.updateProjectionMatrix()
    })
    return (
      <mesh
        ref={ref}
        // scale={clicked ? 1.5 : 1}
        onClick={(event) => click(!clicked)}
        onPointerOver={(event) => hover(true)}
        onPointerOut={(event) => hover(false)}
      >
        <lineBasicMaterial color={hovered ? "hotpink" : "orange"} />
        <bufferGeometry setFromPoints={points} />
      </mesh>
    )
  }

  const Plane = (props: ThreeElements["mesh"]) => {
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

    useFrame(() => {
      shaderArgs.uniforms.uTime.value++
    })
    return (
      <points rotation={[-Math.PI / 2, 0, 0]}>
        <bufferGeometry attach="geometry">
          <bufferAttribute attach="attributes-position" array={planePositions} itemSize={3} count={planePositions.length / 3} />
        </bufferGeometry>
        <shaderMaterial args={[shaderArgs]} transparent depthTest={false} depthWrite={false} />
      </points>
    )
  }

  return (
    <div style={{ height: "100vh", width: "100vw" }} ref={ref3} onClick={(e) => click(e)}>
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        {/* <Box position={[-1, 0, 0]} />
        <Box position={[1, 0, 0]} /> */}
        <Line />
        <Plane />
      </Canvas>
    </div>
  )
}
