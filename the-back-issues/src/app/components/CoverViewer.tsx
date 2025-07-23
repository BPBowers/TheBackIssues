'use client'
import { useRef, useState } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import * as THREE from 'three'
import { TextureLoader, SRGBColorSpace, } from 'three'

interface ComicBook {
    id: number;
    issue?: number | null;
    frontCover?: string | null;
    backCover?: string | null;
    coverPrice?: number | null;
    releaseDate?: string | null;
    seriesTitle?: string | null;
}

interface CoverViewerProps {
    comic: ComicBook;
}

const CoverViewer: React.FC<CoverViewerProps> = ({ comic }) => {
    
    //const frontCoverSrc = comic.frontCover 
    //    ? `data:image/jpeg;base64,${comic.frontCover}` 
    //    : 'https://cdn.marvel.com/u/prod/marvel/i/mg/4/20/56966d674b06d/clean.jpg';

    //const backCoverSrc = comic.backCover
    //    ? `data:image/jpeg;base64,${comic.backCover}`
    //    : 'https://cdn.marvel.com/u/prod/marvel/i/mg/4/20/56966d674b06d/clean.jpg';

    const frontCoverSrc = comic.frontCover;
    const backCoverSrc = comic.backCover;

    //3d Stuff
    const meshRef = useRef<THREE.Group>(null)

    const [hovered, hover] = useState(false)
    const [clicked, click] = useState(false)

    const frontTexture = useLoader(TextureLoader, frontCoverSrc);
    frontTexture.colorSpace = SRGBColorSpace;
    const backTexture = useLoader(TextureLoader, backCoverSrc);
    backTexture.colorSpace = SRGBColorSpace;

    useFrame((_, delta) => {
        if(meshRef.current) {
            meshRef.current.rotation.y += delta * 2;
        }
    });

    console.log("comic.frontCoer", comic.frontCover?.slice?.(0, 100));

    return (
        <group 
                position={[0, 0, 2]}
                ref={meshRef}>
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
export default CoverViewer