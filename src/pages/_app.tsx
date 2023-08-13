import '@/styles/style.css'
import type { AppProps } from 'next/app'
import Layout from '@/components/Layout';
import React from 'react';
import { GL } from '@/js/GL';
import { AnimatePresence } from 'framer-motion';


export default function App({ Component, pageProps }: AppProps) {
//  useEffect(()=>{
//   console.log("mounting")
//  },[])
  return (<>
<Layout>
      <Component {...pageProps} />
    </Layout>
    <AnimatePresence>
<GL/>
</AnimatePresence>

  </>)
}
