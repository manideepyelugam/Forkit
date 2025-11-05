import React from 'react'
import { AnimatedThemeToggler } from './ui/animated-theme-toggler'
import { useSession } from 'next-auth/react';

const Navbar = () => {
    const session = useSession();
   

  return (
    <div className='w-full h-[61px] flex items-center justify-end border-b pr-5 gap-5'>
                        <p className='text-sm px-3  py-1 rounded-md border'>{session.data?.user?.email}</p>

                <AnimatedThemeToggler className='p-1 border rounded-md '/>
    </div>
  )
}

export default Navbar