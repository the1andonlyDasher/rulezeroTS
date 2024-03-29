import { useEffect, useRef, Suspense } from "react";
import { Canvas, useFrame, useThree, Vector3 } from "@react-three/fiber";
import {
  GradientTexture,
  Html,
  PerspectiveCamera,
  Preload,
  useAspect,
} from "@react-three/drei";
import { motion as motion3d, } from "framer-motion-3d";
import Timeline from "./Timeline";
import LandingGL from "./LandingGL";


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
    var p: Vector3 = ([0, w / 6, 20])
    const { ...cameraProps } = {
      position: p = [0, w / 6, 20],
      focus: 1
    };

    useFrame((state, dt) => {
      camera.current.position.x +=
        (mouseX - camera.current.position.x) * 0.05;
      camera.current.position.y +=
        (-mouseY - camera.current.position.y) * 0.05;

    });

    // const cameraControls = useAnimationControls()
    // const cameraVariants = {
    //   "/":{rotateY:-Math.PI},
    //   "/archive":{rotateY:0},
    //   "/contact": {rotateY:-Math.PI/2},
    //   "/about": {rotateY:Math.PI/2}
    // }

    // useEffect(()=>{
    //   cameraControls.start(`${router.pathname}`)
    // },[router.pathname])

    return (
      <motion3d.mesh ref={camera}
      // initial={{rotateY:-Math.PI}}
      // variants={cameraVariants}
      // position={[0, 0, 0]}
      // animate={cameraControls}
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
          <GradientTexture attach={"background"} colors={["#111", "#1e1f26"]} stops={[0, 0.1]} />
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








