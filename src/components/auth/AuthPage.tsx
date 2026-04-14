import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, Phone, LogIn, Github } from "lucide-react";
import { motion } from "framer-motion";

interface AuthPageProps {
  onLogin: (data: any) => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({ onLogin }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      onLogin({ name: 'Guest' });
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
      {/* Background with semi-transparent anime image */}
      <div 
        className="absolute inset-0 opacity-20 bg-cover bg-center"
        style={{ backgroundImage: 'url("https://storage.googleapis.com/dala-prod-public-storage/generated-images/3a0f6b12-7c8e-45df-a6d3-8b7780736472/hero-banner-33b297ef-1776172491941.webp")' }}
      />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md px-4"
      >
        <Card className="bg-black/80 border-neutral-800 text-white backdrop-blur-md">
          <CardHeader className="text-center space-y-1">
            <CardTitle className="text-3xl font-bold text-red-600">HiAnime</CardTitle>
            <CardDescription className="text-neutral-400">
              Unlimited anime, movies, and more.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="email" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-neutral-900 border-neutral-800">
                <TabsTrigger value="email" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">Email</TabsTrigger>
                <TabsTrigger value="phone" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">Phone</TabsTrigger>
                <TabsTrigger value="social" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">Social</TabsTrigger>
              </TabsList>
              
              <TabsContent value="email" className="space-y-4 pt-4">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="name@example.com" className="bg-neutral-900 border-neutral-800 text-white" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" className="bg-neutral-900 border-neutral-800 text-white" />
                  </div>
                  <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white" disabled={isLoading}>
                    {isLoading ? "Signing in..." : "Sign In"}
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="phone" className="space-y-4 pt-4">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" className="bg-neutral-900 border-neutral-800 text-white" />
                  </div>
                  <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white" disabled={isLoading}>
                    Send OTP
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="social" className="space-y-4 pt-4">
                <Button variant="outline" className="w-full border-neutral-800 bg-neutral-900 hover:bg-neutral-800 text-white flex items-center justify-center gap-2" onClick={handleSubmit}>
                  <Github className="w-5 h-5" /> Continue with Google
                </Button>
                <Button variant="outline" className="w-full border-neutral-800 bg-neutral-900 hover:bg-neutral-800 text-white flex items-center justify-center gap-2" onClick={handleSubmit}>
                  <LogIn className="w-5 h-5" /> Continue with Apple
                </Button>
              </TabsContent>
            </Tabs>
            
            <div className="mt-6 text-center text-sm text-neutral-400">
              New to HiAnime? <a href="#" className="text-white hover:underline">Sign up now.</a>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};