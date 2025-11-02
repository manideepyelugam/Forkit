"use client"

import React from 'react'
import { useSession } from 'next-auth/react'
import {signOut} from 'next-auth/react'
import LoginPage from './login/page'
import { useRouter } from 'next/navigation'

export default function Home() {
  const session = useSession();
  const data = JSON.stringify(session)
  const router = useRouter();

  const signIn = () => {
    router.push('/login');
  }

  return (
    <div>
      <h1>ForkIt</h1>
      <button onClick={() => signOut()}>Sign Out</button>
      <button onClick={() => signIn()}>Sign In</button>
      <p>
          {data}
      </p>

    </div>
  )
}   