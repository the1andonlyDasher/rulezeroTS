import { loadManager, totalLoad } from "@/pages/atoms";
import { motion, useAnimation } from "framer-motion";
import { useAtom } from "jotai";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

export default function Loader() {
    const router = useRouter()
    const [load, setLoad] = useAtom(totalLoad)
    const [manager, setManager] = useAtom<any>(loadManager)
    const cover_controls = useAnimation()
    const cover = useRef<any>(!null)
    const bar = useRef<any>()

    useEffect(() => {
        if (!router.pathname.includes("/archive")) {

            setTimeout(() => { setLoad(true), bar.current.style.width = 100 + '%' }, 1000)
        } else {
            manager.onProgress = function (url: any, itemsLoaded: any, itemsTotal: any) {
                console.log('Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.', load);
                bar.current.style.width = (itemsLoaded / itemsTotal * 100) + '%'
                if ((itemsLoaded / itemsTotal * 100) === 100) {

                }
            }
            manager.onLoad = function () {
                setTimeout(() => { setLoad(true) }, 1000)
            }
        }
        load === true && cover_controls.start({ opacity: 0, transition: { delay: .1, type: "tween", ease: "easeOut" } }).then(() => { cover_controls.start({ display: "none" }) })

    }, [load, router.pathname])

    return (<>
        <motion.div id="loader" ref={cover} animate={cover_controls} style={{ backgroundColor: "#1e1f26", zIndex: 999, top: 0, left: 0, width: "100%", height: "100%", display: "flex", position: "fixed", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
            <motion.div initial={{ x: 200, scale: 0, opacity: 1 }} animate={load ? { x: -200, opacity: 0 } : { x: 0, scale: 1, opacity: 1 }}><Image src="/images/maxresdefault.png" width={200} height={120} alt="RuleZero logo" /></motion.div>
            <motion.div style={{ height: "10px", margin: "2rem", width: "400px", border: " 1px solid #111" }}>
                <motion.div ref={bar} style={{ height: "10px", background: "ivory", width: 0, maxWidth: "90%" }} animate={load && { x: 200, oapcity: 0 }}>
                </motion.div>
            </motion.div>
        </motion.div>
    </>)
}