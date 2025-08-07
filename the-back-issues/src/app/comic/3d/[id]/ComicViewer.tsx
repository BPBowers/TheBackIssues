'use client'

import {Canvas, useFrame, useLoader } from '@react-three/fiber'
import { useRef, useState } from 'react'
import { TextureLoader, SRGBColorSpace } from 'three'

function Comic({ frontCover }) {
    const ref = useRef()

    const backTexture = useLoader(TextureLoader, 'https://cdn.marvel.com/u/prod/marvel/i/mg/e/30/56966f1154368/clean.jpg')
    const frontTexture = useLoader(TextureLoader, frontCover)

    backTexture.colorSpace = SRGBColorSpace
    frontTexture.colorSpace = SRGBColorSpace

    //Frame Animation
    useFrame((_, delta) => {
        if(ref.current) {
            ref.current.rotation.y += delta * 2;
        }
    })

    return (
        <group ref={ref}>
            <mesh position={[0, 0, 0.001]}>
                <planeGeometry args={[2, 3.5]}/>
                <meshBasicMaterial map={frontTexture}/>
            </mesh>
            <mesh rotation={[0, Math.PI, 0]} position={[0, 0, -0.001]}>
                <planeGeometry args={[2, 3.5]}/>
                <meshBasicMaterial map={backTexture}/>
            </mesh>
        </group>
    )
}

export default function ComicViewer({ frontCover }: { frontCover: string }) {
    return (
        <Canvas style={{ height: '50vh', width: '100vw' }}>
            <ambientLight intensity={0.5}/>
            <spotLight position={[10, 10 , 10]} angle={0.15} penumbra={1} />
            <pointLight position={[-10, -10, -10]}/>
            <Comic frontCover={frontCover}/>
        </Canvas>
    )
}