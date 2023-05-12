import * as THREE from 'three'
import React, { Suspense, useCallback, useEffect, useRef, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Text, useTexture, MeshReflectorMaterial, SpotLight, RoundedBox, useAspect } from '@react-three/drei'
import { DepthOfField, EffectComposer } from '@react-three/postprocessing'
import { Flex, Box as FlexBox } from '@react-three/flex'
import {motion} from 'framer-motion-3d'
import { MotionConfig } from 'framer-motion'




function Ground() {
    const nScale = new THREE.Vector2(205, 205)
    const [normal, color, roughness, metalness, displacement] = useTexture(['/textures/Metal046B_1K_NormalDX.jpg', '/textures/Metal046B_1K_Color.jpg', '/textures/SurfaceImperfections003_1K_var1.jpg', '/textures/Metal046B_1K_Metalness.jpg', '/textures/Metal046B_1K_Displacement.jpg'])
    return (
        <mesh receiveShadow castShadow rotation={[-Math.PI / 2, 0, Math.PI / 2]} position={[0, -2, -50]}>
            <planeGeometry args={[200, 200]} />
            <MeshReflectorMaterial
                blur={[400, 100]}
                resolution={512}
                mirror={0.6}
                mixBlur={6}
                mixStrength={4.5}
                map={color}
                color="#999999"
                displacementMap={displacement}
                displacementBias={0.5}
                roughnessMap={roughness}
                roughness={1}
                metalnessMap={metalness}
                metalness={0.4}
                normalMap={normal}
                normalScale={nScale}>
            </MeshReflectorMaterial>
        </mesh>

    )
}

function VideoText({ position, width }: any) {

    const [video] = useState(() => Object.assign(document.createElement('video'), { src: '/videos/RuleZero.webm.mp4', crossOrigin: 'Anonymous', loop: true, muted: true }))
    useEffect(() => void video.play(), [video])
    return (

            <Text
                receiveShadow
                strokeColor={"#111111"}
                strokeWidth={0.05}
                castShadow
                font="/fonts/prompt-v10-latin-900italic.woff"
                fontSize={Math.min(20, Math.max(10, width / 4))}
                maxWidth={width}
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

function Box(props: any) {
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
            <boxGeometry args={[10, 10, 10]} />
            <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
        </mesh>
    )
}


export default function LandingGL() {
    const [loaded, setLoaded] = useState(false);
    const {size} = useThree()
    const light = useRef<any>(!null)
    const text = useRef<any>(!null)
    const vec = new THREE.Vector3()
    const [vpWidth, vpHeight] = useAspect(size.width, size.height);
    const [target] = useState(() => new THREE.Object3D())
    const variants = {
        hidden:{x:-100},
        enter:{x:0}
    }
    useEffect(()=>{
        setLoaded(true)
    },[])
    return (
        <>
<MotionConfig transition={{type:"spring"}}>
            <Suspense fallback={null}>
                <SpotLight
                    ref={light}
                    castShadow
                    penumbra={0.2}
                    radiusTop={0.4}
                    radiusBottom={60}
                    distance={100}
                    angle={0.6}
                    color={"white"}
                    attenuation={30}
                    anglePower={4}
                    intensity={30}
                    opacity={0.2}
                    target={target}
                    position={[5, 35, 0]}
                />

                <Flex
                    justify="flex-start"
                    alignItems="center"
                    flexWrap='wrap'
                    flexDirection="row"
                    margin="auto"
                    size={[vpWidth, vpHeight, 0]}
                    position={[-10, 0, -22]}
                    width={vpWidth}
                >
                    <FlexBox padding={0} alignContent='center' flexGrow={1} flexBasis={1} flexShrink={0} flexDirection='column'>
                        {/* <Text
                            fontSize={Math.min(20, Math.max(10, vpWidth / 4))}
                            maxWidth={vpWidth}
                            position={[0, vpHeight / 2, 0]}>
                            RULE ZERO
                            <meshBasicMaterial opacity={0} toneMapped={false}>
                                
                            </meshBasicMaterial>
                        </Text> */}
                    </FlexBox>
                    <FlexBox padding={1} alignContent='center' flexGrow={1} flexBasis={1} flexShrink={0} flexDirection='column'>
                        <motion.group
                            animate={loaded ? {x:0, scale:1} : {x:-10, scale:0}}
                        >
                            <primitive object={target} position={[0, -15, 0]} />
                            <VideoText width={vpWidth} position={[0, vpHeight / 2 - (vpWidth * -0.001), 0]} />
                        </motion.group>
                    </FlexBox>
                </Flex>
                <Ground />
            </Suspense>
            </MotionConfig>
        </>
    )
}