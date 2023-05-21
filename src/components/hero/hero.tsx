import React from "react";
import { motion } from "framer-motion";
import Section from "../Section";
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
  return (
    <>
        <div className="lr__wrapper">
          <motion.div
            className="left-wrapper"
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <h1>
            {headerPartOne}
              <br /> <strong>{headerPartTwo}</strong>
            </h1>
            <h3>{subHeader}</h3>
            <p>
              {text}
            </p>
            <div className="button__wrapper no-flex">
              <Link href="/archive"><button type="button" className="btn__primary">{buttonOne}</button></Link>
              
               {buttonTwo ?  <a href="#contact"><button type="button" className="btn__outline">{buttonTwo}</button></a> : null}
              
            </div>
          </motion.div>
          <div className="right-wrapper"></div>
        </div>
    </>
  );
};

export default Hero;
