import * as THREE from "three";
import { useEffect, useRef, useState, Suspense } from "react";
import { Canvas, Vector3, useFrame, useLoader, useThree } from "@react-three/fiber";
import {
  useCursor,
  Image as FiberImage,
  Html,
  Environment,
  PerspectiveCamera,

  Preload,

  useAspect,
  MeshReflectorMaterial,
  useTexture,
  Loader,
  Lightformer,
  GradientTexture,
} from "@react-three/drei";
import {
  MotionConfig,
  motion,
  useAnimation,
  useAnimationControls,
} from "framer-motion";
import { motion as motion3d,  } from "framer-motion-3d";
import Timeline from "./Timeline";
import { useRouter } from 'next/router';
import LandingGL from "./LandingGL";
import { useAtom } from "jotai";
import { loadManager, totalLoad } from "@/pages/atoms";
import Image from "next/image";
import { Input } from "./Input";






interface plane {
  props: planeProps;
}

type planeProps = {
  position: Vector3 | { x: number, y: number, z: number };
  rotation: Vector3 | { x: number, y: number, z: number };
  url: string;
  title: string;
  name: string;
  date: string;
}
let mouseX: any;
let mouseY: any;
let windowHalfX: any;
let windowHalfY: any;





export const GL = () => {
  const router = useRouter()
  const [manager, setManager] = useAtom(loadManager)
  const [load, setLoad] = useAtom(totalLoad)

  const cover = useRef<any>(!null)
  const bar = useRef<any>()
  const cover_controls = useAnimation()

  useEffect(() => {
    manager.onProgress = function ( url:any, itemsLoaded:any, itemsTotal:any ) {
      	console.log( 'Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.', load );
        bar.current.style.width = (itemsLoaded / itemsTotal * 100) + '%'
        if ((itemsLoaded / itemsTotal * 100) === 100){
          setTimeout(()=>{ setLoad(true)},1000)
          setLoad(true)
        }
      }
    load === true && cover_controls.start({opacity:0, transition:{type:"tween", ease:"easeOut"}}).then(()=>{cover_controls.start({display:"none"})})
   
    if (typeof window !== "undefined") {
      mouseX = 0;
      mouseY = 0;
      windowHalfX = window.innerWidth / 2;
      windowHalfY = window.innerHeight / 2;
  
    }
    document.addEventListener("mousemove", handleMove)
  }, [load]);

  const Camera = () => {
    const { size } = useThree()
    const [w, h] = useAspect(size.width, size.height)
    const camera = useRef<any>(null!);
    const { ...cameraProps } = {
      position: new THREE.Vector3(0, w / 6, 20),
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

  function Ground() {
    const nScale = new THREE.Vector2(0.5, 0.5)
    const [normal, color, roughness, metalness, displacement] = useTexture(['/textures/Metal046B_1K_NormalDX.jpg', '/textures/Metal046B_1K_Color.jpg', '/textures/SurfaceImperfections003_1K_var1.jpg', '/textures/Metal046B_1K_Metalness.jpg', '/textures/Metal046B_1K_Displacement.jpg'])
    return (
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, Math.PI / 2]} position={[0, -2, -50]}>
        <planeGeometry args={[200, 200]} />
        <MeshReflectorMaterial
          blur={[1000, 1000]}
          resolution={512}
          mixBlur={20}
          mixStrength={1}
          roughness={1}
          depthScale={1.2}
          map={color}
          mirror={0.85}
          color="#a0a0a0"
          displacementMap={displacement}
          displacementBias={0.5}
          displacementScale={.01}
          roughnessMap={roughness}
          metalnessMap={metalness}
          metalness={0.24}
          normalMap={normal}
          normalScale={nScale}
          minDepthThreshold={0.1}
          maxDepthThreshold={0.6}>
        </MeshReflectorMaterial>
      </mesh>

    )
  }
  const fac = 10

  // const pexel = (id:any) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260`
const images = [
  // Front
  // { position: [0, 0, 1.5 * fac], rotation: [0, 0, 0], url: "/images/robot.png" },
  // Back
  { position: [-0.8* fac, 0, -0.6* fac], rotation: [0, 0, 0], 
    url: "/images/robot.png" },
  { position: [0.8* fac, 0, -0.6* fac], rotation: [0, 0, 0],
     url: "/images/robot.png" },
  // Left
  { position: [-1.75* fac, 0, 0.25* fac], rotation: [0, Math.PI / 2.5, 0], 
  url: "/images/robot.png" },
  { position: [-2.15* fac, 0, 1.5* fac], rotation: [0, Math.PI / 2.5, 0], 
  url: "/images/robot.png" },
  { position: [-3* fac, 0, 2.75* fac], rotation: [0, Math.PI / 2.5, 0], 
  url: "/images/robot.png"  },
  // Right
  { position: [1.75* fac, 0, 0.25* fac], rotation: [0, -Math.PI / 2.5, 0], 
  url: "/images/robot.png"  },
  { position: [2.15* fac, 0, 1.5* fac], rotation: [0, -Math.PI / 2.5, 0], 
  url: "/images/robot.png"  },
  { position: [3* fac, 0, 2.75* fac], rotation: [0, -Math.PI / 2.5, 0], 
  url: "/images/robot.png"  }
]

const handleMove = (event: any) => {
  mouseY = (event.clientY - windowHalfY) / 100;
  if(router.pathname === "/contact" || "/"){
    mouseX = (event.clientX - windowHalfX) / 100;
  } else {
    mouseX = -(event.clientX - windowHalfX) / 100;
  }
};

  return (
    <>
    <motion.div id="loader" ref={cover} animate={cover_controls} style={{ backgroundColor:"#1e1f26",zIndex: 999,top:0, left:0,width:"100%", height:"100%", display:"flex",  position:"fixed", justifyContent:"center", alignItems:"center", flexDirection:"column"}}>
      <motion.div initial={{x:200, scale:0, opacity:1}} animate={load ? {x:-200, opacity: 0} : {x:0, scale:1, opacity:1}}><Image src="/images/maxresdefault.png" width={200}  height={120} alt="RuleZero logo" /></motion.div>
      <motion.div style={{height:"10px", margin:"2rem", width:"400px", border:" 1px solid #111"}}>
      <motion.div ref={bar} style={{height:"10px", background:"ivory", width:0}} animate={load && {x:200, oapcity: 0}}>
      </motion.div>
      </motion.div>
    </motion.div>
      <div id="canvasWrapper" className="canvas__wrapper" >
      <MotionConfig transition={{ type: "tween" }}>  
      <Canvas dpr={[1, 1.5]} eventPrefix="client" gl={{antialias:false}}>
            <fog attach="fog" args={["#1e1f26", 30, 70]} ></fog>
            <Preload all />
            <Camera />
             <color attach={"background"} args={["#1e1f26"]} ></color> 
            <Suspense fallback={<Html>Loading experience...</Html>}>
              <Timeline   />
              <LandingGL  />
              {/* <Gallery images={images}/> */}
              {/* <Ground /> */}
            </Suspense>
            <ambientLight color="#eeeeee" intensity={1} />
            <Environment preset="dawn" />
          </Canvas>
        </MotionConfig>
      </div>
    </>
  );
};







