
import { SidebarProvider } from "@/components/ui/sidebar"
import DashBoardNavBar from "@/modules/dashboard/ui/components/dashboard-navbar"
import DashBoardSideBar from "@/modules/dashboard/ui/components/dashboard-sidebar"
import React from "react"

interface Porps{
    children : React.ReactNode
}
export default function Layout({children} : Porps){
    return <SidebarProvider defaultOpen>
        <DashBoardSideBar/>
<main className="flex flex-col h-screen w-screen bg-muted">
    <DashBoardNavBar/>
    {children}</main>
    </SidebarProvider>
    
}