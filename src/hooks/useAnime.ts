import { useState, useEffect } from 'react';
import { Anime, User, MOCK_ANIME, AVATARS, Friend, Message } from '@/types/anime';
import { toast } from 'sonner';

export function useAnime() {
  const [user, setUser] = useState<User | null>(null);
  const [watchlist, setWatchlist] = useState<Anime[]>([]);
  const [currentAnime, setCurrentAnime] = useState<Anime | null>(null);
  const [view, setView] = useState<'home' | 'details' | 'player' | 'auth' | 'social' | 'watchlist'>('auth');
  const [appLanguage, setAppLanguage] = useState('English');
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    // Initial data load if user logged in
    if (user) {
      const savedWatchlist = localStorage.getItem(`watchlist_${user.id}`);
      if (savedWatchlist) {
        const ids = JSON.parse(savedWatchlist);
        setWatchlist(MOCK_ANIME.filter(a => ids.includes(a.id)));
      }
    }
  }, [user]);

  const login = (userData: Partial<User>) => {
    const newUser: User = {
      id: '1',
      name: userData.name || 'Anime Fan',
      avatar: AVATARS[0],
      friends: [
        { id: '2', name: 'Tanjiro', avatar: AVATARS[1], status: 'online' },
        { id: '3', name: 'Mikasa', avatar: AVATARS[2], status: 'offline' }
      ],
      watchlist: [],
      ...userData
    };
    setUser(newUser);
    setView('home');
    toast.success(`Welcome back, ${newUser.name}!`);
  };

  const logout = () => {
    setUser(null);
    setView('auth');
    toast.info('Logged out successfully');
  };

  const toggleWatchlist = (anime: Anime) => {
    if (!user) {
      toast.error('Please login to add to watchlist');
      return;
    }
    
    setWatchlist(prev => {
      const exists = prev.find(a => a.id === anime.id);
      let newList;
      if (exists) {
        newList = prev.filter(a => a.id !== anime.id);
        toast.info(`Removed ${anime.title} from My List`);
      } else {
        newList = [...prev, anime];
        toast.success(`Added ${anime.title} to My List`);
      }
      localStorage.setItem(`watchlist_${user.id}`, JSON.stringify(newList.map(a => a.id)));
      return newList;
    });
  };

  const playAnime = (anime: Anime) => {
    setCurrentAnime(anime);
    setView('player');
  };

  const openDetails = (anime: Anime) => {
    setCurrentAnime(anime);
    setView('details');
  };

  const sendMessage = (content: string, receiverId: string) => {
    if (!user) return;
    const newMessage: Message = {
      id: Math.random().toString(36).substr(2, 9),
      senderId: user.id,
      receiverId,
      content,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
    toast.success('Message sent!');
  };

  return {
    user,
    watchlist,
    currentAnime,
    view,
    appLanguage,
    messages,
    setView,
    setAppLanguage,
    login,
    logout,
    toggleWatchlist,
    playAnime,
    openDetails,
    sendMessage,
    setUser
  };
}