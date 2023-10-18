
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar/navbar'
import { motion } from 'framer-motion';
import { useAtom } from 'jotai';
import { Html, Head, Main, NextScript } from 'next/document'
import { useEffect, useRef, useState } from 'react';
import { cursor } from '../js/atoms';




export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
