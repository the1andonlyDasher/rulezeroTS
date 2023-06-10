import * as THREE from 'three'
import React, { Suspense, useCallback, useEffect, useRef, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Text, useTexture, MeshReflectorMaterial, SpotLight, RoundedBox, useAspect } from '@react-three/drei'
import { DepthOfField, EffectComposer } from '@react-three/postprocessing'
import { Flex, Box as FlexBox } from '@react-three/flex'
import {motion} from 'framer-motion-3d'
import { MotionConfig, useAnimationControls } from 'framer-motion'
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

interface LandingLGProps{
    visible: Boolean
}


export default function LandingGL({visible}:LandingLGProps) {
    const [loaded, setLoaded] = useState(false);
    const router = useRouter();
    const controls = useAnimationControls()
    const [app, setApp] = useAtom(loc)
    const [see, setSeen] = useState(false)
    const light = useRef<any>(!null)
    const text = useRef<any>(!null)
    const vec = new THREE.Vector3()
    const {size} = useThree()
    size.updateStyle = true;
    const [vpWidth, vpHeight] = useAspect(size.width, size.height);
    const [target] = useState(() => new THREE.Object3D())
    const variants = {
        hidden:{x:-100},
        enter:{x:0}
    }
    useEffect(()=>{
        setLoaded(true)
        setSeen(!see)
        if(router.pathname === "/"){
            controls.start({x:0, scale:1, opacity:1})
        } else {
            controls.start({x:50, scale:0, opacity:0}).then(()=>{setSeen(false)})
        }
    },[router.pathname])
    return (
        <>
<MotionConfig transition={{type:"spring", stiffness:100, damping: 50, bounce: 0.25, mass:0.5,}}>
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
                    <FlexBox padding={-1} alignContent='center' flexGrow={1} flexBasis={1} flexShrink={0} flexDirection='column'>

                    </FlexBox>
                    <FlexBox padding={1} alignContent='center' flexGrow={1} flexBasis={1} flexShrink={0} flexDirection='column'>
                        {see &&
                        <motion.group
                        initial={{x:20}}
                            animate={visible ? loaded && app==="firstSection" ? {x:0, scale:1} : app==="secondSection" ? {x:100, scale:1}:{x:10, scale:1}:{x:100}}
                        >
                            <primitive object={target} position={[0, -15, 0]} dispose={null} />
                            
                            <VideoText width={vpWidth} position={[0, vpHeight / 2 - (vpWidth * 0.1 - 10) , 0]} />
                        </motion.group>}
                    </FlexBox>
                </Flex>
                {see &&
                <motion.group
                        initial={{x:20}}
                        animate={controls}
                        >
                        <Pill loaded={loaded} position={[0, vpHeight / 2 + 10, -40]}/>
                        </motion.group>}
          
            </Suspense>
            </MotionConfig>
        </>
    )
}