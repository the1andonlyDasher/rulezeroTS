import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import Head from "next/head";

export default function Archive() {
  return (
    <>
      <Head>
        <title>Rule Zero Archive</title>
        <meta name="description" content="Contact subpage for Rule Zero" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.webp" />

      </Head>
      <ContactForm props={{
        title: "Contact us!",
        subtitle: "Requests, suggestions, criticism, we'll handle it.",
        sectionName: undefined,
        id: undefined
      }} />
      <Footer />


    </>

  )
}