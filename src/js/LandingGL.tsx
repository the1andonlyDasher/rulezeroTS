import * as THREE from 'three'
import React, { Suspense, useCallback, useEffect, useRef, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Text, useTexture, MeshReflectorMaterial, SpotLight, RoundedBox, useAspect } from '@react-three/drei'
import { DepthOfField, EffectComposer } from '@react-three/postprocessing'
import { Flex, Box as FlexBox } from '@react-three/flex'
import { motion } from 'framer-motion-3d'
import { MotionConfig, useAnimation, useAnimationControls } from 'framer-motion'
import Pill from './Pill'
import { loc } from '@/pages/atoms'
import { useAtom } from 'jotai'
import { useRouter } from 'next/router'






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
            fontSize={Math.min(20, Math.max(10, width * 0.7))}
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

interface LandingLGProps {
    visible: boolean
}


export default function LandingGL() {
    const [loaded, setLoaded] = useState(false);
    const router = useRouter();
    const controls = useAnimation()
    const [app, setApp] = useAtom(loc)
    const light = useRef<any>(!null)
    const { size } = useThree()
    size.updateStyle = true;
    const [vpWidth, vpHeight] = useAspect(size.width, size.height);
    const [target] = useState(() => new THREE.Object3D())
    const [disposed, setDisposed] = useState(false)
    const [isInPage, setIsInPage] = useState(false)

  
    useEffect(()=>{
      setDisposed(false)
      if(router.pathname === "/"){
        setTimeout(()=>{
            setIsInPage(true)
          }, 1000)
      } else {
        setIsInPage(false)
      }
    }, [router])
  
    function onComplete(){
      setDisposed(!isInPage)
    }



    useEffect(()=>{
        controls.start(loaded && app === "firstSection" ? { x: 0 } : app === "secondSection" ? { x: 100 } : { x: 10 })
    }, [app])
    return (
        <>
            <MotionConfig transition={{ type: "spring", stiffness: 150, damping: 50, bounce: 0.25, mass: 0.5, }}>
                <Suspense fallback={null}>
                    <motion.group
                                visible={!disposed}
                                animate={{x:isInPage ? 0 : 200}}
                                onAnimationComplete={onComplete}
                        position={[0, 0, 0]}
                        // rotation={[0, Math.PI, 0]}
                        >
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
                            position={[5, 35, 0]} shadowCameraFov={undefined} shadowCameraLeft={undefined} shadowCameraRight={undefined} shadowCameraTop={undefined} shadowCameraBottom={undefined} shadowCameraNear={undefined} shadowCameraFar={undefined} shadowBias={undefined} shadowMapWidth={undefined} shadowMapHeight={undefined} />

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
                            <FlexBox padding={-1} alignContent='center' flexGrow={1} flexBasis={1} flexShrink={0} flexDirection='column'>

                            </FlexBox>
                            <FlexBox padding={1} alignContent='center' flexGrow={1} flexBasis={1} flexShrink={0} flexDirection='column'>

                                <motion.group
                                    initial={{ x: 20 }}
                                    animate={controls}
                                >
                                    <primitive object={target} position={[0, -15, 0]} dispose={null} />

                                    <VideoText width={vpWidth} position={[0, vpHeight / 2 - (vpWidth * 0.1 - 5), 0]} />
                                </motion.group>
                            </FlexBox>
                        </Flex>

                        <Pill position={[0, vpHeight / 2 + 10, -40]} />
                    </motion.group>

                </Suspense>
            </MotionConfig>
        </>
    )
}