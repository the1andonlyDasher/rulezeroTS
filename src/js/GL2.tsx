import * as THREE from "three";
import { Mesh } from "three";
import { useEffect, useRef, useState, Suspense } from "react";
import { Canvas, ThreeEvent, Vector3, useFrame, useThree } from "@react-three/fiber";
import {
  useCursor,
  MeshReflectorMaterial,
  QuadraticBezierLine,
  Html,
  Image as FiberImage,
  Text,
  Environment,
  PerspectiveCamera,
  GradientTexture,
  Preload,
  Line,
  ScrollControls,
  useScroll,
  Backdrop,
} from "@react-three/drei";
import { useRoute, useLocation } from "wouter";
import { easing } from "maath";
import { MotionConfig, motion, useAnimationControls } from "framer-motion";
import getUuid from "uuid-by-string";
import { motion as motion3d } from "framer-motion-3d";
import Papa from "papaparse";
import { proxySet } from "valtio/utils";
import { proxy, useSnapshot } from "valtio";

type data = {
  position: Vector3,
  rotation: Vector3,
  start: [x: number, y: number, z: number];
  end: [x: number, y: number, z: number];
  points: [[x: number, y: number, z: number],
  [x: number, y: number, z: number]];
  isActive: boolean;
  popUp: boolean;
  factor: number;
  text: string;
  name: string;
  url: string;
  title: any;
}
interface planeProps {
  images: data[],
}  



let mouseX
let mouseY
let windowHalfX
let windowHalfY

const object = proxy({ current: null })
// const state = proxySet<data>([])
const state: Array<any> = []
const [arr, setArr] = useState<any[]>([])
const unit = proxy({ value: 15 });

const App = ({images}: planeProps) =>{
  const windowRef = useRef(null);
  const parse = useRef(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      mouseX = 0;
      mouseY = 0;
      windowHalfX = window.innerWidth / 2;
      windowHalfY = window.innerHeight / 2;
    }
    // console.log("loaded");
    if (parse.current === false) {
      var r,
        rx =
          /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/|shorts\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;

      Papa.parse(
        "https://docs.google.com/spreadsheets/d/e/2PACX-1vSloYeSqI6BpICcq9gG5a3KRhXv99DKlrj9XmEAIvmX0BxWw-olhU9J9kDG0LvM976e8jYblR0THwkj/pub?output=csv",
        {
          skipEmptyLines: "greedy",
          download: true,
          header: true,
          complete: (results) => {
            console.log("Parsing complete:", results);
            results.data.map((data: any, index) => {
              r = data.Link.match(rx);
              var t = data.Title;
              state.push({
                position: [
                  index % 2
                    ? -(Math.random() < 0.5
                      ? 15 + Math.random() * 5
                      : 10 + Math.random() * 5)
                    : Math.random() < 0.5
                      ? 15
                      : 10,
                  Math.random() < 0.5
                    ? 10 + Math.random() * 5
                    : 10 + Math.random() * 5,
                  -15 * index,
                ],
                rotation: [0, 0, 0],
                url: `https://img.youtube.com/vi/${r[1]}/mqdefault.jpg`,
                title: t,
                name: r[1],
                text: "",
                isActive: false,
                points: null,
                popUp: false,
                factor: null,
                start: null,
                end: null
              });
            });
          },
        }
      );
      setArr(state)
      console.log(state)
      parse.current = true;
    } else {
      return;
    }
  });
  const pages = `${state.length}`
  const pageCount: number = +pages;
  console.log(state.length)

  return (
    <>
      <div id="canvasWrapper" className="canvas__wrapper" ref={windowRef}>
        <Suspense fallback={null}>
          <MotionConfig transition={{ type: "spring" }}>
            <Canvas
              onMouseMove={handleMove}
              dpr={[1, 1.5]}
            >
              <Preload all />
              <Camera />
              <GradientTexture
                attach={"background"}
                stops={[0, 0.5, 1]}
                colors={["#f47d65", "#b12496", "#31302b"]}
                size={1024}
              />

              <ScrollControls distance={0.1} pages={pageCount}>
                <Frames images={images} />
              </ScrollControls>

              <Environment preset="studio" />
            </Canvas>
          </MotionConfig>
        </Suspense>
      </div>
    </>
  );
}

