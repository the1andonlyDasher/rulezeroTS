import React, { useEffect } from "react";
import Link from "next/link";

const Footer = () => {
  useEffect(()=>{
    // console.log("footer mounted")
  })
  return (
    <>
      <footer className="footer">
        <h5>Rule Zero © 2023</h5>
        <ul className="footer-links">
          <li>
            <Link
              data-link-text="Impressum"
              className="btn__outline"
              href={"/Impressum"}
            >
              Company Details
            </Link>
          </li>
          <li>
            <Link
              data-link-text="Datenschutz"
              className="btn__outline"
              href={"/Datenschutz"}
            >
              Privacy
            </Link>
          </li>
        </ul>
      </footer>
    </>
  );
};

export default Footer;
