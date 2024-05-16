import { useState } from "react"
import emailjs from '@emailjs/browser';
import { FaHandshake } from "react-icons/fa6";

const EmailFrom = () => {
    const [name , setName ] = useState("");
    const[email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [succeeded, setSucceeded] = useState(false);
    const [validError,setValidError] = useState("can't send an empty message");

    const handleButtonClick = () => {
        // Check if name and email are not empty when the button is clicked
        if (!name.trim() ) {
            setValidError("name cannot be empty");
        }
        if(!email.trim()){
            setValidError("email cannot be empty")
        }
        if (!name.trim() && !email.trim()) {
            setValidError("Name and email cannot be empty");
        }
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        const serviceId = "service_k022lp7";
        const templatedId = "template_8olegfd";
        const publicKey = "ZrTUVGFr5ZXNKD_7P"

        const templateParams = {
            from_name:name,
            from_email:email,
            to_name: "Subham Kundu",
            message:message,

        }

        //send email useing email js
        if (name.trim() && email.trim()) {
            emailjs.send(serviceId,templatedId,templateParams,publicKey)
        .then((responce)=>{
            console.log("email send sucessfully" , responce);
            setName("");
            setEmail("");
            setMessage("");
            setSucceeded(true);
            
        })
        .catch((error)=>{
            console.log("Error sending email" , error);
        })

        }
        
    }


  return (
    <>
              <h1  className="text-3xl md:text-5xl text-gray-400 font-bold">Contract me</h1>
        <div className="mt-8 p-8 rounded-md bg-gray-700 w-96 max-w-full bg-opacity-50">

        {
            succeeded ?<div className="flex gap-4"><img src="/Images/my_logo.png" className="w-10" alt="" /><p className="text-gray-200 font-bold text-xl">Thanks for your message<FaHandshake className="text-4xl"/></p> </div>:(
                <form onSubmit={handleSubmit}>


                <label htmlFor="name" className="font-medium text-gray-200 block mb-1 "> Name</label>
                <input type="text"  
                        name="name" 
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="block w-full rounded-md border-0 text-white shadow-sm placeholder:text-white bg-slate-600 focus:outline-none pl-3 pt-1 pb-1 pr-3"
                         />
    
    
                <label  htmlFor="email" className="font-medium text-gray-200 block mb-1 ">Email</label>
                <input type="email"
                        name="email" 
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="block w-full rounded-md border-0 text-white shadow-sm bg-slate-600 placeholder:text-white
                        focus:outline-none pl-3 pt-1 pb-1 pr-3"
                         />
    
    
                 <label  htmlFor="message" className="font-medium text-gray-200 block mb-1 ">Message</label>
                 <textarea name="message" 
                            id="message"
                            value={message}
                            onChange={(e)=>setMessage(e.target.value)}
                            className="h-32 block w-full rounded-md border-0 text-white shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 bg-slate-600
                            focus:outline-none pl-3 pt-1 pb-1 pr-3 "
                            >

                 </textarea>
                 <p className="text-red-500 mt-1"> {validError} </p>
                    
                <button 
                type="submit" 
                onClick={handleButtonClick}
                className="bg-indigo-700 text-white py-4 px-8 rounded-lg font-bold text-lg mt-16"
                >Submit</button>
            </form>
            )
        }

        </div>
    </>
  )
}

export default EmailFrom
