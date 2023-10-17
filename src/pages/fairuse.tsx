import Footer from "@/components/Footer";
import Sec from "@/components/Section";
import Link from "next/link";

export default function FairUse() {
    return (
        <>
            <Sec
                header="Fair Use"
                children={
                    <>
                        <div>
                            <p>Last updated 10 October 2023</p>
                            <div className="legal-wrapper">
                                <h3>Fair Use Policy</h3>
                                <p>
                                    This document may contain copyrighted material whose use has
                                    not been specifically authorized by the copyright owner. The
                                    panel members of Rule Zero have authorized us to use their
                                    material for the purpose of this page. We believe that this
                                    constitutes a "fair use" of the copyrighted material as
                                    provided for in section 107 of the US Copyright Law. If you
                                    wish to use this copyrighted material for purposes of your own
                                    that go beyond "fair use," you must obtain permission from the
                                    copyright owner. If your copyrighted material appears on this
                                    web site and you disagree with our assessment that it
                                    constitutes "fair use," <Link className="text-link" href="/contact">contact us</Link>
                                </p>
                            </div>
                        </div>
                    </>
                }
            />
            <Footer />
        </>
    );
}
