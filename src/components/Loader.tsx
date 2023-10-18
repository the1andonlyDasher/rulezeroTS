import { loadManager, totalLoad } from "@/js/atoms";
import { motion, useAnimation } from "framer-motion";
import { useAtom } from "jotai";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

export default function Loader() {
    const router = useRouter();
    const [load, setLoad] = useAtom(totalLoad);
    const [manager, setManager] = useAtom<any>(loadManager);
    const cover_controls = useAnimation();
    const cover = useRef<any>(!null);
    const bar = useRef<any>();

    useEffect(() => {
        if (!router.pathname.includes("/archive")) {
            setTimeout(() => {
                setLoad(true), (bar.current.style.width = 100 + "%");
            }, 1000);
        } else {
            manager.onProgress = function (
                url: any,
                itemsLoaded: any,
                itemsTotal: any
            ) {
                console.log(
                    "Loading file: " +
                    url +
                    ".\nLoaded " +
                    itemsLoaded +
                    " of " +
                    itemsTotal +
                    " files.",
                    load
                );
                bar.current.style.width = (itemsLoaded / itemsTotal) * 100 + "%";
                if ((itemsLoaded / itemsTotal) * 100 === 100) {
                }
            };
            manager.onLoad = function () {
                setTimeout(() => {
                    setLoad(true);
                }, 1000);
            };
        }
        load === true &&
            cover_controls
                .start({
                    opacity: 0,
                    transition: { delay: 0.1, type: "tween", ease: "easeOut" },
                })
                .then(() => {
                    cover_controls.start({ display: "none" });
                });
    }, [load, router.pathname]);

    return (
        <>
            <motion.div id="loader" ref={cover} animate={cover_controls}>
                <div className="loader_img-wrapper">
                    <motion.div
                        className="loader_img-top"
                        initial={{ x: -200, opacity: 1 }}
                        animate={
                            load ? { x: 0, opacity: 0 } : { x: 0, opacity: 1 }
                        }
                    >
                        <Image
                            src="/images/rule.webp"
                            width={474 * 0.5}
                            height={360 * 0.5}
                            alt="RuleZero logo top"
                        />
                    </motion.div>
                    <motion.div
                        className="loader_img-bottom"
                        initial={{ x: 200, opacity: 1 }}
                        animate={
                            load ? { x: 0, opacity: 0 } : { x: 0, opacity: 1 }
                        }
                    >
                        <Image
                            src="/images/zero.webp"
                            width={474 * 0.5}
                            height={360 * 0.5}
                            alt="RuleZero logo bottom"
                        />
                    </motion.div>
                </div>
                <motion.div className="loader_bar-wrapper">
                    <motion.div
                        className="loader_bar"
                        ref={bar}
                        animate={load && { x: 0, oapcity: 0 }}
                    ></motion.div>
                </motion.div>
            </motion.div>
        </>
    );
}
