import Heading from "../components/Heading"
import SubHeading from "../components/SubHeading"
import Button from "../components/Button"
import axios from "axios"
import BottomWarning from "../components/BottomWarning"
import {  useNavigate } from "react-router-dom"
import { useState } from "react"


const Signin = () => {
  const [username,setUserName]=useState("");
  const [password,setPassword]=useState("");
  const navigate=useNavigate();
  return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={"Sign in"} />
        <SubHeading label={"Enter your credentials to access your account"} />
        <div className='text-sm font-medium text-left py-2'>
            Email
        </div>
        <input onChange={e=>{setUserName(e.target.value)}} placeholder="abcd123@gmail.com" value={username} className='w-full px-2 py-1 border rounded border-x-slate-200' />
        <div className='text-sm font-medium text-left py-2'>
            Password
        </div>
        <input onChange={e=>{setPassword(e.target.value)}} placeholder="1234" value={password} className='w-full px-2 py-1 border rounded border-x-slate-200' />
        <div className="pt-4">
          <Button label={"Sign in"} onClick={async ()=>{
            // https://wallet-9zpp.onrender.com/api/v1/user/signin
              const response=await axios.post("https://wallet-yulg.vercel.app/api/v1/user/signin",{
                username,
                password
              });
              localStorage.setItem("token",response.data.token);
              navigate('/dashboard');
          }} />
        </div>
        <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
      </div>
    </div>
  </div>
}

export default Signin