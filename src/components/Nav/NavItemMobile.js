import React from 'react';
import { motion } from "framer-motion";
import Link from 'next/link';

const variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 }
    }
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 }
    }
  }
};
export const NavItem = ({href, name, toggle}) => {
    return (
        <>
      <motion.li
      className='nav-item'
        variants={variants}
      >
        <Link scroll={false} onClick={toggle} aria-label={name} className="nav-link black" href={`${href}`}>{name}</Link>
      </motion.li>
      </>
    );
  };

