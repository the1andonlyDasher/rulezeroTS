import { imgs, loadManager } from "@/js/atoms";
import { useAtom } from "jotai";
import Head from "next/head";
import { useRouter } from "next/router";
import Papa from "papaparse";
import { useEffect, useState } from "react";
import { TextureLoader } from "three";

// const YOUTUBE_PLAYLIST_ITEMS_API = 'https://www.googleapis.com/youtube/v3/playlistItems';




export default function Archive() {

  return (
    <>
      <Head>
        <title>Rule Zero Archive</title>
        <meta name="description" content="Archive subpage for Rule Zero" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimg.fotocommunity.com%2Ffuchs-453389a4-f116-499d-98bf-c13de6787126.jpg%3Fheight%3D1000&f=1&nofb=1&ipt=e17a7b56fe5c02bce1c2288c281ab6034f8573991c83eb1b989bfc78a4b22b2e&ipo=images" />
    </>
  )
}