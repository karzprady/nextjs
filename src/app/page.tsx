"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useState } from "react";
import {authClient} from "@/lib/auth-client"

export default function Home() {
  const [email,setEmail] = useState("")
  const [name,setName] = useState("")
  const [password,setPass] = useState("")
  const {data : session} = authClient.useSession()


  const OnRegister= () =>{
    authClient.signUp.email({
      email, name, password
    },{
      onError : ()=>{
        window.alert("SWR")
      },
      onSuccess : ()=>{
        window.alert("SWR2")
      }
    })
  }

  const OnLogin= () =>{
    authClient.signIn.email({
      email, password
    },{
      onError : ()=>{
        window.alert("SWR")
      },
      onSuccess : ()=>{
        window.alert("SWR2")
      }
    })
  }
if(session) {
  return (
    <div className="flex flex-col p-4 gap-y-4">
      <p>logged in as {session.user.name}</p>
      <Button onClick={()=>authClient.signOut()}>sign out</Button>
    </div>
  )
}
  return (
    <div className="flex flex-col gap-2">
      <Input placeholder="name" value={name} onChange={(e)=>setName(e.target.value)}/>
      <Input placeholder="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
      <Input placeholder="password" type="password" value={password} onChange={(e)=>setPass(e.target.value)}/>

      <Button onClick={OnRegister}>create User</Button>

      
      <Input placeholder="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
      <Input placeholder="password" type="password" value={password} onChange={(e)=>setPass(e.target.value)}/>

      <Button onClick={OnLogin}>login User</Button>


      
    </div>
  );
}
