import * as THREE from "three";
import { useEffect, useRef, useState, Suspense } from "react";
import { Canvas,Vector3,useFrame } from "@react-three/fiber";
import {
  useCursor,
  QuadraticBezierLine,
  Image as FiberImage,
  Text,
  Line,
  useScroll,
  ScrollControls,
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
import { imgs } from "@/pages/atoms";


let mouseX: any;
let mouseY: any;
let windowHalfX: any;
let windowHalfY: any;

const handleMove = (event: any) => {
  mouseX = (event.clientX - windowHalfX) / 100;
  mouseY = (event.clientY - windowHalfY) / 100;
};

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

type planeProps = {
  position: Vector3 | {x:number, y:number, z:number};
  rotation: Vector3 | {x:number, y:number, z:number};
  url: string;
  title: string;
  name: string;
  date: string;
}


const Timeline = () => {

    const [app, setApp] = useAtom(imgs)
    const unit = proxy({ value: 15 });

    
  useEffect(() => {
    if (typeof window !== "undefined") {
      mouseX = 0;
      mouseY = 0;
      windowHalfX = window.innerWidth / 2;
      windowHalfY = window.innerHeight / 2;
    }
  }, [])

  const Frames = ( {images}:{images:any}) => {
    var p = new THREE.Vector3();
    var q = new THREE.Quaternion();
    const ref = useRef<any>(null!);
    const clicked = useRef<any>(null!);
    const scroll = useScroll();
    // console.log(images)
    useEffect(() => {
      console.log(images);
      if (clicked.current) {
        clicked.current.updateWorldMatrix(true, true);
        // clicked.current.localToWorld(p.set(0, 0, 20));
        clicked.current.getWorldQuaternion(q);
      } else {
        p.set(0, 10, 10.5);
        q.identity();
      }
    }, [clicked]);
    useFrame((state, dt) => {
      ref.current.position.z = scroll.offset * 2300 - 20;
      easing.damp3(state.camera.position, p, 0.4, dt);
      easing.dampQ(state.camera.quaternion, q, 0.4, dt);
    });
    return (
      <group
        ref={ref}
        onPointerEnter={(e) => {
          ref.current.active = true;
        }}
        onPointerLeave={(e) => {
          ref.current.active = false;
        }}
        onClick={(e) => (
          e.stopPropagation(),
          // setLocation(
          //   clicked.current === e.object ? "/" : "/item/" + e.object.name
          // )
          e.object.localToWorld(p.set(0, 0, 20)),
          clicked.current === e.object
            ? (ref.current.popUp = false)
            : (ref.current.popUp = true)
          // (object.current = e.object.name),
        //   console.log(e.object.name, object.current)
        )}
        onPointerMissed={() =>
          //  setLocation("/")
          p.set(0, 10, 10.5)
        }
      >
        <Line
          points={[
            [0, 0, 0],
            [0, 0, -`${app.length}` * unit.value],
          ]}
          color="white"
          lineWidth={1}
          fog
          dashed={false}
        />
        {images.map((props: any, index: number) => (
          <Frame
            name={"asd"}
            text={props.text}
            isActive={props.isActive}
            popUp={props.popUp}
            factor={Math.random() > 0.5 ? -1 : 1}
            position={props.position}
            key={props.url + index}
            url={props.url}
            date={props.date}
            start={[props.position[0] / 6, 0, -15 * index]}
            end={[props.position[0], props.position[1] - 4, -15 * index]}
            points={[
              [0, 0, -15 * index],
              [props.position[0], props.position[1] - 4, -15 * index],
            ]}
            {...props}
          />
        ))}
      </group>
    );
  };



  const Frame = ({...props}) => {
    const image = useRef<any>(null!);
    const text = useRef<any>(null!);
    const ref = useRef<any>(null!);
    const [hovering, hover] = useState(false);
    useCursor(hovering)

    useFrame((state, dt) => {
      easing.damp3(
        image.current.scale,
        [0.95 * (hovering ? 0.9 : 1), 0.925 * (hovering ? 0.875 : 1), 1],
        0.1,
        dt
      );
      ref.current.position.y =
        props.position[1] + Math.sin(dt) * 0.3 * props.factor;
      text.current.material.opacity = hovering ? 1 : 0;
      ref.current.rotation.y = Math.sin(dt * 0.8) * 0.05 * props.factor;
      ref.current.rotation.x = Math.sin(dt * 1.2) * 0.05 * props.factor;
      ref.current.position.z <= -ref.current.parent.parent.position.z - 100
        ? controls.start("exit")
        : controls.start("visible");
      ref.current.position.z <= -ref.current.parent.parent.position.z - 100
        ? controls_mesh.start("exit")
        : controls_mesh.start("visible");
    });

    const controls_mesh = useAnimationControls();

    const variants_mesh = {
      hidden: { scaleX: 0, scaleY: 0 },
      visible: { scaleX: 11, scaleY: 6, transition: {type:"spring", stiffness: 500, damping: 30}},
      exit: { scaleX: 0, scaleY: 0, transition: {type:"spring", stiffness: 500, damping: 30}},
    };

    const controls = useAnimationControls();

    const button_variants = {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
      exit: { opacity: 0 },
    };

    const variants = {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
      exit: { opacity: 0 },
    };

    const img_plane = new Image();
    img_plane.crossOrigin = "";
    img_plane.src = props.url;
    const texture_plane = new THREE.Texture(img_plane);
    texture_plane.wrapS = texture_plane.wrapT = THREE.RepeatWrapping;
    img_plane.onload = () => {
      texture_plane.needsUpdate = true;
    };

    return (
      <motion3d.group>
        <motion3d.mesh
          ref={ref}
          variants={variants_mesh}
          initial="hidden"
          animate={controls_mesh}
          // exit={controls_mesh}
          // isActive ={props.isActive}
          // popUp={props.popUp}
          // onPointerOver={(e) => (e.stopPropagation(), hover(true))}
          // onPointerOut={() => hover(false)}
          position={props.position}
        >
          <planeGeometry />
          <motion3d.meshStandardMaterial
            variants={variants}
            initial="hidden"
            animate={controls}
            // exit={controls}
            transition={{ type: "tween", ease: "easeOut", duration: 0.25 }}
            color="#ffffff"
            metalness={0}
            roughness={0}
            // envMapIntensity={2}
          />

          <motion3d.mesh
            ref={image}
            name={props.name}
            position={[0, 0, 0.1]}
            scale={[0.95, 0.95, 0.95]}
          >
            <planeGeometry />
            <motion3d.meshBasicMaterial map={texture_plane} />
          </motion3d.mesh>
        </motion3d.mesh>
        {/* <Text
      maxWidth={0.1}
      anchorX="left"
      anchorY="top"
      position={[0.55, GOLDENRATIO, 0]}
      fontSize={0.025}
    >
      {title.split("-").join(" ")}
    </Text> */}
        <Text
          ref={text}
          maxWidth={10}
          characters="abcdefghijklmnopqrstuvwxyz0123456789!"
          fontSize={0.6}
          position={[
            props.position[0],
            props.position[1] - 5,
            props.position[2],
          ]}
          font={"/fonts/prompt-v10-latin-900italic.woff"}
          anchorX="center"
          anchorY="middle"
        >
          <meshBasicMaterial color={"white"} />
          {props.title.split("-").join(" ")}
        </Text>
        <Text
          maxWidth={10}
          characters="abcdefghijklmnopqrstuvwxyz0123456789!"
          fontSize={0.6}
          position={[
            0 ,
            0,
            props.position[2],
          ]}
          font={"/fonts/prompt-v10-latin-900italic.woff"}
          anchorX="center"
          anchorY="middle"
        >
          <meshBasicMaterial color={"white"} />
          {props.date.split("-").join(" ")}
        </Text>
        <QuadraticBezierLine
          // ref={line}
          start={props.start}
          end={props.end}
          color="hotpink"
          needsUpdate={true}
          lineWidth={1}
          dashScale={2}
          dashed
          fog
        ></QuadraticBezierLine>
      </motion3d.group>
    );
  };

  const pages = `${app.length}`;
  const pageCount: number = +pages;

return(
<>
    <ScrollControls distance={0.1} pages={pageCount}>
    <Frames images={app} />
  </ScrollControls>
  </>
)
}

export default Timeline