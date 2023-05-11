import * as THREE from 'three'
import React, { Suspense, useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Reflector, Text, useTexture, useGLTF, MeshReflectorMaterial } from '@react-three/drei'

function Ground() {
    const [floor, normal] = useTexture(['/textures/SurfaceImperfections003_1K_var1.jpg', '/textures/SurfaceImperfections003_1K_Normal.jpg'])
    return (
        <mesh rotation={[-Math.PI / 2, 0, Math.PI / 2]} position={[0,0,-50]}>
        <planeGeometry args={[100, 200]} />
        <MeshReflectorMaterial blur={[400, 100]} resolution={512} mirror={1} mixBlur={6} mixStrength={1.5}  color="#111111" metalness={0.4} roughnessMap={floor} normalMap={normal} normalScale={new THREE.Vector2(2,2)}>
        </MeshReflectorMaterial>
      </mesh>
       
    )
}

function VideoText({ position }: any) {
    const [video] = useState(() => Object.assign(document.createElement('video'), { src: '/videos/RuleZero.webm.mp4', crossOrigin: 'Anonymous', loop: true, muted: true }))
    useEffect(() => void video.play(), [video])
    return (
        <Text font="/fonts/prompt-v10-latin-900italic.woff" 
        fontSize={15}
         maxWidth={10}
            characters="abcdefghijklmnopqrstuvwxyz0123456789!"
            anchorX="center"
            anchorY="middle" 
            textAlign='center'
            letterSpacing={0} 
            lineHeight={0.8}
            position={position}>
            RULE ZERO
            <meshBasicMaterial toneMapped={false}>
                <videoTexture attach="map" args={[video]} encoding={THREE.sRGBEncoding} />
            </meshBasicMaterial>
        </Text>
    )
}

function Box({props}:any) {
    // This reference will give us direct access to the mesh
    const mesh = useRef<any>(!null)
    // Set up state for the hovered and active state
    const [hovered, setHover] = useState(false)
    const [active, setActive] = useState(false)
    // Subscribe this component to the render-loop, rotate the mesh every frame
    useFrame((state, delta) => (mesh.current.rotation.x += delta))
    // Return view, these are regular three.js elements expressed in JSX
    return (
      <mesh
        {...props}
        ref={mesh}
        scale={active ? 1.5 : 1}
        onClick={(event) => setActive(!active)}
        onPointerOver={(event) => setHover(true)}
        onPointerOut={(event) => setHover(false)}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
      </mesh>
    )
  }
  

export default function LandingGL() {
    return (
        <>
        <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <spotLight position={[0, 10, -12]} intensity={0.3} />
        <directionalLight position={[-50, 0, -40]} intensity={1.7} />
            <VideoText position={[20, 10, -12]} />
            <Ground />
            </Suspense>
        </>
    )
}