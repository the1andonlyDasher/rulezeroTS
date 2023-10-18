import * as THREE from 'three'
import { Suspense, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { ReactThreeFiber, extend, useFrame, useThree } from '@react-three/fiber'
import { useCursor, Image, Text, Plane, MeshPortalMaterial, useAspect, GradientTexture, CameraControls, QuadraticBezierLine, Center, Bounds, ScrollControls, useScroll } from '@react-three/drei'
import { useRoute, useLocation } from 'wouter'
import { easing } from 'maath'
import { loadManager } from '@/js/atoms'
import { useAtom } from 'jotai'
import { useRouter } from 'next/router'
import { motion as motion3d } from 'framer-motion-3d'
import * as geometry from "maath/geometry";
import { RoundedPlaneGeometry } from 'maath/geometry'
import { images } from './images'
import { Box, Flex } from '@react-three/flex'

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
    <ScrollControls pages={2} damping={0.1}>
      <Frames images={images} />
    </ScrollControls>
  </>
  )
}

function Frames({ images }: { images: any }) {
  const router = useRouter();
  const [disposed, setDisposed] = useState(false)
  const [isInPage, setIsInPage] = useState(false)
  const [location, setLocation] = useLocation()
  const [, params] = useRoute('/about/item/:id')
  const { size, scene }: any = useThree();
  size.updateStyle
  const [w, h] = useAspect(size.width, size.height)
  const radius = Math.max(1.5, Math.min(w / 2, 100));
  const GOLDENRATIO = 1.61803398875


  // making curve along which to place cards 
  const curve = new THREE.QuadraticBezierCurve3(
    new THREE.Vector3(30, 0, 0),
    new THREE.Vector3(0, 0, -10),
    new THREE.Vector3(-30, 0, 0),
  );

  const points = curve.getPoints(images.length - 1);

  var p = new THREE.Vector3();
  var q = new THREE.Quaternion();
  const clicked: any = useRef(undefined)
  const flex = useRef<any>(!null)
  const group = useRef<any>(!null)
  const scroll = useScroll()


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

  function onComplete(event: Event) {
    setDisposed(!isInPage)
    // console.log(event)
  }


  useEffect(() => {
    console.log(clicked.current)
    clicked.current = scene.getObjectByName(params?.id)
    if (clicked.current === undefined) {
      p.set(0, 10, 20)
      q.identity()
    } else {
      clicked.current.parent.parent.updateWorldMatrix(true, true)
      clicked.current.parent.parent.localToWorld(p.set(0, 0, 10 + (5 / w * h)))
      clicked.current.parent.parent.getWorldQuaternion(q)
    }
  }, [clicked, p, h, params?.id, q, w],)


  useFrame((state, dt) => {
    group.current.position.y = scroll.offset * (2000 / w)
    // easing.damp3(state.camera.position, p, 0.4, dt);
    // easing.dampQ(state.camera.quaternion, q, 0.4, dt);
  })


  return (
    <>
      <motion3d.group
        position={[0, 0, 0]}
        ref={group}
        onClick={(e) => (e.stopPropagation(), setLocation(clicked.current === e.object ? '/about' : '/about/item/' + e.object.name))}
        onPointerMissed={() => {
          p.set(0, 10, 20)
        }}
        visible={!disposed}
        variants={variants}
        animate={isInPage ? "enter" : "leave"}
        transition={{ staggerChildren: 0.2, delayChildren: 0.5 }}
        onAnimationComplete={(e: any) => (onComplete(e))}
      >
        <Flex
          ref={flex}
          paddingLeft={w / 10 + 2}
          paddingRight={w / 10 + 2}
          plane='xy'
          position={[0, 0, 0]}
          flexDirection="row"
          flexWrap="wrap"
          justify="center"
          centerAnchor
          width={w}
          alignItems="center"
          size={[w, h, 0]} >
          {images.map((props: any, index: number) =>
            <Picture key={props.url + index} id={"0" + (index + 1)}  {...props} bg={`#${index}afa${index}${index}`} bg2={`#3${index}91${index}${index}`} />
          )}
        </Flex>
      </motion3d.group>
    </>
  )
}

function Picture({ position, children, creator, id, bg, bg2, url, c = new THREE.Color(), width = 1 * 7, height = 1.61803398875 * 7, ...props }: any) {
  const [manager, setManager] = useAtom<any>(loadManager)
  const portal = useRef<any>(!null)
  const card = useRef<any>(!null)
  const [, params] = useRoute('/about/item/:id')
  const [location, setLocation] = useLocation()
  const { size, scene }: any = useThree();
  size.updateStyle
  const [vpWidth] = useAspect(size.width, size.height)
  const [hovered, hover] = useState(false)
  const [rnd] = useState(() => Math.random())
  //excluded these textures from the loadingManager
  const texture: any = useMemo(() => new THREE.TextureLoader().load(url, onload = (texture: any) => { texture.wrapS = texture.wrapT = THREE.RepeatWrapping }), []);
  useCursor(hovered)

  useEffect(() => {
    card.current.lookAt(0, 0, 0)
  })

  useFrame((state, dt) => {
    easing.damp(portal.current, 'blend', params?.id === id ? 1 : 0, 0.2, dt);
  })


  return (
    <Box width={9} height={12} centerAnchor>
      <motion3d.group   {...props} variants={variants} >
        <motion3d.mesh name={id}
          onPointerOver={(e) => hover(true)} onPointerOut={() => hover(false)}>
          <roundedPlaneGeometry args={[width, height, 0.4]} />
          <MeshPortalMaterial ref={portal} events={params?.id === id} side={THREE.FrontSide}>
            <mesh ref={card} position={[0, 0, 0]}>
              <meshBasicMaterial attach={"material"} map={texture} />
              <planeGeometry attach={"geometry"} args={[12, 15]} />
            </mesh>
            <GradientTexture attach="background" colors={[bg, bg2]} stops={[0, 1]} />
            {children}
          </MeshPortalMaterial>
          <Text font={"/fonts/prompt-v10-latin-900italic.woff"} fontSize={0.72} maxWidth={2} anchorY="top" anchorX="left" lineHeight={1.2} position={[1.5, 4.5, 0.01]} material-toneMapped={false}>
            {id}
          </Text>
          <Text font={"/fonts/prompt-v10-latin-900italic.woff"} fontSize={0.72} maxWidth={2} anchorY="top" anchorX="left" lineHeight={1.2} position={[-2.5, -3, 0.01]} material-toneMapped={false}>
            {creator.split("-").join(" ")}
          </Text>
          <Text font={"/fonts/cairo-v26-latin-600.woff"} fontSize={.5} anchorX="left" anchorY="bottom-baseline" position={[-2.5, -4.5, 0.01]} material-toneMapped={false}>
            {/* {author} */}
            Rule Zero
          </Text>
        </motion3d.mesh>
      </motion3d.group>
    </Box>
  )
}
