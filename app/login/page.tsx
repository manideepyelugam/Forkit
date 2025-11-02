"use client";

import { useState } from "react";
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
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler"

import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export const title = "Login Card";

const Example = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter()
  
    async function handleSubmit(e: any) {
      e.preventDefault()
  
      const res = await signIn('credentials', {
        email,
        password,
        redirect: false, 
      })

      console.log(email,password)
  
      if (res?.ok) {
        router.push('/dashboard/home') 
      } else {
        alert('Invalid credentials')
      }
    }

  return (



    <div className="relative h-screen w-full flex items-center justify-center overflow-hidden">
  
  <AnimatedThemeToggler />
      <Card className="relative z-10 w-full max-w-md backdrop-blur-sm bg-background/70 border border-border/50 shadow-xl">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              type="email"
              value={email}
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <a className="text-sm hover:underline" href="#">
                Forgot your password?
              </a>
            </div>
            <Input
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              value={password}
            />
          </div>
          <Button onClick={handleSubmit} className="w-full">Login</Button>
          <Button className="w-full" variant="outline">
            Login with Google
          </Button>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-muted-foreground text-sm">
            Don't have an account?{" "}
            <a className="underline" href="/signup">Sign up</a>
          </p>
        </CardFooter>
      </Card>
  
    </div>
  );
  
  


  
};

export default Example;
