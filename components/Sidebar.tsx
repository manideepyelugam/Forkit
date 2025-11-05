"use client"
import { useTheme } from "next-themes"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {FileTerminal, Focus} from 'lucide-react'

export default function Sidebar() {
  const { theme, systemTheme } = useTheme()
  const pathname = usePathname() 

//   console.log(pathname)

  const currentTheme = theme === "system" ? systemTheme : theme

  const isActive = (path: string) =>
    pathname === path
      ? `border ${currentTheme === "dark" ? "text-white bg-black" : "text-black bg-white"}`
      : `${currentTheme === "dark" ? "text-white" : "text-black"}`
  

  return (
    <div className={`w-[280px] h-screen border-r ${currentTheme === "dark" ? "bg-[#0f0f0f]" : "bg-[#fafafa]"}`}>

        <div className={`text-3xl font-semibold border-b py-3 px-4 tracking-tighter ${currentTheme === "dark" ? "text-white" : "text-black"}`}>
                Forkit
        </div>
         <div className="flex flex-col p-3 gap-2">
            <p className="text-xs text-gray-500 mt-3 mb-1 tracking-tight">General</p>
              
              <Link href={"/dashboard/top"}><p className={` font-light  rounded-md p-2 text-[13px] ${isActive("/dashboard/top")} ${currentTheme === "dark" ? "hover:bg-[#212121]" : "hover:bg-[#ebebeb]"} flex items-center  pl-3 gap-2`}><FileTerminal strokeWidth={1.25} size={20} /> Top Repositories</p></Link>
              <Link href={'/dashboard/home'}><p className={` font-light  rounded-md p-2 text-[13px] ${isActive("/dashboard/home")} ${currentTheme === "dark" ? "hover:bg-[#212121]" : "hover:bg-[#ebebeb]"}  flex items-center  pl-3 gap-2`}><Focus strokeWidth={1.25} size={20}/>Search Open Source</p></Link>
            
        </div> 
    </div>
  )
}
