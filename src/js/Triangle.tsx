import { motion } from "framer-motion-3d";
import React, { useMemo } from "react";
import * as THREE from "three";


const Triangle = ({ vertices, position, clicked }: any) => {
    const f32array = useMemo(
        () =>
            Float32Array.from(
                new Array(vertices.length).fill(undefined)
                    .flatMap((item, index) => vertices[index].toArray())
            ),
        [vertices]
    );

    return (
        <motion.mesh position={position} animate={clicked ? { scale: 0 } : { scale: 1, transition: { delay: 0.5 } }}
        >
            <bufferGeometry attach="geometry">
                <bufferAttribute
                    attach="attributes-position"
                    args={[f32array, 3]}
                />
            </bufferGeometry>
            <meshBasicMaterial
                attach="material"
                color="#1f2029"
                toneMapped={false}
                wireframe={false}
                side={THREE.DoubleSide}
            />
        </motion.mesh>
    );
};

export default Triangle;
