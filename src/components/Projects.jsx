import { useFrame, useThree } from '@react-three/fiber';
import {motion} from "framer-motion-3d";
import React, { useEffect, useRef } from 'react'
import { Image,Text } from '@react-three/drei';
import {atom, useAtom} from "jotai"
import { animate, useMotionValue } from 'framer-motion';

export const projects = [
    {
        title:"Linkedin Clone",
        url:"https://linked-in-clone-wui1.vercel.app/",
        image:"/Images/Linkedin Clone.png",
        description:"Recomended: join now at 1st then u sign in with google"
    },
    {
        title:"SEAHORSE-SOOTER",
        url:"https://fire-fish-game.vercel.app/",
        image:"Images/GAME-FIRE.png",
        description:"Only for pc . use arrow key for up down and space for fire if you touch the golden fish your super power mode is activate currently"
    },
    {
        title:"Baked Portfolio",
        url:"https://subhamkundu.vercel.app/",
        image:"Images/Portfollio.png",
        description:"Yep this is my website . thanks to visit my site"
    },
    {
        title:"3D-Shirt-Customizer",
        url:"https://snazzy-cranachan-48b356.netlify.app/",
        image:"Images/ShirtCustomizer.png",
        description:""
    },
    {
        title:"COOMING-SOON...",
        url:"",
        image:"https://images.unsplash.com/photo-1714880776087-f8c0430817a6?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description:"wait for upcoming projects......"
    }
];

const Project = ({project,highlighted}) =>{

    const background = useRef();
    const bgOpacity = useMotionValue(0.4);

    useEffect(()=>{
        animate(bgOpacity,highlighted ? 0.7 : 0.4 )
    },[highlighted]);

    useFrame(()=>{
        background.current.material.opacity = bgOpacity.get();
    });

    return (
        <group {...project}>
            <mesh 
            ref={background}
            position-z={-0.001}
            onClick={()=> window.open(project.url, "_blank")}
            
            >
                <planeGeometry args={[2.2,2]}/>
                <meshBasicMaterial color="#4d5d6d" transparent opacity={0.4} />
            </mesh>
            <Image 
            scale={[2,1.2,1]} 
            url={project.image} 
            toneMapped = {false} 
            position-y={0.3}
            />
            <Text 
            maxWidth={2} 
            anchorX={"left"} 
            anchorY={"top"} 
            fontSize={0.2} 
            position={[-1,-0.4,0]}
            >
                {project.title.toUpperCase()}
            </Text>

            <Text 
            maxWidth={2} 
            anchorX={"left"} 
            anchorY={"top"} 
            fontSize={0.1} 
            position={[-1,-0.6,0]}
            >
                {project.description}
            </Text>

        </group>
    )
}

export const currentProjectAtom = atom(Math.floor(projects.length /2));

const Projects = () => {
    
    const {viewport} = useThree();
    const [currentProject] = useAtom(currentProjectAtom);

    return <group position-y={-viewport.height * 2 + 1}>
        {
            projects.map((project,index)=>(
                <motion.group 
                key={"project_" + index }
                position={[index * 2.5 , 0 ,-3]}
                animate={{
                    x:0+(index - currentProject) * 2.5,
                    y:currentProject === index ? 0 : -0.1,
                    z:currentProject === index ? -2 : -3,
                    rotateX:currentProject === index ? 0 : -Math.PI/3,
                    rotateZ: currentProject === index ? 0 : 0.1 * Math.PI,

                }}
                >
                   <Project project={project} highlighted={index === currentProject}/>
                </motion.group> 
            ))
        }
    </group>
 
}

export default Projects
