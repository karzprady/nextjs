
"use client"
import { Button } from "@/components/ui/button"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"

export default function HomeView(){
    const {data : session} = authClient.useSession()
   const router = useRouter()
    return <div>
      <div>Logged in as {session?.user.name}</div>
      <Button onClick={()=> authClient.signOut({
        fetchOptions: {
            onSuccess : ()=> {router.push("/sign-in")}
        }
      })}>Signout</Button>
     
  
    </div>
}