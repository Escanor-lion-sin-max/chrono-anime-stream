import React from 'react';
import { Play, Info, Volume2, VolumeX, Plus, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Anime } from '@/types/anime';
import { motion } from "framer-motion";

interface HeroProps {
  anime: Anime;
  onPlay: (anime: Anime) => void;
  onInfo: (anime: Anime) => void;
  isFavorite: boolean;
  onToggleFavorite: (anime: Anime) => void;
}

export const Hero: React.FC<HeroProps> = ({ anime, onPlay, onInfo, isFavorite, onToggleFavorite }) => {
  const [isMuted, setIsMuted] = React.useState(true);

  return (
    <div className="relative w-full h-[80vh] md:h-screen">
      {/* Background Image/Video */}
      <div className="absolute inset-0">
        <img 
          src={anime.bannerUrl} 
          alt={anime.title} 
          className="w-full h-full object-cover"
        />
        {/* Gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end pb-24 px-4 md:px-12 max-w-[1440px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl space-y-4"
        >
          <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter">
            {anime.title}
          </h1>
          <div className="flex items-center gap-4 text-sm md:text-base font-medium text-white/90">
            <span className="text-green-500">{anime.rating * 10}% Match</span>
            <span>{anime.year}</span>
            <span className="border border-neutral-500 px-1.5 py-0.5 text-xs">HD</span>
            <span className="border border-neutral-500 px-1.5 py-0.5 text-xs">SUB | DUB</span>
          </div>
          <p className="text-neutral-300 text-sm md:text-lg line-clamp-3 md:line-clamp-none font-medium">
            {anime.description}
          </p>
          
          <div className="flex flex-wrap items-center gap-3 pt-4">
            <Button 
              onClick={() => onPlay(anime)}
              className="bg-white text-black hover:bg-neutral-200 px-6 py-6 text-lg font-bold flex items-center gap-2"
            >
              <Play className="w-6 h-6 fill-current" /> Play
            </Button>
            <Button 
              onClick={() => onInfo(anime)}
              className="bg-neutral-500/50 hover:bg-neutral-500/70 text-white px-6 py-6 text-lg font-bold flex items-center gap-2 backdrop-blur-sm"
            >
              <Info className="w-6 h-6" /> More Info
            </Button>
            <Button 
              variant="outline"
              size="icon"
              onClick={() => onToggleFavorite(anime)}
              className="rounded-full w-12 h-12 border-neutral-500 bg-neutral-900/50 hover:bg-neutral-800 text-white"
            >
              {isFavorite ? <Check className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Audio Toggle */}
      <div className="absolute bottom-24 right-4 md:right-12">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={() => setIsMuted(!isMuted)}
          className="rounded-full w-12 h-12 border-neutral-500 bg-neutral-900/50 hover:bg-neutral-800 text-white"
        >
          {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
        </Button>
      </div>
    </div>
  );
};