import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useCycle } from "framer-motion";
import { NavItem } from "@/components/Nav/NavItemDesktop";
import Navigation from "@/components/Nav/Navigation";
import MobileNav from "@/components/Nav/MobileNav";
import { NavItem as Mnav } from "@/components/Nav/NavItemMobile";
import NavbarToggle from "./NavbarToggle";

const Navbar = ({ logo, alt, children }) => {
  const navbarMain = useRef();
  const [isShrunk, setShrunk] = useState(false);
  useEffect(() => {
    const handler = () => {
      setShrunk((isShrunk) => {
        if (
          !isShrunk &&
          (document.body.scrollTop > 100 ||
            document.documentElement.scrollTop > 100)
        ) {
          return true;
        }
        if (
          isShrunk &&
          document.body.scrollTop < 4 &&
          document.documentElement.scrollTop < 4
        ) {
          return false;
        }
        return isShrunk;
      });
    };
    handler();
    window.addEventListener("scroll", handler);
    //--------------------------------------------------------------------------------------- Mutation Observer
    // var observer = new MutationObserver(function (mutations) {
    //   mutations.forEach(function (mutation) {
    //     setChanged(true);
    //     console.log(changed);
    //   });
    // });

    // var config = { attributes: false, childList: true, characterData: false };

    // observer.observe(document.getElementById("data-scroll-content"), config);
    return () => window.removeEventListener("scroll", handler);
  }, []);


  const variants = {
    closed:{},
    open:{}
  };

  const image_variants = {
    initial: { scale: 0, opacity: 0},
    enter: {scale: [0, 1.2 ,1], opacity: 1},
    exit: {scale: 0, opacity: 0},
  }

  const [isOpen, toggleOpen] = useCycle(false, true);
  const navitems = ["Home", "Training", "Über mich", "Kontakt"];
  const hrefs = ["/", "/#cards", "/#about", "/#contact"];

  return (
    <motion.nav
      className={isShrunk ? "navbar shrunk" : "navbar"}
      variants={variants}
      ref={navbarMain}
      initial={false}
      animate={isOpen ? "open" : "closed"}
    >
      <div className="navbar__container" aria-haspopup="menu" >
        <motion.a
          aria-label="Home"
          aria-current="page"
          className="navbar__logo active"
          href="/"
          variants={image_variants} initial="hidden" animate="enter" exit="exit"
        >
          <Image  src={logo} alt={alt} />
        </motion.a>
        <Navigation>
            {navitems.map((i, index) => (
              <NavItem key={i} name={i} href={hrefs[index]} />
            ))}
          </Navigation>
          <MobileNav>
            {navitems.map((i, index) => (
              <Mnav toggle={()=> toggleOpen()} key={i} name={i} href={hrefs[index]} />
            ))}
          </MobileNav>
          <NavbarToggle toggle={() => toggleOpen()} />
      </div>
    </motion.nav>
  );
};

export default Navbar;
