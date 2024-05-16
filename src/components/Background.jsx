import { Sphere, useScroll } from "@react-three/drei"
import { useEffect, useRef } from "react";
import * as THREE from 'three';
import {gsap} from "gsap"
import { useFrame } from "@react-three/fiber";

export const Background = () => {
    const material = useRef();
    const color = useRef({
        color:"#212121"
    });
    const data = useScroll();
    const tl = useRef();

    useFrame(()=>{
        tl.current.progress(data.scroll.current);
        material.current.color = new THREE.Color(color.current.color)
    })

    
    useEffect(()=>{
        tl.current = gsap.timeline();
        tl.current.to(color.current,{
            color:"#d9d9d9"
        });
        tl.current.to(color.current,{
            color:"#212121"
        });
        tl.current.to(color.current,{
            color:"#101010"
        });
    },[])
  return (
    <group>
        <Sphere scale={[30,30,30]}>
            <meshBasicMaterial ref={material} side={THREE.BackSide} toneMapped={false}/>
        </Sphere>
    </group>
  )
}

