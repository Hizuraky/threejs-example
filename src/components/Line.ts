import { useEffect, useRef } from "react"
import * as THREE from "three"

export const Line = ({ scene }: { scene: THREE.Scene }) => {
  const points = []
  points.push(new THREE.Vector3(-2, 0, 0))
  points.push(new THREE.Vector3(0, 2, 0))
  points.push(new THREE.Vector3(2, 0, 0))
  const material = new THREE.LineBasicMaterial({ color: 0x0000ff })
  const geometry = new THREE.BufferGeometry().setFromPoints(points)
  const line = new THREE.Line(geometry, material)
  line.position.z = -5
  scene.add(line)

  const clock = new THREE.Clock()
  const tick = () => {
    const elapsedTime = clock.getElapsedTime()
    line.rotation.x = elapsedTime + 1
    line.rotation.y = elapsedTime + 1
  }

  return tick
}
