import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { ScrollControls,Scroll } from "@react-three/drei";
import { Leva } from "leva";
import Interface from "./components/Interface";
import { Suspense, useEffect, useState } from "react";
import ScrollManager from "./components/ScrollManager";
import Menu from "./components/Menu";
import { MotionConfig } from "framer-motion";
import { framerMotionConfig } from "./helpers/config";
import {Cursor} from "./components/Cursor";
import LodingScreen from "./components/LodingScreen";
function App() {
  const[section , setSection] = useState(0);
  const [menuOpend,setmenuOpend] = useState(false);
  const [started, setStarted] = useState(false);
  const isMobile = window.innerWidth < 768;

  
  useEffect(()=>{
    setmenuOpend(false)
  },[section]);


  return (
    <>
    <LodingScreen started={started} setStarted={setStarted}/>
    <MotionConfig transition={{
    ...framerMotionConfig,
    }}>
    <Canvas shadows camera={{ position: [0, 3, 10], fov:42}} >
      <color attach="background" args={["#616161"]} />
      

      <ScrollControls pages={4} damping={0.1}>
        <ScrollManager section={section} setSection={setSection}/>
        <Scroll>
          <Suspense>
          {
            started && (
              <Experience section={section} menuOpend={menuOpend}/>
            )
          }
          </Suspense>
        
        </Scroll>
        <Scroll html>
          {started && (<Interface setSection={setSection}/>)}
          
        </Scroll>
      </ScrollControls>
    </Canvas>
    <Menu 
    setSection={setSection} 
    menuOpend={menuOpend} 
    setmenuOpend={setmenuOpend}/>
   {
    !isMobile ? <Cursor/> :<></>
   }
   

    </MotionConfig>
    <Leva hidden/>

    </>

  );
}

export default App;
