import '@/styles/scss/style.scss'
import type { AppProps } from 'next/app'
import Layout from '@/components/Layout';
import React, { useEffect, useRef, useState } from 'react';
import { GL } from '@/js/GL';
import { AnimatePresence, motion } from 'framer-motion';
import Loader from '@/components/Loader';


export default function App({ Component, pageProps }: AppProps) {
  //   // set our ref for the fake mouse pointer
  //   const pointer = useRef<any>();

  //   // Set cursor variant to change color on hover text
  // const [cursorVariant, setCursorVariant] = useAtom(cursor);

  //   // state for mouse position
  //   const [mousePosition, setMousePosition] = useState({
  //     x: 0,
  //     y: 0,
  //   });

  //     // Variant animation
  //     const variants:any = {
  //       default: {
  //         x: mousePosition.x - 8,
  //         y: mousePosition.y - 8,
  //       },   
  //       text: {
  //         height: 150,
  //         width: 150,
  //         x: mousePosition.x - 70,
  //         y: mousePosition.y - 70,
  //         backgroundColor: "aqua",
  //         mixBlendMode: "difference",
  //       },
  //    };
  //    useEffect(() => {
  //     const mouseMove = (e:any) => {
  //       setMousePosition({
  //         x: e.clientX,
  //         y: e.clientY,
  //       });
  //     };

  //     window.addEventListener("mousemove", mouseMove);

  //     return () => {
  //       window.removeEventListener("mousemove", mouseMove);
  //     };
  //   }, []);
  return (<>
    <Loader />
    <Layout>
      <Component {...pageProps} />
    </Layout>
    <AnimatePresence>
      <GL />
    </AnimatePresence>
    {/* <motion.div
        ref={pointer} 
        className="pointer"
        variants={variants}
        animate={cursorVariant}
        transition={{type:"spring", damping:10, stiffness:100, restDelta: 0.001, duration: 0.15}}
        ></motion.div> */}

  </>)
}
