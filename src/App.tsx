import React from 'react';
import { Play } from 'lucide-react';
import { MOCK_ANIME } from '@/types/anime';
import { AnimeRow } from '@/components/home/AnimeRow';
import { Hero } from '@/components/home/Hero';
import { VideoPlayer } from '@/components/player/VideoPlayer';
import { Navbar } from '@/components/layout/Navbar';
import { AuthPage } from '@/components/auth/AuthPage';
import { SocialPanel } from '@/components/social/SocialPanel';
import { useAnime } from '@/hooks/useAnime';
import { Toaster } from 'sonner';

export default function App() {
  const {
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
    sendMessage
  } = useAnime();

  // Categories
  const trending = MOCK_ANIME;
  const newReleases = [...MOCK_ANIME].reverse();
  const actionAnime = MOCK_ANIME.filter(a => a.genres.includes('Action'));
  const fantasyAnime = MOCK_ANIME.filter(a => a.genres.includes('Fantasy') || a.genres.includes('Dark Fantasy'));

  const renderContent = () => {
    switch (view) {
      case 'auth':
        return <AuthPage onLogin={login} />;
      
      case 'home':
        return (
          <main className="bg-black min-h-screen text-white pb-20 overflow-x-hidden">
            <Navbar 
              user={user} 
              activeView={view} 
              onNavigate={setView} 
              onLogout={logout} 
              appLanguage={appLanguage}
              onLanguageChange={setAppLanguage}
            />
            
            <Hero 
              anime={MOCK_ANIME[0]} 
              onPlay={playAnime} 
              onInfo={openDetails} 
              isFavorite={watchlist.some(a => a.id === MOCK_ANIME[0].id)}
              onToggleFavorite={toggleWatchlist}
            />
            
            <div className="relative z-10 -mt-32 md:-mt-48 space-y-8">
              <AnimeRow 
                title="Trending Now" 
                items={trending} 
                onPlay={playAnime} 
                onInfo={openDetails} 
                onToggleFavorite={toggleWatchlist}
                watchlist={watchlist}
              />
              <AnimeRow 
                title="New Releases" 
                items={newReleases} 
                onPlay={playAnime} 
                onInfo={openDetails} 
                onToggleFavorite={toggleWatchlist}
                watchlist={watchlist}
              />
              <AnimeRow 
                title="Action Packed" 
                items={actionAnime} 
                onPlay={playAnime} 
                onInfo={openDetails} 
                onToggleFavorite={toggleWatchlist}
                watchlist={watchlist}
              />
              <AnimeRow 
                title="Fantasy Worlds" 
                items={fantasyAnime} 
                onPlay={playAnime} 
                onInfo={openDetails} 
                onToggleFavorite={toggleWatchlist}
                watchlist={watchlist}
              />
            </div>
          </main>
        );

      case 'watchlist':
        return (
          <main className="bg-black min-h-screen text-white pt-24 px-4 md:px-12">
            <Navbar 
              user={user} 
              activeView={view} 
              onNavigate={setView} 
              onLogout={logout} 
              appLanguage={appLanguage}
              onLanguageChange={setAppLanguage}
            />
            <div className="max-w-[1440px] mx-auto space-y-8">
              <h2 className="text-3xl font-bold">My List</h2>
              {watchlist.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-40 text-neutral-500 space-y-4">
                  <p className="text-xl">Your list is currently empty.</p>
                  <button onClick={() => setView('home')} className="text-red-500 hover:underline">Browse Anime</button>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                  {watchlist.map(anime => (
                    <div key={anime.id} className="group relative aspect-[2/3] overflow-hidden rounded-md">
                      <img src={anime.posterUrl} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                        <h3 className="text-sm font-bold truncate">{anime.title}</h3>
                        <div className="flex items-center gap-2 mt-2">
                          <button onClick={() => playAnime(anime)} className="text-xs bg-white text-black px-2 py-1 rounded font-bold">Play</button>
                          <button onClick={() => toggleWatchlist(anime)} className="text-xs bg-neutral-800 text-white px-2 py-1 rounded font-bold">Remove</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </main>
        );

      case 'social':
        return (
          <main className="bg-black min-h-screen text-white">
            <Navbar 
              user={user} 
              activeView={view} 
              onNavigate={setView} 
              onLogout={logout} 
              appLanguage={appLanguage}
              onLanguageChange={setAppLanguage}
            />
            {user && <SocialPanel user={user} onSendMessage={sendMessage} messages={messages} />}
          </main>
        );

      case 'player':
        return currentAnime ? <VideoPlayer anime={currentAnime} onBack={() => setView('home')} /> : null;

      case 'details':
        // Reuse Home UI but focus on one anime for now as a simple detail view
        return currentAnime ? (
          <main className="bg-black min-h-screen text-white">
            <Navbar 
              user={user} 
              activeView="home" 
              onNavigate={setView} 
              onLogout={logout} 
              appLanguage={appLanguage}
              onLanguageChange={setAppLanguage}
            />
            <Hero 
              anime={currentAnime} 
              onPlay={playAnime} 
              onInfo={() => {}} 
              isFavorite={watchlist.some(a => a.id === currentAnime.id)}
              onToggleFavorite={toggleWatchlist}
            />
            <div className="px-4 md:px-12 py-12 max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="md:col-span-2 space-y-8">
                <div>
                  <h2 className="text-2xl font-bold mb-4">Episodes</h2>
                  <div className="space-y-2">
                    {[1, 2, 3, 4, 5, 6].map(ep => (
                      <div key={ep} className="flex items-center gap-4 p-3 bg-neutral-900/50 hover:bg-neutral-800 rounded-lg cursor-pointer group">
                        <div className="text-neutral-500 font-bold w-6">{ep}</div>
                        <div className="relative w-32 aspect-video rounded overflow-hidden">
                          <img src={currentAnime.bannerUrl} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Play className="w-6 h-6 fill-current" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-sm">The Beginning of Everything</h4>
                          <p className="text-neutral-500 text-xs mt-1">24m</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div>
                  <h3 className="text-neutral-400 text-sm font-bold uppercase mb-2">Cast</h3>
                  <p className="text-white text-sm">Yuki Kaji, Yui Ishikawa, Marina Inoue</p>
                </div>
                <div>
                  <h3 className="text-neutral-400 text-sm font-bold uppercase mb-2">Genres</h3>
                  <p className="text-white text-sm">{currentAnime.genres.join(', ')}</p>
                </div>
                <div>
                  <h3 className="text-neutral-400 text-sm font-bold uppercase mb-2">This Anime is</h3>
                  <p className="text-white text-sm">Exciting, Emotional, Action-packed</p>
                </div>
              </div>
            </div>
          </main>
        ) : null;

      default:
        return null;
    }
  };

  return (
    <>
      <Toaster position="top-center" richColors />
      {renderContent()}
    </>
  );
}