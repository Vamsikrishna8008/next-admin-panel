"use client";

import React, { useState } from "react";
import { UserLogin } from "./_component/action";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
// Import your components and action

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const router = useRouter();
  const handleSubmit = async (e: any) => {
    e.preventDefault(); // Prevent default form submission behavior

    const result = await UserLogin({ username, password });
    if (result.success) {
      toast({
        title: "Login Successful",
      });

      router.push("/admin/dashboard");
    } else {
      toast({
        title: "Login Failed",
        description: result.message || "Invalid Credentials",
        variant: "destructive",
      });
    }
  }; // Assuming UserLogin returns an object with a message

  return (
    <>
      <div className="flex flex-col justify-center items-center gap-5 h-screen">
        <h1 className="font-bold text-2xl">Login</h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center items-center gap-5"
        >
          <div className="min-w-[500px] flex flex-col gap-2">
            <Label htmlFor="username">Username</Label>
            <Input
              type="text"
              placeholder="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="min-w-[500px] flex flex-col gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              placeholder="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {message && <p className="text-red-500">{message}</p>}
          <Button type="submit" className="bg-sky-400 rounded-lg">
            Login
          </Button>
        </form>
      </div>
    </>
  );
};

export default Login;
