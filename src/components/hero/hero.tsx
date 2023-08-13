import React, { useEffect, useRef } from "react";
import { motion, useAnimationControls } from "framer-motion";
import { useInView } from "framer-motion";
import Link from "next/link";

const variants = {
  initial: {
    y: 50,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      type: "tween",
      ease: "easeIn",
      delay: 1.25,
      duration: 0.5,
    },
  },
  exit: {
    y: 50,
    opacity: 0,
    transition: {
      type: "tween",
      ease: "easeOut",

      duration: 0.5,
    },
  },
};

const Hero = ({headerPartOne, headerPartTwo, subHeader, text, buttonOne, buttonTwo}:any) => {
const ref = useRef<any>(!null);
const isInView = useInView(ref, {margin:"100px", amount:"some", once:true})
const controls = useAnimationControls()  
useEffect(()=>{
  controls.start("animate")
},[isInView])
  return (
    <>
        <motion.div className="lr__wrapper">
          <motion.div
            className="left-wrapper"
            variants={variants}
            initial="initial"
            animate={controls}
            exit="exit"
          >
            <motion.h1 className="sectionHeader" variants={{initial:{x:100}, animate:{x:0}, exit:{x:-100}}}>
            {headerPartOne}
              <br /> <strong>{headerPartTwo}</strong>
            </motion.h1>
            <motion.h3>{subHeader}</motion.h3>
            <motion.p>
              {text}
            </motion.p>
            <motion.div className="button__wrapper no-flex">
              <Link href="/archive"><button type="button" className="btn__primary">{buttonOne}</button></Link>
              
               {buttonTwo ?  <a href="#contact"><button type="button" className="btn__outline">{buttonTwo}</button></a> : null}
              
            </motion.div>
          </motion.div>
          <motion.div className="right-wrapper"></motion.div>
        </motion.div>
    </>
  );
};

export default Hero;
