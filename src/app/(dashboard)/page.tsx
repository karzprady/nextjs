

import { auth } from "@/lib/auth"
import { authClient } from "@/lib/auth-client"
import HomeView from "@/modules/home/ui/views/home-view"

import { headers } from "next/headers"
import { redirect } from "next/navigation"
import {caller} from "@/trpc/server"
export default async function Home() {

  const data = await caller.hello({text : "server hoi"})
  const session = await auth.api.getSession({
    headers : await headers()
  })
  if(!session){
    redirect("/sign-in")
  }
  return <p>{data?.greeting}</p>
  return <HomeView/>
}