import { useEffect, useRef } from "react"
import * as THREE from "three"
import { Box } from "./Box"
import { Line } from "./Line"

export const Canvas = () => {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const elm = mountRef.current

    // シーン
    const scene = new THREE.Scene()

    // サイズ
    const sizes = {
      width: innerWidth,
      height: innerHeight
    }

    // カメラ
    const camera = new THREE.PerspectiveCamera(55, sizes.width / sizes.height, 0.1, 1000)

    // レンダラー
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    elm?.appendChild(renderer.domElement)
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(window.devicePixelRatio)

    // ライト
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7)
    scene.add(ambientLight)
    const pointLight = new THREE.PointLight(0xffffff, 0.2)
    pointLight.position.set(1, 2, 3)
    scene.add(pointLight)

    // Box
    const boxTick = Box({ scene: scene })

    // Line
    const lineTick = Line({ scene: scene })

    // アニメーション
    const tick = () => {
      boxTick()
      lineTick()
      window.requestAnimationFrame(tick)
      renderer.render(scene, camera)
    }
    tick()

    // ブラウザのリサイズ処理
    window.addEventListener("resize", () => {
      sizes.width = window.innerWidth
      sizes.height = window.innerHeight
      camera.aspect = sizes.width / sizes.height
      camera.updateProjectionMatrix()
      renderer.setSize(sizes.width, sizes.height)
      renderer.setPixelRatio(window.devicePixelRatio)
    })
    return () => {
      elm?.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={mountRef} />
}
