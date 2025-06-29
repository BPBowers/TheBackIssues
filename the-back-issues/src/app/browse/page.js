'use client'
import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'

function Box (props) {
    const ref = useRef()

    const [hovered, hover] = useState(false)
    const [clicked, click] = useState(false)

    useFrame((state,delta) => (ref.current.rotation.x += delta))

    return (
        <mesh
            {...props}
            ref={ref}
            scale={clicked ? 1.5 : 1}
            onClick={(event)=> click(!clicked)}
            onPointerOver={(event)=> hover(true)}
            onPointerOut={(event)=>hover(false)}
        >
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} /> 
        </mesh>
    )
}

export default function BrowsePage() {
    return (
        <Canvas>
            <color attach="background" args={['fff']} />
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
            <pointLight position={[-10, -10, -10]} />
            <Box position={[-1.2, 0, 0]} />
            <Box position={[1.2, 0, 0]} />
        </Canvas>
    )
}