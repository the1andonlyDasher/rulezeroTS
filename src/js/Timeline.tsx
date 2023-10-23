
import { useEffect, useRef, useState, Suspense } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import {
  useCursor,
  QuadraticBezierLine,
  Text,
  Line,
  useScroll,
  ScrollControls,
  useAspect,
  Html,
  Image as DreiImage
} from "@react-three/drei";
import { easing } from "maath";
import {
  useAnimationControls,
} from "framer-motion";
import { motion as motion3d } from "framer-motion-3d";
import { proxy } from "valtio";
import { useAtom } from "jotai";
import { imgs, loadManager } from "@/js/atoms";
import Papa from "papaparse";
import { useRouter } from "next/router";
import { Vector3, Quaternion, TextureLoader } from '../vendor/three-export'




const Timeline = () => {
  const [fetching, fetch] = useState(true);
  const [array, setArray] = useState<any>([]);
  const [app, setApp] = useAtom<any>(imgs)
  const router = useRouter()
  const [manager, setManager] = useAtom<any>(loadManager)
  const [seen, See] = useState<any>(false)
  const [textures, setTextures] = useState<any>([]);
  const controls = useAnimationControls();
  const [disposed, setDisposed] = useState(false)
  const [isInPage, setIsInPage] = useState(false)
  const [mounted, setMounted] = useState(false)



  useEffect(() => {
    setDisposed(false)
    if (router.pathname === "/archive") {
      setTimeout(() => {
        setIsInPage(true)
      }, 1000)
    } else {
      setIsInPage(false)
      setDisposed(true)
    }
  }, [router])

  function onComplete() {
    setDisposed(!isInPage)
  }

  useEffect(() => {

    if (router.pathname.includes("/archive")) {
      if (typeof window !== "undefined" && fetching) {
        var r: any,
          rx: any =
            /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/|shorts\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;

        Papa.parse(
          "https://docs.google.com/spreadsheets/d/e/2PACX-1vSloYeSqI6BpICcq9gG5a3KRhXv99DKlrj9XmEAIvmX0BxWw-olhU9J9kDG0LvM976e8jYblR0THwkj/pub?output=csv",
          {
            skipEmptyLines: "greedy",
            preview: 0,
            worker: false,
            download: true,
            header: true,
            complete: (results) => {
              console.log("Parsing complete:", results);
              results.data.map((data: any, index) => {
                r = data.Link.match(rx);
                var l = data.Link
                var t = data.Title;
                var d = data.Dates;
                if (fetching) {
                  if (!app.find((item: any) => item.name === r[1])) {
                    app.push({
                      position: [
                        index % 2
                          ? -(Math.random() < 0.5
                            ? 15 + Math.random() * 5
                            : 15 + Math.random() * 5)
                          : Math.random() < 0.5
                            ? 15
                            : 15,
                        Math.random() < 0.5
                          ? 10 + Math.random() * 5
                          : 10 + Math.random() * 5,
                        -15 * index,
                      ],
                      rotation: [0, 0, 0],
                      url: `https://img.youtube.com/vi/${r[1]}/mqdefault.jpg`,
                      title: t,
                      link: l,
                      name: r[1],
                      date: d
                    });
                  }

                  setArray(app)
                  See(true)
                }
              });
              fetch(false)
              app.forEach((item: any) => {
                const img = new Image()
                img.src = item.url;
                textures.push(img)
                const texture: any = new TextureLoader(manager).load(`${item.url}`)
                textures.push(texture)
              })

            },
          }
        );
      }
    }
    console.log(textures)
  }, [router.pathname]);




  const App = ({ images }: { images: any }) => {
    const { size } = useThree();
    const [w, h] = useAspect(size.width, size.height)
    const [app, setApp] = useAtom(imgs)
    const click = useRef<any>(false)
    const unit = proxy({ value: 15 });

    const Frames = ({ images }: { images: any }) => {
      const p: any = new Vector3();
      const q: any = new Quaternion();
      const ref = useRef<any>(null!);
      const clicked = useRef<any>(null!);
      const scroll = useScroll();

      useEffect(() => {
        // console.log(clicked)
        if (clicked.current) {
          clicked.current.updateWorldMatrix(true, true);
          clicked.current.getWorldQuaternion(q);

        }
        else {
          p.set(0, w / 6, 20);
          q.identity();
        }
      }, [clicked]);

      useFrame((state, dt) => {
        if (router.pathname === "/archive") {
          ref.current.position.z = scroll.offset * (app.length * unit.value) - 20;
          easing.damp3(state.camera.position, p, 0.4, dt);
          easing.dampQ(state.camera.quaternion, q, 0.4, dt);
        }
      });

      return (
        <group
          ref={ref}
          onPointerEnter={(_e) => {
          }}
          onPointerLeave={(_e) => {
          }}
          onClick={(e) => {
            e.stopPropagation(),
              click.current = true
            e.object.localToWorld(p.set(0, 0, 10 + (5 / w * h)))
          }}
          onPointerMissed={() => {
            p.set(0, w / 6, 20)
            click.current = false
          }
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
          {images.map((props: any, index: number) => {
            const posX = props.position[0] > 0 ? Math.min((props.position[0] / 2) * (w / 10), props.position[0]) : Math.max((props.position[0] / 2) * (w / 10), props.position[0]);
            return (
              <Frame
                name={"asd"}
                text={props.text}
                isActive={props.isActive}
                texture={textures[index]}
                popUp={props.popUp}
                factor={Math.random() > 0.5 ? -1 : 1}
                position={[posX, (props.position[1] / 2) * (h / 10), props.position[2]]}
                key={props.url + index}
                url={props.url}
                date={props.date}
                start={[posX / 6, 0, -15 * index]}
                end={[posX, props.position[1] - 4, -15 * index]}
                points={[
                  [0, 0, -15 * index],
                  [posX, props.position[1] - 4, -15 * index],
                ]}
                {...props}
              />
            )
          }
          )}
        </group>
      );
    };



    const Frame = ({ ...props }) => {
      const image = useRef<any>(null!);
      const text = useRef<any>(null!);
      const ref = useRef<any>(null!);
      const button = useRef<any>(null!);
      const matButton = useRef<any>(null!);
      const router = useRouter()
      const group = useRef<any>(null!);
      const [hovering, hover] = useState(false);
      const [clicked, setClick] = useState(false)
      useCursor(hovering)



      useFrame((state, dt) => {
        button.current.material.opacity = clicked ? 1 : 0;
        ref.current.position.z <= -ref.current.parent.parent.position.z - 100 ? ref.current.visible = false : ref.current.visible = true
      })


      useEffect(() => {
        text.current.material.opacity = hovering && clicked === false ? 1 : 0;
      }, [hovering])

      const controls_mesh = useAnimationControls();

      const variants_mesh = {
        hidden: { scaleX: 0, scaleY: 0 },
        visible: { scaleX: Math.min(6 * (w / 10), 11), scaleY: Math.min(6 * (w / 10), 6), transition: { type: "spring", stiffness: 500, damping: 30 } },
        exit: { scaleX: 0, scaleY: 0, transition: { type: "spring", stiffness: 500, damping: 30 } },
      };

      const controls = useAnimationControls();

      const button_variants = {
        hidden: { scale: 0 },
        visible: { scale: 1 },
        exit: { scale: 0 },
      };

      const variants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
        exit: { opacity: 0 },
      };

      const posX = props.position[0] > 0 ? Math.min((props.position[0] / 2) * (w / 10), props.position[0]) : Math.max((props.position[0] / 2) * (w / 10), props.position[0]);

      return (

        <motion3d.group ref={group} >

          <instancedMesh ref={ref} args={[undefined, undefined, 1]}
            scale={[Math.min(11 * (w / 10), 11), Math.min(6 * (w / 10), 6), 1]}
            onPointerOver={(e) => (e.stopPropagation(), hover(clicked ? false : true))}
            onPointerOut={() => hover(clicked ? false : false)}
            onClick={() => setClick(true)}
            onPointerMissed={() => setClick(false)}
            position={[posX, props.position[1], props.position[2]]}
          >
            <planeGeometry />
            <motion3d.meshBasicMaterial
              variants={variants}
              initial="hidden"
              visible={!disposed}
              animate={controls}
              // exit={controls}
              transition={{ type: "tween", ease: "easeOut", duration: 0.25 }}
              color="#ffffff"
            // envMapIntensity={2}
            />

            {/* <Image url={props.url} toneMapped={false} position={[0, 0, 0.1]} ref={image} scale={0.95} name={props.name} /> */}


            {/* <motion3d.mesh
              ref={image}
              name={props.name}
              position={[0, 0, 0.1]}
              scale={[0.95, 0.95, 0.95]}
            >
              <planeGeometry />
              <motion3d.meshBasicMaterial toneMapped={false} reflectivity={0} visible={!disposed} map={props.texture} />
            </motion3d.mesh> */}

          </instancedMesh>
          <motion3d.mesh
            variants={button_variants}
            transition={{ duration: 0.5 }}
            animate={clicked ? "visible" : "hidden"}
            ref={button}
            position={[props.end[0], props.end[1], props.end[2] + 0.2]}
            scale={[1, 1, 1]}
            visible={clicked}
            onPointerOver={(e) => (e.stopPropagation(), hover(true))}
            onPointerOut={() => hover(false)}
          >
            <planeGeometry args={[5, 1.5, 1]} />
            <motion3d.meshBasicMaterial color={hovering ? "grey" : "white"} />
            <Text
              maxWidth={10}
              characters="abcdefghijklmnopqrstuvwxyz0123456789!"
              fontSize={0.6}
              position={[0, 0, 0.1]}
              font={"/fonts/prompt-v10-latin-900italic.woff"}
              anchorX="center"
              anchorY="middle"
              onClick={() => { router.push(`${props.link}`) }}
            >
              <meshBasicMaterial color={"#222"} visible={!disposed} />
              {"Watch now!".split("-").join(" ")}
            </Text>
          </motion3d.mesh>
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
            <meshBasicMaterial color={"white"} visible={!disposed} />
            {props.title.split("-").join(" ")}
          </Text>
          <Text
            maxWidth={10}
            characters="abcdefghijklmnopqrstuvwxyz0123456789!"
            fontSize={0.6}
            position={[
              0,
              0,
              props.position[2],
            ]}
            font={"/fonts/prompt-v10-latin-900italic.woff"}
            anchorX="center"
            anchorY="middle"
          >
            <meshBasicMaterial color={"white"} visible={!disposed} />
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
            visible={!disposed}
            dashed
            fog
          ></QuadraticBezierLine>

        </motion3d.group>
      );
    };

    const pages = `${app.length}`;
    const pageCount: number = +pages;

    return (
      <>
        <ScrollControls enabled={!click.current} distance={0.1} pages={pageCount} damping={.5}>
          <Frames images={app} />
        </ScrollControls>
      </>
    )
  }

  useEffect(() => {
    setMounted(isInPage)
    if (!isInPage) {
      controls.start({ y: -100 }).then(() => setMounted(false))
    } else {
      controls.start({ y: 0, transition: { delay: 1 } })
    }
  }, [isInPage])

  return (<>
    <directionalLight intensity={10} />
    <Suspense fallback={<Html>Loading timeline...</Html>}>
      <motion3d.group visible={!disposed} animate={controls} onAnimationComplete={onComplete}>
        {mounted && <App images={array} />}
      </motion3d.group>
    </Suspense>
  </>)
}

export default Timeline