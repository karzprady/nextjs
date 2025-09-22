import { Card } from "@/components/ui/card";
import { auth } from "@/lib/auth";
import SignOutView from "@/modules/auth/ui/views/sign-out-view";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page(){
    const session = await auth.api.getSession({
        headers : await headers()
      })
      if(!!session){
        redirect("/")
      }
    return <SignOutView/>
}