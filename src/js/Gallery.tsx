import * as THREE from 'three'
import { Suspense, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { ReactThreeFiber, extend, useFrame, useThree } from '@react-three/fiber'
import { useCursor, Image, Text, Plane, MeshPortalMaterial, useAspect, GradientTexture, CameraControls, QuadraticBezierLine } from '@react-three/drei'
import { useRoute, useLocation } from 'wouter'
import { easing } from 'maath'
import getUuid from 'uuid-by-string'
import { loadManager } from '@/pages/atoms'
import { useAtom } from 'jotai'
import { useRouter } from 'next/router'
import { motion as motion3d } from 'framer-motion-3d'
import * as geometry from "maath/geometry";
import { RoundedPlaneGeometry } from 'maath/geometry'
import { useAnimationControls } from 'framer-motion'
import { images } from './images'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      roundedPlaneGeometry: ReactThreeFiber.Object3DNode<RoundedPlaneGeometry, typeof RoundedPlaneGeometry>
    }
  }
}

extend(geometry)

const variants = {
  enter: { scale: 1 },
  leave: { scale: 0 }
}

export const Gallery = () => {
  return (<>
    <Frames images={images} />
  </>
  )
}

function Frames({ images }: { images: any }) {
  const router = useRouter();
  const [disposed, setDisposed] = useState(false)
  const [isInPage, setIsInPage] = useState(false)
  const [location, setLocation] = useLocation()
  var p = new THREE.Vector3();
  var q = new THREE.Quaternion();
  const clicked = useRef<any>(!null)
  const ref = useRef<any>(null!)
  const [, params] = useRoute('/about/item/:id')
  const { size, camera } = useThree();
  size.updateStyle
  const [w, h] = useAspect(size.width, size.height)
  const radius = Math.max(1.5, Math.min(w / 2, 100));
  const GOLDENRATIO = 1.61803398875

    // making curve along which to place cards 
    const curve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3( 30,0,0 ),
      new THREE.Vector3( 0,0,-10 ),
      new THREE.Vector3( -30,0,0 ),
    );
  
    const points = curve.getPoints( images.length - 1 );

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
  },[clicked])

  useFrame((state, dt) =>{ 
    easing.damp3(state.camera.position, p, 0.4, dt);
    easing.dampQ(state.camera.quaternion, q, 0.4, dt);
  })

  useEffect(() => {
    setDisposed(false)
    if (router.pathname === "/about") {
      setTimeout(() => {
        setIsInPage(true)
      }, 1000)
    } else {
      setIsInPage(false)
    }
  }, [router])

  function onComplete() {
    setDisposed(!isInPage)
  }



  return (
    <>
    <Suspense>
      <motion3d.group
        onClick={(e) => (e.stopPropagation(), setLocation(clicked.current === e.object ? '/about' : '/about/item/' + e.object.name))}
        // onPointerMissed={() => {
        //   p.set(0, 10, 20)
        // }}
        visible={!disposed}
        variants={variants}
        animate={isInPage ? "enter" : "leave"}
        transition={{ staggerChildren: 0.2, delayChildren: 0.5 }}
        onAnimationComplete={(e: any) => (onComplete())}
        ref={ref}
        position={[0, 0, -30]}>
        {images.map((props: any, index: number) =>
          <Picture position={points[index]} key={props.url + index} id={"0" + (index)} {...props} bg={`#3aaa${index}${index}`} bg2={`#3111${index}${index}`} />
        )}
      </motion3d.group>
    </Suspense>
    </>
  )
}

function Picture({ position,children, creator, id, bg, bg2, url, c = new THREE.Color(), width = 1 * 7, height = 1.61803398875 * 7, ...props }: any) {
  const [manager, setManager] = useAtom<any>(loadManager)
  const portal = useRef<any>(!null)
  const card = useRef<any>(!null)
  const [, params] = useRoute('/about/item/:id')
  const [location, setLocation] = useLocation()
  const { size } = useThree();
  size.updateStyle
  const [w, h] = useAspect(size.width, size.height)
  const [hovered, hover] = useState(false)
  const [rnd] = useState(() => Math.random())

  useEffect(()=>{
    card.current.lookAt(0,0,0)
  }, [])

  const texture: any = useMemo(() => new THREE.TextureLoader(manager).load(url, onload = (texture: any) => { texture.wrapS = texture.wrapT = THREE.RepeatWrapping }), []);
  useCursor(hovered)
  useFrame((state, dt) => {
    // easing.damp(portal.current, 'blend', params?.id === id ? 1 : 0, 0.2, dt);
  })


  return (
    <motion3d.group   {...props} variants={variants} position={position}>
      <motion3d.mesh name={id} ref={card}
        onPointerOver={(e) => hover(true)} onPointerOut={() => hover(false)}>
        <roundedPlaneGeometry args={[width, height, 0.4]} />
        <MeshPortalMaterial ref={portal} events={params?.id === id} side={THREE.DoubleSide}>
          <mesh>
          <meshBasicMaterial attach={"material"} map={texture}/>
          <boxGeometry args={[10,8,1]}/>
          </mesh>
          {/* <GradientTexture attach="background" colors={[bg, bg2]} stops={[0, 1]} /> */}
          {children}
        </MeshPortalMaterial>
        <Text font={"/fonts/prompt-v10-latin-900italic.woff"} fontSize={0.72} maxWidth={2} anchorY="top" anchorX="left" lineHeight={1.2} position={[-2.5, -3, 0.01]} material-toneMapped={false}>
        {creator.split("-").join(" ")}
      </Text>
      <Text font={"/fonts/cairo-v26-latin-600.woff"} fontSize={.5} anchorX="left" anchorY="bottom-baseline" position={[-2.5, -4.5, 0.01]} material-toneMapped={false}>
        {/* {author} */}
        Rule Zero
      </Text>
      </motion3d.mesh>

    </motion3d.group>
  )
}
