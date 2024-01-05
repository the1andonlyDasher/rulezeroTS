import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import Head from "next/head";
import { useEffect, useState } from "react";

export default function Archive() {


  function getRandomInt(min: any, max: any) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  var computerResponse = getRandomInt(1, 3);

  const [rand, setRand] = useState(computerResponse)
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setRand(computerResponse)
  }, []);
  return (
    <>
      <Head>
        <title>Rule Zero Archive</title>
        <meta name="description" content="Contact subpage for Rule Zero" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.webp" />

      </Head>

      {rand &&
        <ContactForm props={{
          title: "Contact us!",
          sectionName: undefined,
          id: undefined
        }} />}
      <Footer />


    </>

  )
}