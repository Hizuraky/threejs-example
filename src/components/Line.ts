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

  // function createLine(rx, ry, rz, c) {
  //   const lines = [];
  //   const time = Date.now() / 10000;
  //   for (let j = 0; j < lineNum; j++) {
  //     const linePoints = [];
  //     for (let i = 0; i < segmentNum; i++) {
  //       // x座標
  //       // 始点と終点をくっつけたいから"segmentNum - 1"にする
  //       const x = 100 * Math.cos(degToRad(360 / (segmentNum - 1) * i)) + j * 0.02 + rx;
  //       // y座標
  //       const px = i / 40;
  //       const py = time;
  //       const y = 5 * noise .perlin2(px, py) + ry;
  //       // z座標
  //       // 始点と終点をくっつけたいから"segmentNum - 1"にする
  //       const z = 100 * Math.sin(degToRad(360 / (segmentNum - 1) * i)) + rz;
  //       // カメラの視点用
  //       points.push(new THREE.Vector3(x, y, z));
  //       // 線のポイント用
  //       linePoints.push(new THREE.Vector3(x, y, z));
  //     }
  //     const geo = new THREE.BufferGeometry().setFromPoints(linePoints);
  //     const mat = new THREE.LineBasicMaterial({color: c});
  //     const line = new THREE.Line(geo, mat);
  //     lines.push(line);
  //     scene.add(line);
  //   }
  //   return lines;
  // }

  return tick
}
