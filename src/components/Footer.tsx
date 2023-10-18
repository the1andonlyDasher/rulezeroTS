import React, { useEffect } from "react";
import Link from "next/link";

const Footer = () => {
  const date = new Date()

  return (
    <>
      <footer className="footer">
        <h5>© {date.getFullYear()} Rule Zero. All Rights Reserved.</h5>
        <div className="footer-links">
          <div>
            <Link
              data-link-text="Impressum"
              className="btn__outline"
              href={"/datapolicy"}
            >
              Data Policy
            </Link>
          </div>
          <div>
            <Link
              data-link-text="Datenschutz"
              className="btn__outline"
              href={"/fairuse"}
            >
              Fair Use
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
