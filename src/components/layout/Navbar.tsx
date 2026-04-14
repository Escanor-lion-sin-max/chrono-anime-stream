import React, { useState, useEffect } from 'react';
import { Search, Bell, User, Menu, X, ChevronDown, LogOut, Settings, Heart, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User as UserType } from '@/types/anime';

interface NavbarProps {
  user: UserType | null;
  activeView: string;
  onNavigate: (view: any) => void;
  onLogout: () => void;
  appLanguage: string;
  onLanguageChange: (lang: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ user, activeView, onNavigate, onLogout, appLanguage, onLanguageChange }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', view: 'home' },
    { label: 'Anime', view: 'home' },
    { label: 'My List', view: 'watchlist' },
    { label: 'Social', view: 'social' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-colors duration-300 ${isScrolled ? 'bg-black/95' : 'bg-gradient-to-b from-black/80 to-transparent'}`}>
      <div className="max-w-[1440px] mx-auto px-4 md:px-12 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <h1 
            className="text-2xl font-bold text-red-600 cursor-pointer"
            onClick={() => onNavigate('home')}
          >
            HiAnime
          </h1>
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => onNavigate(item.view)}
                className={`text-sm transition-colors hover:text-neutral-300 ${activeView === item.view ? 'text-white font-medium' : 'text-neutral-400'}`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4 md:gap-6">
          <Search className="w-5 h-5 text-white cursor-pointer hover:text-neutral-300" />
          <Bell className="w-5 h-5 text-white cursor-pointer hover:text-neutral-300" />
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center gap-2 cursor-pointer group">
                <Avatar className="w-8 h-8 rounded-md overflow-hidden ring-2 ring-transparent group-hover:ring-neutral-400 transition-all">
                  <AvatarImage src={user?.avatar} />
                  <AvatarFallback className="bg-red-600 text-white text-xs">U</AvatarFallback>
                </Avatar>
                <ChevronDown className="w-4 h-4 text-white hidden md:block" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-black/95 border-neutral-800 text-white w-56">
              <div className="flex items-center gap-3 p-3">
                <Avatar className="w-10 h-10 rounded-md">
                  <AvatarImage src={user?.avatar} />
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{user?.name}</span>
                  <span className="text-xs text-neutral-400">Member</span>
                </div>
              </div>
              <DropdownMenuSeparator className="bg-neutral-800" />
              <DropdownMenuItem onClick={() => onNavigate('social')} className="hover:bg-neutral-800 cursor-pointer">
                <User className="w-4 h-4 mr-2" /> Friends
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onNavigate('watchlist')} className="hover:bg-neutral-800 cursor-pointer">
                <Heart className="w-4 h-4 mr-2" /> My List
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-neutral-800" />
              <DropdownMenuItem className="hover:bg-neutral-800 cursor-pointer">
                <Globe className="w-4 h-4 mr-2" /> 
                <div className="flex flex-col">
                  <span className="text-xs">App Language</span>
                  <span className="text-[10px] text-red-500 font-bold uppercase">{appLanguage}</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-neutral-800" />
              <DropdownMenuItem onClick={onLogout} className="text-red-500 hover:bg-red-500/10 cursor-pointer">
                <LogOut className="w-4 h-4 mr-2" /> Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <button className="md:hidden text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-black/95 border-t border-neutral-800 p-4 absolute w-full left-0 animate-in slide-in-from-top duration-300">
          <div className="flex flex-col gap-4">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  onNavigate(item.view);
                  setIsMobileMenuOpen(false);
                }}
                className={`text-lg transition-colors hover:text-neutral-300 ${activeView === item.view ? 'text-white font-medium' : 'text-neutral-400'}`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};