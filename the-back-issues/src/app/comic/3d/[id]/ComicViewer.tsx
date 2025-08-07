'use client'
import {Canvas, useFrame, useLoader } from '@react-three/fiber'
import { useRef, useEffect, useState } from 'react'
import { TextureLoader, SRGBColorSpace, MathUtils } from 'three'

function Comic({ frontCover }: {frontCover: string}) {
    const ref = useRef()

    useEffect(() => {
        if(ref.current) {
            ref.current.direction = true; //Default comic turns right
        }
    })

    const backTexture = useLoader(TextureLoader, 'https://cdn.marvel.com/u/prod/marvel/i/mg/e/30/56966f1154368/clean.jpg')
    const frontTexture = useLoader(TextureLoader, frontCover)

    backTexture.colorSpace = SRGBColorSpace
    frontTexture.colorSpace = SRGBColorSpace

    //Frame Animation
    useFrame((_, delta) => {
        if(ref.current) {
            const rotation = ref.current.rotation.y;
            if(rotation >= MathUtils.degToRad(55))
                ref.current.direction = false; //Rotate Left
            else if(rotation <= MathUtils.degToRad(-55))
                ref.current.direction = true; //Rotate Right
        const speed = delta;
        ref.current.rotation.y += ref.current.direction ? speed : -speed;
        }
    })

    return (
        <group ref={ref} position={[0, 0, 2]}>
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