import * as THREE from "three";
import { useEffect, useRef, useState, Suspense, Component } from "react";
import { Canvas, Vector3, useFrame, useThree } from "@react-three/fiber";
import {
  useCursor,
  QuadraticBezierLine,
  Image as FiberImage,
  Text,
  Environment,
  PerspectiveCamera,
  GradientTexture,
  Preload,
  Line,
  ScrollControls,
  useScroll,
  useAspect,
} from "@react-three/drei";
import { easing } from "maath";
import {
  MotionConfig,
  motion,
  useAnimationControls,
  useCycle,
} from "framer-motion";
import { motion as motion3d } from "framer-motion-3d";
import { proxy } from "valtio";
import { atom, useAtom } from "jotai";
import Papa from "papaparse";
import { useEffectOnce } from "./UseEffectOnce";
import { imgs } from "@/pages/atoms";
import Timeline from "./Timeline";

import LandingGL from "./LandingGL";
import { DepthOfField, EffectComposer } from "@react-three/postprocessing";

const Loader = () => {
  const [animate, cycle] = useCycle({ opacity: 1 }, { opacity: 0 });
  useEffect(() => {
    cycle();
  }, []);
  return (
    <motion.div animate={animate} className="loader__wrapper">
      <div className="loader"></div>
    </motion.div>
  );
};

interface plane {
  props: planeProps;
}

type planeProps = {
  position: Vector3 | {x:number, y:number, z:number};
  rotation: Vector3 | {x:number, y:number, z:number};
  url: string;
  title: string;
  name: string;
  date: string;
}
let mouseX:any;
let mouseY:any;
let windowHalfX:any;
let windowHalfY:any;

export const GL = () => {

      useEffect(() => {
        if (typeof window !== "undefined") {
          mouseX = 0;
          mouseY = 0;
          windowHalfX = window.innerWidth / 2;
          windowHalfY = window.innerHeight / 2;
        }
        document.addEventListener("mousemove", handleMove)
      }, []);
      return (
        <>
          <div id="canvasWrapper" className="canvas__wrapper" >
            <Suspense fallback={<Loader />}>
              <MotionConfig  transition={{ type: "spring" }}>
                <Canvas dpr={[1, 1.5]}>
                  <fog attach="fog" args={["#1e1f26", 30, 70]} ></fog>
                  <Preload all />
                  <Camera />
                  <color attach={"background"} args={["#1e1f26"]} ></color>
                  {/* <GradientTexture
                    attach={"background"}
                    stops={[0, 0.5, 1]}
                    colors={["#f47d65", "#b12496", "#31302b"]}
                    size={1024}
                  /> */}
         
                  {/* <Timeline/> */}
                  <LandingGL/>
                  <ambientLight color="#eeeeee" intensity={1} />
  

                  <Environment preset="night" />
<EffectComposer>
<DepthOfField focusDistance={0} focalLength={0.2} bokehScale={2} height={480} />
</EffectComposer>
                </Canvas>
              </MotionConfig>
            </Suspense>
          </div> 
        </>
      );
    };

    const handleMove = (event: any) => {
      mouseX = (event.clientX - windowHalfX) / 100;
      mouseY = (event.clientY - windowHalfY) / 100;
    };

    

    const Camera = () => {
      const {size} = useThree()
      const [w,h] = useAspect(size.width, size.height)
      const camera = useRef<any>(null!);
      const vec = new THREE.Vector3(0,0,0)
      useEffect(()=>{

      },[size])
      const { ...cameraProps } = {
        position: new THREE.Vector3(0, w/6, 20),
      };

      useFrame((event) => {
        camera.current.position.x +=
          (mouseX - camera.current.position.x) * 0.05;
        camera.current.position.y +=
          (-mouseY - camera.current.position.y) * 0.05;
      });

      return (
        <motion3d.mesh ref={camera}>
          <PerspectiveCamera
          
          fov={75}
            onPointerMove={handleMove}
            makeDefault
            {...cameraProps}
          />
        </motion3d.mesh>
      );
    };


 