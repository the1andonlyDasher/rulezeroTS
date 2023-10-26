import Footer from "@/components/Footer"
import Sec from "@/components/Section"
import Head from "next/head"

export default function DataPolicy() {
    return (<>
        <Head>
            <title>Rule Zero Archive</title>
            <meta name="description" content="Rule Zero Archive Data Policy" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.webp" />

        </Head>
        <Sec header="Data Protection Policy">
            <div>
                <p>This page itself is not using any cookies.</p>
            </div>
        </Sec>
        <Footer />
    </>)
}