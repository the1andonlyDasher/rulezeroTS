import Hero from "@/components/hero/hero";
import { useAtom } from "jotai";
import Head from "next/head";
import { useEffect } from "react";

export default function Archive(){
    return(
        <>
              <Head>
        <title>Rule Zero Archive</title>
        <meta name="description" content="Archive subpage for Rule Zero" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        </>
    )
}