const handleMove = (event) => {
  mouseX = (event.clientX - windowHalfX) / 100;
  mouseY = (event.clientY - windowHalfY) / 100;
};


const Frames = ({images}: planeProps) => {
  var p = new THREE.Vector3();
  var q = new THREE.Quaternion();
  const ref = useRef<any>(null!);
  const clicked = useRef(null!);
  const scroll = useScroll();
  console.log(images)
  useEffect(() => {
    
    clicked.current = ref.current.getObjectByName(object.current);
    if (clicked.current) {
      clicked.current.updateWorldMatrix(true, true);
      // clicked.current.localToWorld(p.set(0, 0, 20));
      clicked.current.getWorldQuaternion(q);
    } else {
      p.set(0, 10, 10.5);
      q.identity();
    }
  });
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
        clicked.current === e.object ? ref.current.popUp = false : ref.current.popUp = true,
        object.current = e.object.name,
        console.log(e.object.name, object.current)
      )}
      onPointerMissed={() => (
        //  setLocation("/")
        p.set(0, 10, 10.5))}

    >
      <Line
        points={[
          [0, 0, 0],
          [0, 0, -`${state.length}` * unit.value],
        ]}
        color="white"
        lineWidth={2}
        dashed={false}
      />
      {images.map((props, index, array: data[]) => (
        <Frame
          name={"asd"}
          text={props.text}
          isActive={props.isActive}
          popUp={props.popUp}
          factor={Math.random() > 0.5 ? -1 : 1}
          position={props.position}
          key={props.url}
          url={props.url}
          start={[0, 0, -15 * index]}
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
}

interface FrameProps {
  position: Vector3;
  rotation: Vector3;
  isActive: boolean;
  popUp: boolean;
  factor: number;
  start: [x: number, y: number, z: number];
  end: [x: number, y: number, z: number];
  name: string;
  url: string;
  title: string;
}

const Frame = (props: FrameProps) => {
  const image = useRef(null!);
  const text = useRef(null!)
  const ref = useRef(null!);
  const [hovered, hover] = useState();
  useCursor(hovered);


  useFrame((state, dt) => {
    easing.damp3(
      image.current.scale,
      [
        0.95 * (hovered ? 0.9 : 1),
        0.925 * (hovered ? 0.875 : 1),
        1,
      ],
      0.1,
      dt
    );
    ref.current.position.y =
      props.position[1] + Math.sin(dt) * 0.3 * props.factor;
    text.current.material.opacity = hovered ? 1 : 0;
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
    visible: { scaleX: 11, scaleY: 6 },
    exit: { scaleX: 0, scaleY: 0 },
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

        <motion3d.mesh ref={image} name={props.name} position={[0, 0, 0.1]} scale={[0.95, 0.95, 0.95]}>
          <planeGeometry />
          <motion3d.meshBasicMaterial

            map={texture_plane}
          />
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
        position={[props.position[0], props.position[1] - 5, props.position[2]]}
        font={"/fonts/FiraSans-ExtraBold.ttf"}
        anchorX="center"
        anchorY="middle"
      >
        <meshBasicMaterial color={"white"} />
        {props.title.split("-").join(" ")}
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
      ></QuadraticBezierLine>
    </motion3d.group>
  );
}

const Camera = () => {
  const camera = useRef<any>(null!);
  const { ...cameraProps } = {
    position: new THREE.Vector3(0, 15, 20),
  };

  useFrame((event) => {
    camera.current.position.x += (mouseX - camera.current.position.x) * 0.05;
    camera.current.position.y += (-mouseY - camera.current.position.y) * 0.05;
  });

  return (
    <motion3d.mesh ref={camera}>
      <PerspectiveCamera
        onPointerMove={handleMove}
        makeDefault
        {...cameraProps}
      />
    </motion3d.mesh>
  );
};

export const GL = () => {
  const [array, setArray] = useState([]);
  // const snap = useSnapshot(state);
  useEffect(() => {
    setArray(arr);
  }, [arr, array]);


  return <App images={array} />;
};
