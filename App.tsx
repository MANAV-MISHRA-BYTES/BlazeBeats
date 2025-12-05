import React, { useState, useEffect, useCallback } from 'react';
import { Song } from './types';
import { getSongRecommendations } from './services/geminiService';
import AnimatedBackground from './components/AnimatedBackground';
import SongCard from './components/SongCard';
import Sidebar from './components/Sidebar';
import SongDetailModal from './components/SongDetailModal';
import { MagnifyingGlassIcon, SparklesIcon, Bars3Icon, PlusCircleIcon } from '@heroicons/react/24/solid';

const App: React.FC = () => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [currentCategory, setCurrentCategory] = useState<string>('All Time Hits');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);

  // Generate prompt based on category/query
  const getPrompt = useCallback((category: string, isSearch: boolean, query: string) => {
    if (isSearch) return `Songs related to: ${query}. Prioritize popular hits.`;
    if (category === 'All Time Hits') return 'Most streamed songs of all time on Spotify and YouTube';
    if (category === 'Trending Now') return 'Current viral hits this month on Spotify, TikTok and YouTube';
    if (category === 'Film Soundtracks') return 'Iconic movie soundtracks and film scores';
    if (category === 'Sad Hours') return 'Heartbreaking emotional songs, ballads and slow jams';
    if (category === 'Workout Energy') return 'High bpm motivation songs for gym and running';
    return category;
  }, []);

  // Fetch songs
  const fetchSongs = useCallback(async (prompt: string, reset: boolean = true) => {
    if (reset) {
      setLoading(true);
      setSongs([]);
    } else {
      setLoadingMore(true);
    }

    // If loading more, pass current titles to exclude
    const currentTitles = reset ? [] : songs.map(s => s.title);
    
    const result = await getSongRecommendations(prompt, currentTitles);
    
    if (reset) {
      setSongs(result);
      setLoading(false);
    } else {
      setSongs(prev => [...prev, ...result]);
      setLoadingMore(false);
    }
  }, [songs]);

  // Initial load
  useEffect(() => {
    fetchSongs('Most streamed songs of all time on Spotify and YouTube');
  }, []);

  const handleCategorySelect = (category: string) => {
    setCurrentCategory(category);
    setSearchQuery('');
    setIsSearching(false);
    fetchSongs(getPrompt(category, false, ''));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleArtistSearch = (artist: string) => {
    setCurrentCategory(artist);
    setSearchQuery('');
    setIsSearching(true);
    fetchSongs(`Best and most popular songs by ${artist}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    setCurrentCategory(`Results: ${searchQuery}`);
    fetchSongs(getPrompt('', true, searchQuery));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoadMore = () => {
    const prompt = isSearching 
      ? getPrompt('', true, searchQuery || currentCategory)
      : getPrompt(currentCategory, false, '');
    
    fetchSongs(prompt, false);
  };

  return (
    <div className="relative min-h-screen text-white flex selection:bg-orange-500 selection:text-white overflow-hidden bg-[#1a0505]">
      <AnimatedBackground />

      <Sidebar 
        selectedCategory={currentCategory}
        onSelectCategory={handleCategorySelect}
        onSearchArtist={handleArtistSearch}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div className="flex-1 h-screen overflow-y-auto w-full relative z-10 custom-scrollbar">
        <div className="container mx-auto px-4 py-6 md:p-8 max-w-7xl">
          
          {/* Mobile Header / Top Bar */}
          <header className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 sticky top-0 md:relative z-30 bg-[#1a0505]/80 md:bg-transparent backdrop-blur-md p-4 md:p-0 -mx-4 md:mx-0 rounded-b-2xl md:rounded-none border-b border-white/5 md:border-none">
            <div className="flex items-center justify-between w-full md:w-auto">
               <button 
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden p-2 text-white hover:bg-white/10 rounded-lg"
               >
                 <Bars3Icon className="h-6 w-6" />
               </button>
               
               {/* Mobile Title (hidden on desktop) */}
               <span className="lg:hidden font-black text-xl text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
                 BlazeBeats
               </span>

               <div className="w-8 lg:hidden"></div> {/* Spacer */}
            </div>

            <form onSubmit={handleSearch} className="w-full md:w-auto relative group">
               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                 <MagnifyingGlassIcon className="h-5 w-5 text-gray-500 group-focus-within:text-orange-500 transition-colors" />
               </div>
               <input
                 type="text"
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
                 placeholder="Search song, artist, mood..."
                 className="block w-full md:w-96 pl-10 pr-4 py-3 border border-white/10 rounded-full leading-5 bg-black/20 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-black/40 transition-all duration-300 backdrop-blur-xl shadow-lg"
               />
            </form>
          </header>

          {/* Hero / Status */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-2">
              {loading ? (
                 <SparklesIcon className="h-6 w-6 text-orange-400 animate-spin" />
              ) : (
                 <SparklesIcon className="h-6 w-6 text-orange-400" />
              )}
              <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white drop-shadow-lg">
                {currentCategory}
              </h1>
            </div>
            <p className="text-gray-400 text-sm md:text-base max-w-2xl">
              Curated AI recommendations based on streaming data and cultural impact.
            </p>
          </div>

          {/* Content Grid */}
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
               {Array.from({ length: 8 }).map((_, i) => (
                 <div key={i} className="bg-white/5 rounded-2xl h-80 animate-pulse border border-white/5">
                   <div className="h-full w-full bg-gradient-to-t from-black/50 to-transparent"></div>
                 </div>
               ))}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {songs.map((song, index) => (
                  <SongCard 
                    key={`${song.title}-${index}`} 
                    song={song} 
                    rank={index + 1} 
                    onClick={() => setSelectedSong(song)}
                  />
                ))}
              </div>

              {songs.length > 0 && (
                <div className="mt-12 flex justify-center pb-12">
                  <button
                    onClick={handleLoadMore}
                    disabled={loadingMore}
                    className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-full font-bold transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed border border-white/10 backdrop-blur-sm"
                  >
                    {loadingMore ? (
                      <span className="animate-pulse">Loading beats...</span>
                    ) : (
                      <>
                        <PlusCircleIcon className="h-5 w-5" />
                        Load More Songs
                      </>
                    )}
                  </button>
                </div>
              )}

              {songs.length === 0 && !loading && (
                <div className="flex flex-col items-center justify-center py-32 bg-white/5 rounded-3xl border border-white/5 border-dashed">
                  <p className="text-2xl font-bold text-gray-500">No beats found.</p>
                  <p className="text-gray-600 mt-2">Try searching for a different artist or genre.</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <SongDetailModal 
        song={selectedSong} 
        onClose={() => setSelectedSong(null)} 
      />
    </div>
  );
};

export default App;