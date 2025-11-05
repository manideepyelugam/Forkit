'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Meteors } from "@/components/ui/meteors"


import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";


export default function SignupPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })

  async function handleSubmit(e: any) {
    e.preventDefault()

    const res = await signIn('credentials', {
      ...formData,
      redirect: false,
    })

    if (res?.ok) {
      router.push('/')
    } else {
      alert('Signup failed')
    }
  }

  return (
<div className="flex items-center justify-center min-h-screen">
<Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Sign up to your account</CardTitle>
        <CardDescription>
          Enter your email below to sign up to your account
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">

      <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="John Doe"
            type="text"
            value={formData.name}
          />
        </div>


        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="john.doe@example.com"
            type="email"
            value={formData.email}
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
           
          </div>
          <Input
            id="password"
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            type="password"
            value={formData.password}
          />
        </div>
        <Button className="w-full" onClick={handleSubmit}>Sign up</Button>
        <Button className="w-full" variant="outline">
          Sign up with Google
        </Button>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-muted-foreground text-sm">
          Already have an account?{" "}
          <a className="underline" href="/login">
            Login
          </a>
        </p>
      </CardFooter>
    </Card>
</div>



   



  )
}
