import '@/styles/style.css'
import { GL } from '@/js/GL';
import type { AppProps } from 'next/app'
import Layout from '@/components/Layout';
import { useEffect } from 'react';
import React from 'react';
import { Canvas, useFrame } from '@react-three/fiber'
import { useRef, useState } from 'react'
import LandingGL from '@/js/LandingGL';
import { Environment } from '@react-three/drei';
function Box(props:any) {
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

export default function App({ Component, pageProps }: AppProps) {
 useEffect(()=>{
  console.log("mounting")
 })
  return (<>
<Layout>
      <Component {...pageProps} />
    </Layout>
    <GL/>

  </>)
}
