import * as THREE from 'three'
import { useEffect, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { useCursor, Image, Text, Plane } from '@react-three/drei'
import { useRoute, useLocation } from 'wouter'
import { easing } from 'maath'
import getUuid from 'uuid-by-string'
import { loadManager } from '@/pages/atoms'
import { useAtom } from 'jotai'


const GOLDENRATIO = 1.61803398875

export const Gallery = ({ images }:{images:any}) => (

      <Frames images={images} />

)

function Frames({images}: {images:any}, {q = new THREE.Quaternion(), p = new THREE.Vector3() }) {
  const ref = useRef<any>()
  const clicked = useRef<any>()
  const [, params] = useRoute('/item/:id')
  const [, setLocation] = useLocation()
  useEffect(() => {
    clicked.current = ref.current.getObjectByName(params?.id)
    if (clicked.current) {
      clicked.current.parent.updateWorldMatrix(true, true)
      clicked.current.parent.localToWorld(p.set(0, GOLDENRATIO / 2, 1.25))
      clicked.current.parent.getWorldQuaternion(q)
    } else {
      p.set(0, 10, 20)
      q.identity()
    }
  })
  useFrame((state, dt) => {
    easing.damp3(state.camera.position, p, 0.4, dt)
    easing.dampQ(state.camera.quaternion, q, 0.4, dt)
  })
  return (
    <group
      ref={ref}
      position={[0,0,-30]}
      onClick={(e) => (e.stopPropagation(), setLocation(clicked.current === e.object ? '/' : '/item/' + e.object.name))}
      onPointerMissed={() => setLocation('/')}>
      {images.map((props:any) => <Frame key={props.url} {...props} /> /* prettier-ignore */)}
    </group>
  )
}

function Frame({ url, c = new THREE.Color(), ...props }:any) {
    const [manager, setManager] = useAtom<any>(loadManager)
  const image = useRef<any>(!null)
  const frame = useRef<any>(!null)
  const [, params] = useRoute('/item/:id')
  const [hovered, hover] = useState(false)
  const [rnd] = useState(() => Math.random())
  const name = getUuid(url)
  const isActive = params?.id === name
  useCursor(hovered)
//   useFrame((state, dt) => {
//     image.current.material.zoom = 2 + Math.sin(rnd * 10000 + state.clock.elapsedTime / 3) / 2
//     easing.damp3(image.current.scale, [0.85 * (!isActive && hovered ? 0.85 : 1), 0.9 * (!isActive && hovered ? 0.905 : 1), 1], 0.1, dt)
//     easing.dampC(frame.current.material.color, hovered ? 'orange' : 'white', 0.1, dt)
//   })
  const texture:any = new THREE.TextureLoader(manager).load(url)
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  return (
    <group {...props}>
      <Plane args={[10,20, undefined, undefined]}>
        <meshBasicMaterial map={texture} transparent/>
      </Plane>
      <Text maxWidth={0.1} anchorX="left" anchorY="top" position={[0.55, GOLDENRATIO, 0]} fontSize={0.025}>
        {name.split('-').join(' ')}
      </Text>
    </group>
  )
}
