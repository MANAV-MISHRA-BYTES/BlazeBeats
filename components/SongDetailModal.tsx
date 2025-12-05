import React from 'react';
import { Song } from '../types';
import { XMarkIcon, PlayIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/solid';

interface SongDetailModalProps {
  song: Song | null;
  onClose: () => void;
}

const SongDetailModal: React.FC<SongDetailModalProps> = ({ song, onClose }) => {
  if (!song) return null;

  const seed = song.artist.replace(/\s/g, '') + song.title.replace(/\s/g, '');
  const imageUrl = `https://picsum.photos/seed/${seed}/800/800`;
  const youtubeUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(song.title + " " + song.artist)}`;
  const spotifyUrl = `https://open.spotify.com/search/${encodeURIComponent(song.title + " " + song.artist)}`;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative w-full max-w-4xl bg-[#1e0a0a] rounded-3xl overflow-hidden shadow-2xl border border-white/10 flex flex-col md:flex-row max-h-[90vh] md:max-h-[600px] animate-[float_0.3s_ease-out]">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-red-600 rounded-full text-white transition-colors"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>

        {/* Image Side */}
        <div className="w-full md:w-2/5 h-64 md:h-full relative">
          <img src={imageUrl} alt={song.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1e0a0a] via-transparent md:bg-gradient-to-r md:from-transparent md:to-[#1e0a0a]"></div>
        </div>

        {/* Content Side */}
        <div className="flex-1 p-8 md:p-10 overflow-y-auto custom-scrollbar flex flex-col justify-center">
           <div className="mb-6">
             <span className="px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold uppercase tracking-wider border border-orange-500/20">
                {song.genre} • {song.year}
             </span>
             <h2 className="text-4xl md:text-5xl font-black text-white mt-4 mb-2 leading-tight">
               {song.title}
             </h2>
             <p className="text-2xl text-gray-300 font-medium">{song.artist}</p>
             <p className="text-sm text-gray-500 mt-1">{song.album}</p>
           </div>

           <div className="space-y-6">
             <div className="flex items-center gap-4">
               <div className="flex-1">
                 <div className="flex justify-between text-xs uppercase font-bold text-gray-500 mb-1">
                   <span>Popularity</span>
                   <span>{song.popularityScore}/100</span>
                 </div>
                 <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                   <div 
                     className="h-full bg-gradient-to-r from-orange-500 to-red-600"
                     style={{ width: `${song.popularityScore}%` }}
                   ></div>
                 </div>
               </div>
               <div className="bg-white/5 px-4 py-2 rounded-lg border border-white/5">
                  <p className="text-xs text-gray-400 uppercase">Stats</p>
                  <p className="text-sm font-bold text-white whitespace-nowrap">{song.platformStats || "Trending"}</p>
               </div>
             </div>

             <div className="bg-white/5 p-5 rounded-2xl border border-white/5">
                <p className="text-gray-200 leading-relaxed text-lg">
                  {song.description || song.reason}
                </p>
             </div>

             <div className="flex flex-wrap gap-4 pt-4">
                <a 
                  href={youtubeUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1 min-w-[160px] flex items-center justify-center gap-2 bg-[#ff0000] hover:bg-[#cc0000] text-white py-3 px-6 rounded-xl font-bold transition-all transform hover:scale-105 shadow-lg shadow-red-900/20"
                >
                  <PlayIcon className="h-5 w-5" />
                  YouTube
                </a>
                <a 
                  href={spotifyUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1 min-w-[160px] flex items-center justify-center gap-2 bg-[#1DB954] hover:bg-[#169c46] text-white py-3 px-6 rounded-xl font-bold transition-all transform hover:scale-105 shadow-lg shadow-green-900/20"
                >
                  <ArrowTopRightOnSquareIcon className="h-5 w-5" />
                  Spotify
                </a>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default SongDetailModal;