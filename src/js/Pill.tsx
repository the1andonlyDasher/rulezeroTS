
import { FontLoader, TextGeometry } from 'three-stdlib'
import React, { useEffect, useRef, useState } from 'react'
import { Vector3, useThree } from '@react-three/fiber'
import { SpotLight, useAspect, useGLTF } from '@react-three/drei'
import { motion } from 'framer-motion-3d'
import { Physics, PlaneProps, useBox, usePlane } from '@react-three/cannon'
import { loc } from '@/js/atoms';
import { useAtom } from 'jotai';
import { Box, Flex } from '@react-three/flex';
import { useRouter } from 'next/router';
import { useAnimation } from 'framer-motion';
import { Object3D, Mesh } from '../vendor/three-export'



type pillProps = {
    position: Vector3
    loaded?: Boolean
}

export default function Pill({ position }: pillProps) {
    const [app, setApp] = useAtom(loc)
    const router = useRouter()
    const controls = useAnimation()
    type InstancedGeometryProps = {

        number: number
        text: any
        size: number
    }

    const Boxes = ({ number, size, text }: InstancedGeometryProps) => {
        const [font, setFont] = useState<any>(undefined);

        const textGeo = (text: any) => new TextGeometry(`${text}`, {
            font: font,
            size: size,
            height: 1,
        })
        const loader = new FontLoader()
        useEffect(() => {
            loader.load("/fonts/Prompt Black_Italic.json", function (response) {
                setFont(response)
            })

        }, [])

        const [ref, { at }] = useBox(
            () => ({
                mass: 1.5,
                position: [Math.random() + 2, Math.random() + 30, Math.random() - 0.5],
            }),
            useRef<any>(!null),
        )

        useEffect(() => { if (app === "firstSection") { ref.current.position.set(Math.random() + 2, Math.random() + 40, Math.random() - 0.5) } }, [app])
        return (

            <mesh ref={ref} geometry={textGeo(text)} >
                <meshLambertMaterial toneMapped={false} color={"#6b191d"} />
            </mesh>
        )
    }

    function Plane(props: PlaneProps) {
        const [ref] = usePlane(() => ({ ...props }), useRef<Mesh>(null))
        return (<>
            {app == "secondSection" && router.pathname === "/" &&
                <mesh ref={ref}>
                    <planeGeometry args={[50, 40]} />
                    <shadowMaterial color="#171717" />
                </mesh>
            }
        </>
        )
    }


    const [number] = useState<any>(1)
    const [textSize] = useState<any>(2)
    const [text] = useState<any>(["Praxeology", "Game", "Seduction", "Health", "Advice", "Fitness", "Money", "Frame", "Dating", "Relationships"])
    const group = useRef<any>(!null);
    const top_half = useRef<any>(!null);
    const bottom_half = useRef<any>(!null);
    const [target] = useState(() => new Object3D())
    const { nodes, materials }: any = useGLTF("/models/RPill.glb")
    const { size } = useThree()
    const [vpWidth, vpHeight] = useAspect(size.width, size.height);


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
                <motion.group ref={group} scale={10} position={position} rotation={[0.45, 0, 0.45]}
                    animate={app === "firstSection" ?
                        { x: 0, scale: 10, transition: { delay: 1 } } :
                        app === "secondSection" ?
                            { x: 0, z: -20, scale: 10 } :
                            { x: 100, scale: 0 }}>
                    <motion.mesh initial={{ scale: 0 }} exit={{ scale: 0 }} animate={app == "secondSection" ? { x: -vpWidth / 20, y: vpHeight / 30, rotateZ: 0.45, scale: 1 } : { x: 0, y: 0, rotateZ: 0, scale: 1 }} receiveShadow ref={top_half} geometry={nodes.cap_top.geometry} material={materials.red_mat} />
                    <motion.mesh initial={{ scale: 0 }} exit={{ scale: 0 }} animate={app == "secondSection" ? { x: vpWidth / 20, y: -vpHeight / 20, rotateZ: 1.95, scale: 1 } : { x: 0, y: 0, rotateZ: 0, scale: 1 }} receiveShadow ref={bottom_half} geometry={nodes.cap_bottom.geometry} material={materials.red_mat} />
                </motion.group>
            </Box>
        </Flex>

        <motion.group >
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
                intensity={app === "secondSection" ? 3000 : 0}
                opacity={app === "secondSection" ? 0.2 : 0}
                target={target}
                position={[0, 35, 0]} />
            <primitive object={target} position={[0, -15, 0]} dispose={null} />
            <Physics isPaused={app == "secondSection" && router.pathname === "/" ? false : true} gravity={[0, -20, 0]} broadphase='Naive'>
                <Plane rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} />
                {text.map((item: any) =>
                    <Boxes key={item} {...{ number, size: textSize, text: item }} />
                )}
            </Physics>
        </motion.group>
    </>)
}


