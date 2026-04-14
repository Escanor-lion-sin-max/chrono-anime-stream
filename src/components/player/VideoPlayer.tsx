import React, { useState } from 'react';
import { Anime } from '@/types/anime';
import { Play, Download, Settings, Subtitles, Volume2, SkipForward, Maximize, ArrowLeft, MessageSquare, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";

interface VideoPlayerProps {
  anime: Anime;
  onBack: () => void;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ anime, onBack }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(35);
  const [volume, setVolume] = useState(80);
  const [quality, setQuality] = useState('1080p');
  const [subtitle, setSubtitle] = useState('English');
  const [version, setVersion] = useState<'Sub' | 'Dub'>('Sub');

  return (
    <div className="fixed inset-0 bg-black z-[100] flex flex-col">
      {/* Top Bar */}
      <div className="absolute top-0 w-full p-4 flex items-center justify-between z-10 bg-gradient-to-b from-black/80 to-transparent">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onBack} className="text-white hover:bg-white/10">
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <div className="flex flex-col">
            <h2 className="text-white font-bold leading-tight">{anime.title}</h2>
            <span className="text-neutral-400 text-xs">Episode 12 - Final Showdown</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex bg-neutral-800 rounded-md p-1">
            <button 
              onClick={() => setVersion('Sub')}
              className={`px-3 py-1 rounded text-xs font-bold transition-colors ${version === 'Sub' ? 'bg-red-600 text-white' : 'text-neutral-400 hover:text-white'}`}
            >
              SUB
            </button>
            <button 
              onClick={() => setVersion('Dub')}
              className={`px-3 py-1 rounded text-xs font-bold transition-colors ${version === 'Dub' ? 'bg-red-600 text-white' : 'text-neutral-400 hover:text-white'}`}
            >
              DUB
            </button>
          </div>
          <Button variant="outline" size="sm" className="bg-neutral-800 border-neutral-700 text-white gap-2">
            <Download className="w-4 h-4" /> Download
          </Button>
        </div>
      </div>

      {/* Main Video Area (Placeholder) */}
      <div className="flex-1 relative group flex items-center justify-center">
        <img src={anime.bannerUrl} alt="Video Preview" className="w-full h-full object-cover opacity-60" />
        
        <div className="absolute inset-0 flex items-center justify-center">
          {!isPlaying && <Play className="w-20 h-20 text-white opacity-80" />}
        </div>

        {/* Big Middle Controls */}
        <div className="absolute inset-0 flex items-center justify-center gap-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="text-white hover:scale-110 transition-transform"><SkipForward className="w-12 h-12 rotate-180" /></button>
          <button onClick={() => setIsPlaying(!isPlaying)} className="text-white hover:scale-110 transition-transform">
            {isPlaying ? <span className="w-12 h-12 block border-l-4 border-r-4 border-white h-12 w-8 mx-auto" /> : <Play className="w-16 h-16 fill-current" />}
          </button>
          <button className="text-white hover:scale-110 transition-transform"><SkipForward className="w-12 h-12" /></button>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="absolute bottom-0 w-full p-4 space-y-4 bg-gradient-to-t from-black/80 to-transparent z-10">
        <Slider 
          value={[progress]} 
          onValueChange={(val) => setProgress(val[0])} 
          max={100} 
          className="cursor-pointer"
        />
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button onClick={() => setIsPlaying(!isPlaying)} className="text-white">
              {isPlaying ? <span className="block border-l-2 border-r-2 border-white h-5 w-4" /> : <Play className="w-6 h-6 fill-current" />}
            </button>
            <div className="flex items-center gap-2 group w-32">
              <Volume2 className="w-6 h-6 text-white" />
              <Slider value={[volume]} onValueChange={(val) => setVolume(val[0])} max={100} className="w-full" />
            </div>
            <span className="text-white text-sm font-medium">14:20 / 24:00</span>
          </div>

          <div className="flex items-center gap-6">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="text-white flex items-center gap-1 hover:text-red-500 transition-colors">
                  <Subtitles className="w-5 h-5" />
                  <span className="text-xs font-bold uppercase">{subtitle}</span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-black/95 border-neutral-800 text-white">
                <DropdownMenuItem onClick={() => setSubtitle('English')}>English</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSubtitle('Spanish')}>Spanish</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSubtitle('French')}>French</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSubtitle('Off')}>Off</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="text-white flex items-center gap-1 hover:text-red-500 transition-colors">
                  <Settings className="w-5 h-5" />
                  <span className="text-xs font-bold">{quality}</span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-black/95 border-neutral-800 text-white">
                <DropdownMenuItem onClick={() => setQuality('4K')}>4K Ultra HD</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setQuality('1080p')}>1080p Full HD</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setQuality('720p')}>720p HD</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setQuality('480p')}>480p SD</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <button className="text-white hover:text-red-500"><List className="w-5 h-5" /></button>
            <button className="text-white hover:text-red-500"><MessageSquare className="w-5 h-5" /></button>
            <button className="text-white hover:text-red-500"><Maximize className="w-5 h-5" /></button>
          </div>
        </div>
      </div>
    </div>
  );
};