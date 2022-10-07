import { useEffect, useRef } from "react"
import * as THREE from "three"

export const Box = ({ scene }: { scene: THREE.Scene }) => {
  // ボックスジオメトリー
  const boxGeometry = new THREE.BoxGeometry(1, 1, 1)
  const boxMaterial = new THREE.MeshLambertMaterial({
    color: "#2497f0"
  })
  const box = new THREE.Mesh(boxGeometry, boxMaterial)
  box.position.z = -5
  box.rotation.set(10, 10, 10)
  const box2 = new THREE.Mesh(boxGeometry, boxMaterial)
  box2.position.z = -5
  box2.rotation.set(20, 20, 20)
  const box3 = new THREE.Mesh(boxGeometry, boxMaterial)
  const a = new THREE.Mesh()
  box3.position.z = -5
  box3.rotation.set(20, 20, 20)
  scene.add(box)
  scene.add(box2)
  scene.add(box3)

  const clock = new THREE.Clock()
  const tick = () => {
    const elapsedTime = clock.getElapsedTime()
    box.rotation.x = elapsedTime
    box.rotation.y = elapsedTime
    box2.rotation.x = elapsedTime + 5
    box2.rotation.y = elapsedTime + 5
    box3.rotation.x = elapsedTime + 1
    box3.rotation.y = elapsedTime + 1
  }

  return tick
}
