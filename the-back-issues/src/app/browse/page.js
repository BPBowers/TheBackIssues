'use client'
import { useRef, useState } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { TextureLoader, MeshBasicMaterial, SRGBColorSpace, PlaneGeometry, Mesh } from 'three'

function Comic (props) {
    const ref = useRef()

    const [hovered, hover] = useState(false)
    const [clicked, click] = useState(false)

    const frontTexture = useLoader(TextureLoader, 'https://cdn.marvel.com/u/prod/marvel/i/mg/4/20/56966d674b06d/clean.jpg');
    frontTexture.colorSpace = SRGBColorSpace;
    const backTexture = useLoader(TextureLoader, 'https://cdn.marvel.com/u/prod/marvel/i/mg/e/30/56966f1154368/clean.jpg');
    backTexture.colorSpace = SRGBColorSpace;

    useFrame((_, delta) => {
        if(ref.current) {
            ref.current.rotation.y += delta * 2;
        }
    });

    return (
        <group 
                {...props}
                ref={ref}>
            <mesh
                position={[0, 0, 0.001]}
            >
                <planeGeometry args={[2, 3.5]}/>
                <meshBasicMaterial map={frontTexture}/>
            </mesh>
            <mesh 
                rotation={[0, Math.PI, 0]}
                position={[0, 0, -0.001]}>
                <planeGeometry args={[2, 3.5]}/>
                <meshBasicMaterial map={backTexture}/>
            </mesh>
        </group>
    )
}

export default function BrowsePage() {
    return (
        <div style={{ height: '50vh', width: '100vw' }}>
            <Canvas>
                <ambientLight intensity={0.50} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                <pointLight position={[-10, -10, -10]} />
                <Comic position={[0, 0, 2]} />
            </Canvas>
        </div>
    )
}

//<color attach="background" args={['000']} />