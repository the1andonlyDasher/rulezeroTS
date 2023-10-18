import React, { useRef, forwardRef, ReactNode, ReactComponentElement, ReactElement, useEffect, useState } from "react";
import { motion, useAnimationControls, useInView } from "framer-motion";
import { useAtom } from "jotai";


const section_variants = {
  initial: {
    transition: { staggerChildren: 0.2 },
  },
  enter: {
    transition: { staggerChildren: 0.2, },
  },
  exit: {
    transition: { staggerChildren: 0.2 },
  },
};

const text_variants = {
  initial: { opacity: 0, x: 100 },
  enter: {
    opacity: 1,
    rotate: "15deg",
    transition: { ease: "easeIn", duration: 0.5 },
  },
  exit: {
    opacity: 0,
    rotate: "0deg",

    transition: { ease: "easeOut", duration: 0.5 },
  },
};

const header_variants = {
  initial: { opacity: 0, x: 100 },
  enter: {
    opacity: 1,
    x: 0,
    transition: { ease: "easeIn", duration: 0.5 },
  },
  exit: {
    opacity: 0,
    x: -100,
    transition: { ease: "easeOut", duration: 0.5 },
  },
};

interface sectionProps {
  sectionName?: string;
  ref?: any
  id?: string;
  header?: string | number;
  text?: string;
  children?: JSX.Element
}

interface sProps {
  props: sectionProps;
}

function Section({ sectionName, ref, id, text, header, children }: sectionProps) {

  return (
    <motion.section
      data-section-name={sectionName}
      initial="initial"
      whileInView="enter"
      viewport={{ margin: "0px", amount: 0.1, once: true }}
      exit="exit"
      ref={ref}
      id={id}
      variants={section_variants}
    >
      <motion.div variants={section_variants} >
        {header ? (
          <motion.h2 variants={header_variants}>{header}</motion.h2>
        ) : null}
        {text ? (
          <motion.p variants={text_variants}>{text}</motion.p>
        ) : null}
        {children}
      </motion.div>
    </motion.section>
  );
}
Section.displayName = "Section"

const Sec = forwardRef<ReactElement, sectionProps>((props, ref) => <Section {...props}></Section>);

export default Sec;
