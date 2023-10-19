import { useEffect, useRef, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Html,
  PerspectiveCamera,
  Preload,
  useAspect
} from "@react-three/drei";
import { motion as motion3d, } from "framer-motion-3d";
import Timeline from "./Timeline";
import LandingGL from "./LandingGL";
import { Vector3 } from "three/src/math/Vector3";


let mouseX: any;
let mouseY: any;
let windowHalfX: any;
let windowHalfY: any;


export const GL = () => {

  const wrapper = useRef<any>(!null)



  useEffect(() => {
    if (typeof window !== "undefined") {
      mouseX = 0;
      mouseY = 0;
      windowHalfX = window.innerWidth / 2;
      windowHalfY = window.innerHeight / 2;

    }
    document.addEventListener("mousemove", handleMove)
  }, []);



  const Camera = () => {
    const { size }: any = useThree()
    const [w, h] = useAspect(size.width, size.height)
    const camera = useRef<any>(null!);
    const { ...cameraProps } = {
      position: new Vector3(0, w / 6, 20),
      focus: 1
    };

    useFrame((state, dt) => {
      camera.current.position.x +=
        (mouseX - camera.current.position.x) * 0.05;
      camera.current.position.y +=
        (-mouseY - camera.current.position.y) * 0.05;

    });


    return (
      <motion3d.mesh ref={camera}
      >
        <PerspectiveCamera
          fov={75}
          onPointerMove={handleMove}
          makeDefault
          {...cameraProps}
        />
      </motion3d.mesh>
    );
  };

  const handleMove = (event: any) => {
    mouseY = (event.clientY - windowHalfY) / 100;
    mouseX = (event.clientX - windowHalfX) / 100;
  };



  return (
    <>

      <div id="canvasWrapper" ref={wrapper} className="canvas__wrapper" >
        <Canvas dpr={[1, 1.5]} gl={{ antialias: false }} >
          <fog attach="fog" args={["#1e1f26", 30, 70]} ></fog>
          <Preload all />
          <Camera />
          <color attach={"background"} args={["#1e1f26"]} ></color>
          <Suspense fallback={<Html>Loading experience...</Html>}>
            <Timeline />
            <LandingGL />
          </Suspense>
          <ambientLight color="#eeeeee" intensity={1} />
        </Canvas>
      </div>
    </>
  );
};







