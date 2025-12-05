import React from 'react';
import { Category } from '../types';
import { FireIcon, MusicalNoteIcon, StarIcon, FilmIcon, ClockIcon, HeartIcon } from '@heroicons/react/24/outline';

interface SidebarProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  onSearchArtist: (artist: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const CATEGORIES: { name: Category; icon: any }[] = [
  { name: 'All Time Hits', icon: FireIcon },
  { name: 'Trending Now', icon: StarIcon },
  { name: 'Party Anthems', icon: MusicalNoteIcon },
  { name: '90s Nostalgia', icon: ClockIcon },
  { name: '2000s Hits', icon: ClockIcon },
  { name: 'Film Soundtracks', icon: FilmIcon },
  { name: 'Sad Hours', icon: HeartIcon },
  { name: 'Workout Energy', icon: FireIcon },
  { name: 'Rock Classics', icon: MusicalNoteIcon },
];

const TOP_ARTISTS = [
  'The Weeknd', 'Taylor Swift', 'Drake', 'Bad Bunny', 
  'Eminem', 'BTS', 'Beyoncé', 'Coldplay', 'Ariana Grande'
];

const Sidebar: React.FC<SidebarProps> = ({ selectedCategory, onSelectCategory, onSearchArtist, isOpen, onClose }) => {
  return (
    <>
      {/* Mobile Overlay */}
      <div 
        className={`fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Sidebar Content */}
      <aside 
        className={`
          fixed lg:static inset-y-0 left-0 z-50 w-72 bg-[#1a0505]/95 backdrop-blur-xl border-r border-white/10 
          transform transition-transform duration-300 ease-in-out flex flex-col h-full overflow-hidden
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="p-6 flex items-center gap-3 border-b border-white/5">
          <div className="bg-gradient-to-tr from-orange-500 to-red-600 p-2 rounded-lg shadow-lg shadow-orange-500/20">
            <MusicalNoteIcon className="h-6 w-6 text-white" />
          </div>
          <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-orange-200">
            BlazeBeats
          </span>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-8 no-scrollbar">
          {/* Categories */}
          <div>
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 px-2">Discover</h3>
            <div className="space-y-1">
              {CATEGORIES.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    onSelectCategory(item.name);
                    if (window.innerWidth < 1024) onClose();
                  }}
                  className={`
                    w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-bold transition-all duration-200
                    ${selectedCategory === item.name 
                      ? 'bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-lg shadow-orange-900/50' 
                      : 'text-gray-400 hover:text-white hover:bg-white/5'}
                  `}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </button>
              ))}
            </div>
          </div>

          {/* Top Artists */}
          <div>
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 px-2">Top Artists</h3>
            <div className="space-y-1">
              {TOP_ARTISTS.map((artist) => (
                <button
                  key={artist}
                  onClick={() => {
                    onSearchArtist(artist);
                    if (window.innerWidth < 1024) onClose();
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-colors group"
                >
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs overflow-hidden group-hover:ring-2 ring-orange-500 transition-all">
                    {artist.substring(0, 2).toUpperCase()}
                  </div>
                  {artist}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        <div className="p-4 border-t border-white/5">
          <div className="bg-gradient-to-r from-gray-900 to-black p-4 rounded-xl border border-white/5">
             <p className="text-xs text-gray-400 text-center">Powered by Gemini AI</p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;