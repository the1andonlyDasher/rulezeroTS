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
  MeshReflectorMaterial,
  useTexture,
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
import { useRouter } from 'next/router';
import LandingGL from "./LandingGL";
import { DepthOfField, EffectComposer } from "@react-three/postprocessing";
import { MeshLambertMaterial } from "three";




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
  const router = useRouter()
  const [loaded, setLoaded] = useState<any>(false)
  const Loader = () => {
    const [animate, cycle] = useCycle({ opacity: 1 }, { opacity: 0 });
    useEffect(() => {
      loaded === true && cycle();
    }, []);
    return (
      <motion.div animate={animate} className="loader__wrapper">
        <div className="loader"></div>
      </motion.div>
    );
  };

  const Camera = () => {
    const {size} = useThree()
    const [w,h] = useAspect(size.width, size.height)
    const camera = useRef<any>(null!);
    useEffect(()=>{
      if(router.pathname === "/archive"){
        camera.current.position.lerp(new THREE.Vector3(camera.current.position.x, camera.current.position.y, -20), 0.5)
      } else {
        camera.current.position.lerp(new THREE.Vector3(camera.current.position.x, camera.current.position.y, 0), 0.5)
      }
    },[router])
    const { ...cameraProps } = {
       position: new THREE.Vector3(0, w/6, 20),
    };

    useFrame((state) => {
      camera.current.position.x +=
        (mouseX - camera.current.position.x) * 0.05;
      camera.current.position.y +=
        (-mouseY - camera.current.position.y) * 0.05;
    });

    return (
      <motion3d.mesh ref={camera}
      position={[-20,0,0]}>
        <PerspectiveCamera
        
        fov={75}
          onPointerMove={handleMove}
          makeDefault
          {...cameraProps}
        />
      </motion3d.mesh>
    );
  };

  const controls = useAnimationControls();
  const controls2 = useAnimationControls();
      useEffect(() => {
        if (typeof window !== "undefined") {
          mouseX = 0;
          mouseY = 0;
          windowHalfX = window.innerWidth / 2;
          windowHalfY = window.innerHeight / 2;
          setLoaded(true)
        }
        document.addEventListener("mousemove", handleMove)
      }, []);

      function Ground() {
        const nScale = new THREE.Vector2(205, 205)
        const [normal, color, roughness, metalness, displacement] = useTexture(['/textures/Metal046B_1K_NormalDX.jpg', '/textures/Metal046B_1K_Color.jpg', '/textures/SurfaceImperfections003_1K_var1.jpg', '/textures/Metal046B_1K_Metalness.jpg', '/textures/Metal046B_1K_Displacement.jpg'])
        return (
            <mesh receiveShadow castShadow rotation={[-Math.PI / 2, 0, Math.PI / 2]} position={[0, -2, -50]}>
                <planeGeometry args={[200, 200]} />
                <MeshReflectorMaterial
                    blur={[100, 400]}
                    resolution={512}
                    mirror={0.9}
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
                  <Timeline visible={loaded && router.pathname === "/archive" ? true : false}/>
                   <LandingGL visible={loaded && router.pathname === "/" ? true : false}/> 
            
  
                  <Ground />
                  <ambientLight color="#eeeeee" intensity={1} />
                  <Environment preset="night"/>
                  
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

    



 