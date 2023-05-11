import React, {
  useRef,
  Suspense,
  useState,
  useEffect,
  useMemo,
  memo,
  useLayoutEffect,
} from "react";
import Papa, { Parser } from "papaparse";
import { motion as motion3d } from "framer-motion-3d";
import {
  MotionConfig,
  motion, useCycle,
  useAnimationControls,
  useMotionValue,
  useTransform,
} from "framer-motion";
import * as THREE from "three";
import { Canvas, extend, useFrame, useThree } from "@react-three/fiber";
import {
  DepthOfField,
  Vignette,
  EffectComposer,
  SSAO,
} from "@react-three/postprocessing";
import { easing } from "maath";
import {
  useScroll,
  Preload,
  Line,
  PerspectiveCamera,
  ScrollControls,
  GradientTexture,
  Text,
  useCursor,
  Environment,
  QuadraticBezierLine,
  Html,
} from "@react-three/drei";
import getUuid from "uuid-by-string";
import { useRoute, useLocation } from "wouter";
import { proxy, useSnapshot } from 'valtio'
import {proxyMap, proxySet} from "valtio/utils"


let parse = false;
const titles: any[] = [];
const pos: any[] = [];
const state = proxySet([]);
const object = proxy({obj: null})

window.addEventListener("DOMContentLoaded", () => {
  console.log("loaded");
  if (parse === false) {
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
          results.data.map((data: any) => {
            var r = data.Link.match(rx);
            state.add(r[1]);
            var t = data.Title;
            titles.push(t);
          });
        },
      }
    );
    console.log(state.size)
    parse = true;
  } else {
    return;
  }
});



const unit = proxy({value: 15})

const font = require("../fonts/FiraSans-ExtraBold.ttf");
let mouseX = 0;
let mouseY = 0;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

