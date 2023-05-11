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

const Hero = () => {
  return (
    <>
      <Section>
        <div className="lr__wrapper">
          <motion.div
            className="left-wrapper"
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <h1>
              Actionable
              <br /> <strong> Information</strong>
            </h1>
            <h3>Swapping notes and talking shop</h3>
            <p>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut.
            </p>
            <div className="button__wrapper no-flex">
              <Link href="/archive"><button type="button" className="btn__primary">Watch now!</button></Link>
              
                <a href="#contact"><button type="button" className="btn__outline">Contact us</button></a>
              
            </div>
          </motion.div>
          <div className="right-wrapper"></div>
        </div>
      </Section>
    </>
  );
};

export default Hero;
