import * as THREE from 'three'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import React, { Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Vector3, useFrame, extend, useThree } from '@react-three/fiber'
import { Instance, SpotLight, Text3D, useAspect, useGLTF } from '@react-three/drei'
import { motion } from 'framer-motion-3d'

import { Physics, PlaneProps, Triplet, useBox, usePlane } from '@react-three/cannon'
import { Color, Mesh } from 'three'
import { geometry } from 'maath';
import { loc } from '@/pages/atoms';
import { useAtom } from 'jotai';
import { Box, Flex } from '@react-three/flex';

type pillProps = {
    position: Vector3
    loaded: Boolean
}

export default function Pill({ position, loaded }: pillProps) {
    const [app, setApp] = useAtom(loc)

type InstancedGeometryProps = {
    // colors: Float32Array
    number: number
    text: any
    size: number
}

const Boxes = ({ number, size, text}: InstancedGeometryProps) => {
    const [font, setFont] = useState<any>(undefined);
const textGeo = (text:any) => new TextGeometry("?", {
        font: font,
        size: 3.5,
        height: 1,
    })
    const loader = new FontLoader()
    useEffect(() => {
        loader.load("/fonts/Prompt Black_Italic.json", function (response) {
            setFont(response)
        })
        console.log(text)
    },[])



    const args: Triplet = [size, size, size]
    const [ref, { at }] = useBox(
        () => ({
            args,
            mass: 0.01,
            position: [Math.random() + 2, Math.random() + 40, Math.random() - 0.5],
        }),
        useRef<THREE.InstancedMesh>(null),
    )
    useFrame(() => app==="firstSection" ? at(0).position.set(Math.random() + 2, Math.random() + 40, Math.random() - 0.5) : null)
    return (
<instancedMesh  ref={ref} geometry={textGeo(text)} args={[undefined, undefined, number]} >
            <meshLambertMaterial color={"grey"} />
        </instancedMesh>

    )
}

function Plane(props: PlaneProps) {
    const [ref] = usePlane(() => ({ ...props }), useRef<Mesh>(null))
    return (
        <mesh ref={ref} receiveShadow>
            <planeGeometry args={[20, 20]} />
            <shadowMaterial color="#171717" />
        </mesh>
    )
}


    const [number] = useState(20)
    const [textSize] = useState(1)
    const [text] = useState(["Praxeology", "Game", "Seduction", "Health", "Advice", "Fitness", "Money", "Frame", "Dating", "Relationships"])
    const group = useRef<any>(!null);
    const top_half = useRef<any>(!null);
    const bottom_half = useRef<any>(!null);
    const [target] = useState(() => new THREE.Object3D())
    const { nodes, materials }: any = useGLTF("/models/RPill.glb")
    const {size} = useThree()
    size.updateStyle = true;
    const [vpWidth, vpHeight] = useAspect(size.width, size.height);
    const InstancedGeometry = Boxes

    return (<>
           <Flex
                    justify="flex-start"
                    alignItems="center"
                    flexWrap='wrap'
                    flexDirection="row"
                    margin="auto"
                    height={vpHeight}
                 
                    width={vpWidth}
                >
                    <Box padding={-1} alignContent='center' flexGrow={1} flexBasis={1} flexShrink={0} flexDirection='column'>
        <motion.group ref={group} scale={10} position={position} rotation={[0.45, 0, 0.45]} initial={{ scale: 0 }} animate={loaded && app === "firstSection" ? { x: 0, scale: 10, transition: { delay: 1 } } : app === "secondSection" ? { x: 0, z: -20, scale: 10 } : { x: 100, scale: 0 }}>
            <motion.mesh animate={app=="secondSection" ? {x: -vpWidth/20, y: vpHeight/30, rotateZ: 0.45} : {}} receiveShadow castShadow ref={top_half} geometry={nodes.cap_top.geometry} material={materials.red_mat} />
            <motion.mesh animate={app=="secondSection" ? {x: vpWidth/20, y: -vpHeight/20, rotateZ: 1.95} : {}}receiveShadow castShadow ref={bottom_half} geometry={nodes.cap_bottom.geometry} material={materials.white_mat} />
        </motion.group>
        </Box>
        </Flex>
        <SpotLight
                    castShadow
                    penumbra={0.2}
                    radiusTop={0.4}
                    radiusBottom={60}
                    distance={100}
                    angle={0.6}
                    color={"red"}
                    attenuation={30}
                    anglePower={4}
                    intensity={app === "secondSection" ? 30 : 0}
                    opacity={app === "secondSection" ? 0.2: 0}
                    target={target}
                    position={[0, 35, 0]}
                />
                <primitive object={target} position={[0, -15, 0]} dispose={null} />
        <Physics  isPaused={app=="secondSection" ? false : true} gravity={[0, -20, 0]} broadphase="SAP">
            <Plane rotation={[-Math.PI / 2, 0, 0]}/>
            <InstancedGeometry {...{ number, size:textSize, text:text}}/>
        </Physics>

    </>)
}