const Camera = () => {
  const camera = useRef(null);
  const { ...cameraProps } = {
    position: [0, 15, 20],
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

const Images = ({ q = new THREE.Quaternion(), p = new THREE.Vector3(), ...props }) => {
  const scroll = useScroll();
  const ref = useRef();
  const clicked = useRef();
  const snap = useSnapshot(object)
  const [, params] = useRoute("/item/:id");
  const [, setLocation] = useLocation();

  useFrame((state, dt) => {
    ref.current.position.z = scroll.offset * 2300 - 20;
    easing.damp3(state.camera.position, p, 0.4, dt);
    easing.dampQ(state.camera.quaternion, q, 0.4, dt);
  });

  useEffect(() => {
    clicked.current = ref.current.getObjectByName(params?.id);
    if (clicked.current) {
      clicked.current.updateWorldMatrix(true, true);
      clicked.current.localToWorld(p.set(0, 0, 20));
      clicked.current.getWorldQuaternion(q);
    } else {
      p.set(0, 10, 5.5);
      q.identity();
    }
  });

  state.data.map((item, index) => {
    pos.push([
      index % 2
        ? -(Math.random() < 0.5
            ? 15 + Math.random() * 5
            : 10 + Math.random() * 5)
        : Math.random() < 0.5
        ? 15
        : 10,
      Math.random() < 0.5 ? 10 + Math.random() * 5 : 10 + Math.random() * 5,
      0,
    ]);
  });

  return (
    <>
      <group
        ref={ref}
        name={"timeline"}
        position={[0, 0, 0]}
        onPointerEnter={(e) => {
          e.object.active = true;
        }}
        onPointerLeave={(e) => {
          e.object.active = false;
        }}
        // onClick={(e) => (e.stopPropagation(), setLocation(clicked.current === e.object ? "/" : "/item/" + e.object.name),  clicked.current === e.object ? e.object.active = false : e.object.active = true, console.log(e.object.active))}
        // onPointerMissed={() => (setLocation("/"), ref.current.children.active = false)}
        onClick={(e) => (
          e.stopPropagation(),
          setLocation(clicked.current === e.object ? "/" : "/item/" + e.object.name)

        )}
        onPointerMissed={() => (
           setLocation("/")
        )}
      >
        <Line
          points={[
            [0, 0, 0],
            [0, 0, -state.data.length * unit.value],
          ]}
          color="white"
          lineWidth={2}
          dashed={false}
        />
        {state.data.map((item, index) => 
          <Plane
            name={item}
            active={props.active}
            text={titles[index]}
            factor={Math.random() > 0.5 ? -1 : 1}
            position={[pos[index][0], pos[index][1], -15 * index]}
            key={index + item}
            url={`https://img.youtube.com/vi/${item}/mqdefault.jpg`}
            start={[0, 0, -15 * index]}
            end={[pos[index][0], pos[index][1] - 4, -15 * index]}
            points={[
              [0, 0, -15 * index],
              [pos[index][0], pos[index][1] - 4, -15 * index],
            ]}
            {...props}
          />
        )}
      </group>
    </>
  );
};

const Plane = ({ ...props }) => {
  const ref = useRef();
  const line = useRef();
  const text = useRef();
  const buttons = useRef();
  const size = useThree((state) => state.size);
  const [hidden, set] = useState();

  // const [hovered, hover] = useState(false)
  // useCursor(hovered);

  const controls_mesh = useAnimationControls();

  const variants_mesh = {
    hidden: { scale: 0 },
    visible: { scale: 1 },
    exit: { scale: 0 },
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

  useFrame((time, dt) => {
    time = performance.now() * 0.001;
    ref.current.position.y =
      props.position[1] + Math.sin(time) * 0.3 * props.factor;
    text.current.material.opacity = ref.current.active || ref.current.popUp === true ? 1 : 0;
    ref.current.rotation.y = Math.sin(time * 0.8) * 0.05 * props.factor;
    ref.current.rotation.x = Math.sin(time * 1.2) * 0.05 * props.factor;
    ref.current.position.z <= -ref.current.parent.parent.position.z - 100
      ? controls.start("exit")
      : controls.start("visible");
    ref.current.position.z <= -ref.current.parent.parent.position.z - 100
      ? controls_mesh.start("exit")
      : controls_mesh.start("visible");
  });

  const QBLine = ({ start, end }) => {
    const ref = useRef();
    const factor = 15;
    const mid = [
      ((start[0] + end[0]) / 2) * 1.5,
      Math.max(0, (start[1] + end[1]) / 2 - factor),
      (start[2] + end[2]) / 2,
    ];
    const curve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(start[0], start[1], start[2]),
      new THREE.Vector3(mid[0], mid[1], mid[2]),
      new THREE.Vector3(end[0], end[1], end[2])
    );
    const points = curve.getPoints(30);

    useEffect(() => {
      // ref.current.geometry.setFromPoints([start, mid, end].map((point) => new THREE.Vector3(point[0], point[1], point[2])))
      ref.current.geometry.setFromPoints(points);
      // }, [start, mid, end]);
    }, [points]);
    return (
      <line ref={ref}>
        <bufferGeometry attach={"geometry"}/>
        <lineDashedMaterial attach="material" gapSize={10} dashSize={5} color={"hotpink"} />
      </line>
    );
  };


  const img_plane = new Image();
  img_plane.crossOrigin = "";
  img_plane.src = props.url;
  const texture_plane = new THREE.Texture(img_plane);
  // texture_plane.wrapS = texture_plane.wrapT = THREE.RepeatWrapping;
  img_plane.onload = () => {
    texture_plane.needsUpdate = true;
  };

  
  return (
    <motion3d.group >
      <motion3d.mesh
        name={props.name}
        ref={ref}
        variants={variants_mesh}
        initial="hidden"
        animate={controls_mesh}
        exit={controls_mesh}
        position={props.position}
        active={props.active}
        popUp={props.popUp}
        visible={props.visible}
        {...props}
      >
        <planeGeometry attach="geometry" args={[10, 6]} />
        <motion3d.meshStandardMaterial
          variants={variants}
          initial="hidden"
          animate={controls}
          exit={controls}
          transition={{ type: "tween", ease: "easeOut", duration: 0.5 }}
          attach="material"
          map={texture_plane}
        />
      </motion3d.mesh>
      {/* <QBLine start={props.start} end={props.end}/> */}
      <Html
        ref={buttons}
        // portal={windowRef}
        position={[
          props.position[0] - 5,
          props.position[1] - 3.5,
          props.position[2],
        ]}
      >
      <motion.button variants={button_variants} initial="hidden" >View now!</motion.button>
      </Html>
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
        font={font}
        anchorX="center"
        anchorY="middle"
      >
        <meshBasicMaterial color={"white"} />
        {props.text.split("-").join(" ")}
      </Text>
      <QuadraticBezierLine
        ref={line}
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
};

const handleMove = (event: { clientX: number; clientY: number; }) => {
  mouseX = (event.clientX - windowHalfX) / 100;
  mouseY = (event.clientY - windowHalfY) / 100;
};

export  const GL = ({...props}) => {
  // const [items, setItems] = useState([]);
  // const [itemtitles, setTitles] = useState([]);
  // const ID = useMemo(() => [], []);
  // const titles = useMemo(() => [], []);
  // const pos = useMemo(() => [], []);
  // const unit = 15;
  // const [parse, parsed] = useState(false);
  const snap = useSnapshot(state)

  const windowRef = useRef(null);

 
  return (
    <>
      <div id="canvasWrapper" className="canvas__wrapper" ref={windowRef}>
        <Suspense fallback={null}>
          <MotionConfig transition={{ type: "spring" }}>
            <Canvas
              onMouseMove={handleMove}
              orthographic={false}
              gl={{
                alpha: false,
                antialias: false,
                stencil: false,
                depth: true,
              }}
            >
              <GradientTexture
                attach={"background"}
                stops={[0, 0.5, 1]}
                colors={["#f47d65", "#b12496", "#31302b"]}
                size={1024}
              />
              <ScrollControls distance={0.1} pages={`${snap.size}`}>
                <Images />
              </ScrollControls>

              <Preload all />
              <ambientLight />

              {/* <fog attach="fog" color="hotpink" near={80} far={100} /> */}

              <Camera />
              <pointLight position={[10, 10, 10]} />

              <EffectComposer>
                <Vignette eskil={false} offset={0.1} darkness={0.8} />
              </EffectComposer>
              <Environment preset="city" />
            </Canvas>
          </MotionConfig>
        </Suspense>
      </div>
    </>
  );
}
