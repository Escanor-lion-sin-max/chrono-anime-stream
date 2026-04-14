import React from 'react';
import { Anime } from '@/types/anime';
import { ChevronLeft, ChevronRight, Play, Plus, Check, ThumbsUp, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

interface AnimeRowProps {
  title: string;
  items: Anime[];
  onPlay: (anime: Anime) => void;
  onInfo: (anime: Anime) => void;
  onToggleFavorite: (anime: Anime) => void;
  watchlist: Anime[];
}

export const AnimeRow: React.FC<AnimeRowProps> = ({ title, items, onPlay, onInfo, onToggleFavorite, watchlist }) => {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-2 md:space-y-4 px-4 md:px-12 py-4 group/row">
      <h2 className="text-lg md:text-2xl font-bold text-neutral-200 transition-colors duration-200 group-hover/row:text-white">
        {title}
      </h2>
      
      <div className="relative">
        <button 
          onClick={() => scroll('left')}
          className="absolute left-[-20px] top-0 bottom-0 z-10 bg-black/50 opacity-0 group-hover/row:opacity-100 transition-opacity duration-300 w-12 flex items-center justify-center hover:bg-black/70"
        >
          <ChevronLeft className="w-8 h-8 text-white" />
        </button>

        <div 
          ref={scrollRef}
          className="flex gap-2 overflow-x-auto scrollbar-hide pb-4 snap-x snap-mandatory"
        >
          {items.map((anime) => (
            <AnimeCard 
              key={anime.id} 
              anime={anime} 
              onPlay={onPlay} 
              onInfo={onInfo} 
              onToggleFavorite={onToggleFavorite}
              isFavorite={watchlist.some(a => a.id === anime.id)}
            />
          ))}
        </div>

        <button 
          onClick={() => scroll('right')}
          className="absolute right-[-20px] top-0 bottom-0 z-10 bg-black/50 opacity-0 group-hover/row:opacity-100 transition-opacity duration-300 w-12 flex items-center justify-center hover:bg-black/70"
        >
          <ChevronRight className="w-8 h-8 text-white" />
        </button>
      </div>
    </div>
  );
};

const AnimeCard = ({ anime, onPlay, onInfo, onToggleFavorite, isFavorite }: { 
  anime: Anime, 
  onPlay: (a: Anime) => void, 
  onInfo: (a: Anime) => void,
  onToggleFavorite: (a: Anime) => void,
  isFavorite: boolean
}) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div 
      className="relative min-w-[200px] md:min-w-[280px] h-[300px] md:h-[400px] snap-start"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="relative w-full h-full cursor-pointer overflow-hidden rounded-md transition-all duration-300"
        whileHover={{ scale: 1.05, zIndex: 20 }}
      >
        <img 
          src={anime.posterUrl} 
          alt={anime.title} 
          className="w-full h-full object-cover"
        />
        
        {/* Sub/Dub Badges */}
        <div className="absolute top-2 left-2 flex gap-1">
          {anime.sub && <span className="bg-yellow-500 text-black text-[10px] font-bold px-1 rounded">SUB</span>}
          {anime.dub && <span className="bg-blue-500 text-white text-[10px] font-bold px-1 rounded">DUB</span>}
        </div>

        {/* Hover Content */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 flex flex-col justify-end p-4 gap-3 border-2 border-neutral-700 rounded-md"
            >
              <div className="flex flex-col gap-1">
                <h3 className="text-white font-bold truncate">{anime.title}</h3>
                <div className="flex items-center gap-2 text-[10px] text-white/80">
                  <span className="text-green-500">{anime.rating * 10}% Match</span>
                  <span className="border border-white/50 px-1 rounded">16+</span>
                  <span>{anime.episodes} eps</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button 
                  size="icon" 
                  className="w-8 h-8 rounded-full bg-white text-black hover:bg-neutral-200"
                  onClick={() => onPlay(anime)}
                >
                  <Play className="w-4 h-4 fill-current" />
                </Button>
                <Button 
                  size="icon" 
                  className={`w-8 h-8 rounded-full bg-neutral-800 text-white border-neutral-600 hover:border-white`}
                  onClick={() => onToggleFavorite(anime)}
                >
                  {isFavorite ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </Button>
                <Button 
                  size="icon" 
                  className="w-8 h-8 rounded-full bg-neutral-800 text-white border-neutral-600 hover:border-white"
                >
                  <ThumbsUp className="w-4 h-4" />
                </Button>
                <div className="flex-1" />
                <Button 
                  size="icon" 
                  className="w-8 h-8 rounded-full bg-neutral-800 text-white border-neutral-600 hover:border-white"
                  onClick={() => onInfo(anime)}
                >
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex flex-wrap gap-1">
                {anime.genres.slice(0, 3).map(g => (
                  <span key={g} className="text-[10px] text-neutral-400">• {g}</span>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};