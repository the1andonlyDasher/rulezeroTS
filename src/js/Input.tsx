import { useState } from "react"
import { ControlledInput } from "./ControlledInput"
import { Text, Html } from "@react-three/drei"

export function Input({props}:any) {
    const [text, set] = useState('hello world ...')
    return (
      <group {...props}>
        <Text position={[-1.2, -0.022, 0]} anchorX={0} font="/Inter-Regular.woff" fontSize={0.335} letterSpacing={-0.0}>
          {text}
          <meshStandardMaterial color="black" />
        </Text>
        <mesh position={[0, -0.022, 0]} scale={[2.5, 0.48, 1]}>
          <planeGeometry />
          <meshBasicMaterial transparent opacity={0.3} depthWrite={false} />
        </mesh>
        <Html transform={true}>
          <ControlledInput type={text} onChange={(e:any) => set(e.target.value)} value={text} />
        </Html>
      </group>
    )
  }