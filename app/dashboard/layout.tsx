'use client'
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({ children } : any) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 ">
        <div>
                <Navbar/>
        </div>
        <div className=" ">
        {children}

        </div>
      </main>
    </div>
  );
}
