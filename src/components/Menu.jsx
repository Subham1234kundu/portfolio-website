

const Menu = ({setSection,menuOpend,setmenuOpend}) => {


  return (
    <>
      <button onClick={()=>setmenuOpend(!menuOpend)}
       className="z-20 fixed top-4 right-4 md:top-12 md:right-12 p-3 bg-indigo-800 w-11 h-11 rounded-md">

        <div className={`bg-white h-0.5 rounded-md w-full transition-all ${
            menuOpend ? "rotate-45 translate-y-0.5" : "" 
        }`
        }/>

        <div className={`bg-white h-0.5 rounded-md w-full my-1 ${
            menuOpend ? "hidden" : "" 
        }`
        }/>

        <div className={`bg-white h-0.5 rounded-md w-full transition-all ${
            menuOpend ? "-rotate-45 " : "" 
        }`
        }/>
      </button>
      <div className={`z-10 fixed top-0 right-0 bottom-0 bg-black transition-all overflow-hidden flex flex-col ${menuOpend ? "w-full md:w-80" : "w-0"}`}>
        <div className= "flex-1 flex items-start justify-center flex-col gap-6 p-8 text-gray-200" >
            <MenuButton  label="About" onClick={()=>setSection(0)}/>
            <MenuButton label="Skills" onClick={()=>setSection(1)}/>
            <MenuButton label="Projects" onClick={()=>setSection(2)}/>
            <MenuButton label="Contact" onClick={()=>setSection(4)}/>
            <a className={"text-2xl underline font-bold cursor-pointer hover:text-gray-500 text-indigo-600 transition-colors"} href="https://drive.google.com/file/d/17Q6-DLqQvr-_pKM3c0YC14-THIQNZcYa/view?usp=sharing ">Resume</a>
        </div>
      </div>
    </>
  )
}

export default Menu;

const MenuButton = ({onClick,label}) =>{
    return (
        <button 
        onClick={onClick} 
        className="text-2xl font-bold cursor-pointer hover:text-indigo-600 transition-colors"
        >
            {label}
        </button>
    )
}
