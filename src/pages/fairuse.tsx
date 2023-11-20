import Footer from "@/components/Footer";
import Sec from "@/components/Section";
import Head from "next/head";
import Link from "next/link";

export default function FairUse() {
    return (
        <>
            <Head>
                <title>Rule Zero Archive</title>
                <meta name="description" content="Rule Zero Archive Fair Use policy" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.webp" />

            </Head>
            <Sec
                header="Fair Use"
            >
                <>
                    <p>Last updated 10 October 2023</p>

                    <h3>Fair Use Policy</h3>
                    <p>
                        This document may contain copyrighted material whose use has
                        not been specifically authorized by the copyright owner. The
                        panel members of Rule Zero have authorized us to use their
                        material for the purpose of this page. We believe that this
                        constitutes a &quot;fair use&quot; of the copyrighted material as
                        provided for in section 107 of the US Copyright Law. If you
                        wish to use this copyrighted material for purposes of your own
                        that go beyond &quot;fair use,&quot; you must obtain permission from the
                        copyright owner. If your copyrighted material appears on this
                        web site and you disagree with our assessment that it
                        constitutes &quot;fair use,&quot; <Link prefetch={false} className="text-link" href="/contact">contact us</Link>
                    </p>
                </>
            </Sec>
            <Footer />
        </>
    );
}
