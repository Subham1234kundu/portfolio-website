import {useProgress} from "@react-three/drei"
import { useEffect } from "react";

const LodingScreen = ({started,setStarted}) => {
    const {progress, total, loaded, item} = useProgress();

    useEffect(()=>{
        if(progress === 100){
            setTimeout(()=>{
              setStarted(true);
            },500);
        }
    },[progress, total, loaded, item])
  return (
    <div className={`fixed top-0 left-0 w-full h-full z-50 transition-opacity pointer-events-none flex items-center justify-center bg-gray-500
    ${started ? "opacity-0" :"opacity-100"}
    `
    }>

      <div className="text-4xl  font-bold text-gray-800 relative">
            <div className="absolute left-0 top-0 overflow-hidden truncate text-clip transition-all duration-500 border-4  p-5 border-x-transparent " style={{width: `${progress}%`}}>
                Loding...
            </div>
            <div className=" opacity-40 border-4 p-5  ">Loding...</div>
      </div>
    </div>
  )
}

export default LodingScreen
