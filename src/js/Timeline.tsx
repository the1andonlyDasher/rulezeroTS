
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
import { atomField, atomResult, atomSort, atomState, imgs, listView, loadManager } from "@/js/atoms";
import Papa from "papaparse";
import { useRouter } from "next/router";
import { Vector3, Quaternion, ImageLoader } from '../vendor/three-export'
import { Texture } from "three";




const Timeline = () => {
  const [a, aa] = useAtom(atomState)
  const [fetching, fetch] = useState(true);
  const [videoID, setVideoID] = useState<any>([]);
  const [app, setApp] = useAtom<any>(imgs)
  const router = useRouter()
  const [manager, setManager] = useAtom<any>(loadManager)
  const [seen, See] = useState<any>(false)
  const [textures, setTextures] = useState<any>([]);
  const controls = useAnimationControls();
  const [disposed, setDisposed] = useState(false)
  const [isInPage, setIsInPage] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [view, setView] = useAtom<any>(listView)
  const [array, setArray] = useState(a.list)
  // Store sortby order i.e. ascending or descending
  const [sortType, setSortType] = useAtom(atomSort);

  // Sortby field i.e. title or description
  const [sortByField, setSortByField] = useAtom(atomField);

  // Store filter/latest posts
  const [result, setResult] = useAtom(atomResult);

  useEffect(() => {
    setArray(a.list)
  }, [a.list])
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

  function youtube_parser(url: any) {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return (match && match[7].length == 11) ? match[7] : false;
  }

  useEffect(() => {
    if (router.pathname.includes("/archive")) {
      if (typeof window !== "undefined" && fetching) {

        console.log(youtube_parser("/.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/"))

        const rx: RegExp =
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

              results.data.reverse().map((data: any, index) => {
                var r: any = youtube_parser(data.Link);

                var l = data.Link
                var t = data.Title;
                var d = data.Dates;
                var img = data.Images
                if (fetching) {
                  if (!app.find((item: any) => item.name === r)) {
                    app.push({

                      rotation: [0, 0, 0],

                      url: `https://pipedproxy.kavin.rocks/vi/${r}/mqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBhZx_n9AywKMVzcoL_2bYQpUlalw&host=i.ytimg.com`,
                      title: t,
                      link: l,
                      name: r,
                      date: d,
                      img: img,
                      number: results.data.length - index,
                      index: index
                    });
                  }
                  See(true)
                }
              });
              fetch(false)

              app.forEach((item: any) => {
                const texture = new Texture();
                const loader = new ImageLoader(manager);
                loader.setCrossOrigin("");
                loader.withCredentials
                loader.setRequestHeader({ "Access-Control-Allow-Origin": "https://localhost:3000" })
                loader.setRequestHeader({ "Access-Control-Allow-Methods": "GET,OPTIONS,PATCH,DELETE,POST,PUT" })
                loader.setRequestHeader({ "Access-Control-Allow-Headers": "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" })
                loader.load(item.url, function (image) {
                  texture.image = image;
                  texture.name = item.name
                  texture.needsUpdate = true;
                })
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
    const click = useRef<any>(false)
    const unit = proxy({ value: 15 });
    // const [position, setPosition]: any = useState([])

    // useEffect(() => {
    //   const pos: any = (index: any) => [
    //     index % 2
    //       ? -(Math.random() < 0.5
    //         ? 15 + Math.random() * 5
    //         : 15 + Math.random() * 5)
    //       : Math.random() < 0.5
    //         ? 15
    //         : 15,
    //     Math.random() < 0.5
    //       ? 10 + Math.random() * 5
    //       : 10 + Math.random() * 5,
    //     -15 * index,
    //   ]

    //   setPosition(pos)
    // }, [images])

    const Frames = ({ images }: { images: any }) => {
      const p: any = new Vector3();
      const q: any = new Quaternion();
      const ref = useRef<any>(null!);
      const clicked = useRef<any>(null!);
      const scroll = useScroll();

      useEffect(() => {
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
          ref.current.position.z = scroll.offset * (a.list.length * unit.value) - 20;
          easing.damp3(state.camera.position, p, 0.4, dt);
          easing.dampQ(state.camera.quaternion, q, 0.4, dt);
        }
      });

      const position: any = (index: any) => [
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
      ]


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
              [0, 0, -`${images.length}` * unit.value],
            ]}
            color="white"
            lineWidth={1}
            fog
            dashed={false}
          />
          {images.map((props: any, index: number) => {
            const tex = textures.find((item: any) => item.name === props.name)
            const posX = position(index)[0] > 0 ? Math.min((position(index)[0] / 2) * (w / 10), position(index)[0]) : Math.max((position(index)[0] / 2) * (w / 10), position(index)[0]);
            return (
              <Frame
                name={props.name}
                text={props.text}
                isActive={props.isActive}
                texture={tex}
                popUp={props.popUp}
                factor={Math.random() > 0.5 ? -1 : 1}
                position={[posX, position(index)[1], position(index)[2]]}
                key={props.url + index}
                url={props.url}
                date={props.date}
                start={[posX / 6, 0, position(index)[2]]}
                end={[posX, position(index)[1] * 0.95, position(index)[2]]}
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
      const router = useRouter()
      const group = useRef<any>(null!);
      const [hovering, hover] = useState(false);
      const [clicked, setClick] = useState(false)
      useCursor(hovering)



      useFrame((state, dt) => {
        button.current.material.opacity = clicked ? 1 : 0;
        ref.current.position.z <= -ref.current.parent.parent.position.z - 100 ? ref.current.visible = false : ref.current.visible = true
      })


      // useEffect(() => {
      //   text.current.material.opacity = hovering && clicked === false ? 1 : 0;
      // }, [hovering])

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
            position={props.position}
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

            <motion3d.mesh
              ref={image}
              name={props.name}
              position={[0, 0, 0.1]}
              scale={[0.95, 0.95, 0.95]}
            >
              <planeGeometry />
              <motion3d.meshBasicMaterial toneMapped={false} reflectivity={0} visible={!disposed} map={props.texture} />
            </motion3d.mesh>

          </instancedMesh>
          <motion3d.mesh
            variants={button_variants}
            transition={{ duration: 0.5 }}
            animate={clicked ? "visible" : "hidden"}
            ref={button}
            position={[props.position[0], props.position[1], props.position[2] + 0.2]}
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
              props.position[1] - 3.5,
              props.position[2],
            ]}
            font={"/fonts/prompt-v10-latin-900italic.woff"}
            anchorX="center"
            anchorY="top"
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
            {new Date(props.date).toDateString().split("-").join(" ")}
          </Text>
          <QuadraticBezierLine
            // ref={line}
            start={props.start}
            end={props.end}
            color="#71748e"
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

    const pages = `${a.list.length}`;
    const pageCount: number = +pages;

    return (
      <>
        <ScrollControls style={{ zIndex: 100 }} enabled={!click.current} distance={0.1} pages={pageCount} damping={.5}>
          <Frames images={images} />
        </ScrollControls>
      </>
    )
  }

  useEffect(() => {
    setMounted(isInPage)
    if (!isInPage && !view) {
      controls.start({ y: -10 }).then(() => setMounted(false))
    } else {
      controls.start({ y: 0, transition: { delay: 1 } })
    }
  }, [isInPage])

  return (<>
    <directionalLight intensity={10} />
    <Suspense fallback={<Html>Loading timeline...</Html>}>
      <motion3d.group visible={!disposed} animate={controls} onAnimationComplete={onComplete}>
        {mounted && !view && <App images={array} />}
      </motion3d.group>
    </Suspense>
  </>)
}

export default Timeline