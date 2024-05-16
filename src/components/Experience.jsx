import {motion} from "framer-motion-3d";
import { Office } from "./Office";
import { Float, MeshDistortMaterial, MeshWobbleMaterial, useScroll } from "@react-three/drei";
import {Avatar} from "./Avatar.jsx"
import { useFrame, useThree } from "@react-three/fiber";
import { animate, useMotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { framerMotionConfig } from "../helpers/config.js";
import Projects from "./Projects.jsx";
import {Background} from "./Background.jsx";

export const Experience = ({ menuOpend }) => {

  const {viewport} = useThree();
  const data = useScroll();

  const isMobile = window.innerWidth < 768;
  const responsivreRatio = viewport.width / 12;
  const officeScaleRatio =  Math.max(0.5,Math.min(0.9 * responsivreRatio,0.9));

  const [section,setSection] = useState(0);
  const cameraPosX = useMotionValue();
  const cameraLookAtX = useMotionValue();

  useEffect(()=>{
    animate(cameraPosX, menuOpend ? -5 : 0,{
      ...framerMotionConfig
    });
    animate(cameraLookAtX, menuOpend ? 5 : 0,{
      ...framerMotionConfig
    });

  },[menuOpend]);

  const charecterContainerAboutRef = useRef();
  const [charecterAnimation, setCharacterAnimation] =useState("Typing");

  useEffect(()=>{
    setCharacterAnimation("Falling");
    setTimeout(()=>{
      setCharacterAnimation(section === 0 ? "Typing" : "Standing")
    },600);
  },[section]);

  const charecterGroup = useRef();


  useFrame((state)=>{

    let curSection = Math.floor(data.scroll.current * data.pages);

    if(curSection > 3){
      curSection = 3;
    }
    if(curSection !== section){
      setSection(curSection);
    }
    state.camera.position.x = cameraPosX.get();
    state.camera.lookAt(cameraLookAtX.get() ,0,0);


    // const position = new THREE.Vector3();
    if(section === 0){
      charecterContainerAboutRef.current.getWorldPosition(charecterGroup.current.position);
    }


    // console.log(position);
    // const quaternion = new THREE.Quaternion();
    // charecterContainerAboutRef.current.getWorldQuaternion(quaternion);
    // const euler = new THREE.Euler();
    // euler.setFromQuaternion(quaternion,"XYZ");
    // console.log([euler.x,euler.y,euler.z]);

  })

  return (
    <>
    <Background/>
      <motion.group
      ref={charecterGroup}
      rotation={[-3.141592653589793, 1.2043981633974483, 3.141592653589793]}
      scale={[officeScaleRatio,officeScaleRatio,officeScaleRatio]}
      animate={"" + section}
      transition={{
        duration:0.6
      }}
      variants={{
        0:{
          scaleX: officeScaleRatio,
          scaleY:officeScaleRatio,
          scaleZ:officeScaleRatio
        },
        1:{
          y: -viewport.height + 0.5,
          x: isMobile?0.3:0,
          z:7,
          rotateX:0,
          rotateY:isMobile ? -Math.PI /2 :0,
          rotateZ:0,
          scaleX: isMobile?1.5:1,
          scaleY:isMobile?1.5:1,
          scaleZ:isMobile?1.5:1
          
        },
        2:{
          x:isMobile?-1.4:-2,
          y: -viewport.height *2 + 0.5,
          z:0,
          rotateX:0,
          rotateY:Math.PI / 4,
          rotateZ:0,
          scaleX: 1,
          scaleY:1,
          scaleZ:1
          
        },
        3:{
          x:0.24,
          y: -viewport.height *3 + 1,
          z:8.5,
          rotateX:0,
          rotateY:-Math.PI / 4,
          rotateZ:0,
          scaleX: 1,
          scaleY:1,
          scaleZ:1
        },

        
      }}
      >
      <Avatar animation = {charecterAnimation} wireframe = {section === 1} />
      </motion.group>
      <ambientLight intensity={section === 0 ? 0.4:1}/>
      <motion.group 
      position={[isMobile ? 0 : 1.5 * officeScaleRatio, 
        isMobile ? -viewport.height/6:2,3]} 
      scale={[officeScaleRatio,officeScaleRatio,officeScaleRatio]} 
      rotation-y={-Math.PI/4}
      animate={{
        y:isMobile ? -viewport.height / 6:0
      }}
      transition={{
        duration:0.8
      }}
      >
        <Office section={section}/>
                <group
                ref={charecterContainerAboutRef} 
                name="CharacterSpot" 
                position={[0.07, 0.16, -0.57]}
                 rotation={[-Math.PI, 0.419, -Math.PI]} >
                </group>

      </motion.group>
  
      
      {/* Skills */}
      <motion.group 
      position={[0,-1.5,-10]}
      animate={{
        z: section === 1 ? 0 :-10,
        y: section === 1 ? -viewport.height :1.5
      }}
      >
      <directionalLight position={[-5,3,5]} intensity={0.3}/>
        <Float>
          <mesh position={[1,-3,-15]} scale={[2,2,2]}>
            <sphereGeometry/>
            <MeshDistortMaterial
              opacity={0.8}
              transparent
              distort={0.4}
              speed={4}
              color={"#d8814b"}
              />
          </mesh>
        </Float>
      
        <Float>
          <mesh scale={[3,3,3]} position={[3,1,-18]}>
            <sphereGeometry/>
            <MeshDistortMaterial
              opacity={0.8}
              transparent
              distort={1}
              speed={5}
              color={"#7575f6"}
              
              metalness={3}
              />
          </mesh>
        </Float>

        <Float>
          <mesh scale={[1.4,1.4,1.4]} position={[-3,-1,-11]}> 
              <boxGeometry/>
              <MeshWobbleMaterial
                            opacity={0.8}
                            transparent
                            factor={1}
                            speed={5}
                            color={"#252222"}
                            wireframe
                            
                            
              />
          </mesh>
        </Float>


      </motion.group>
      <Projects/>

    </>
  );
};
