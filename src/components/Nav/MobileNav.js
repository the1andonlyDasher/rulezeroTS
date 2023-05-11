import React from "react";
import { motion, useScroll, useCycle } from "framer-motion";
import { NavItem } from "./NavItemMobile";
import NavbarToggle from "./NavbarToggle";


const variants = {
    open:{
      clipPath: "circle(100% at 50% 50%)",
      transition: {
        type: "tween",
        staggerChildren: 0.07, 
        delayChildren: 0.2
      }
    },
    closed: {
        clipPath: "circle(0% at 50% 50%)",
      transition: {
        delay: 0.5,
        type: "tween",
        staggerChildren: 0.05, 
        staggerDirection: -1
      }
    }
  };



const MobileNav = ({children}) => {
    
  return (
    <>
      <motion.ul
        id="nav-items-mobile"
        className="nav-items-mobile"
        variants={variants}

      >
       {children}
      </motion.ul>
      
    </>
  );
};

export default MobileNav;
