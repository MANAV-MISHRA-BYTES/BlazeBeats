import React from 'react';
import { Song } from '../types';
import { PlayCircleIcon } from '@heroicons/react/24/solid';

interface SongCardProps {
  song: Song;
  rank: number;
  onClick: () => void;
}

const SongCard: React.FC<SongCardProps> = ({ song, rank, onClick }) => {
  const seed = song.artist.replace(/\s/g, '') + song.title.replace(/\s/g, '');
  const imageUrl = `https://picsum.photos/seed/${seed}/400/400`;

  return (
    <div 
      onClick={onClick}
      className="group relative bg-[#1a0505]/60 backdrop-blur-md rounded-2xl overflow-hidden border border-white/5 hover:border-orange-500/50 transition-all duration-500 hover:transform hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(249,115,22,0.3)] cursor-pointer"
    >
      {/* Rank Badge */}
      <div className="absolute top-0 left-0 bg-black/50 backdrop-blur-md text-white font-black text-lg w-10 h-10 flex items-center justify-center rounded-br-2xl z-20 border-r border-b border-white/10">
        #{rank}
      </div>

      <div className="flex flex-col h-full">
        {/* Image Section */}
        <div className="relative aspect-square overflow-hidden">
          <img 
            src={imageUrl} 
            alt={`${song.title} cover`} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300"></div>
          
          {/* Play Overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform scale-90 group-hover:scale-100">
             <PlayCircleIcon className="w-16 h-16 text-white drop-shadow-2xl" />
          </div>

          <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black via-black/80 to-transparent pt-12">
            <h3 className="text-xl font-bold text-white truncate drop-shadow-md">{song.title}</h3>
            <p className="text-orange-200 font-semibold truncate text-sm">{song.artist}</p>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-4 flex flex-col flex-grow justify-between border-t border-white/5 bg-white/[0.02]">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-white/10 px-2 py-1 rounded text-gray-300 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                {song.genre}
              </span>
              <span className="text-xs text-gray-500 font-mono">{song.year}</span>
            </div>
            
            <p className="text-xs text-gray-400 mb-3 line-clamp-2 leading-relaxed group-hover:text-gray-300 transition-colors">
              {song.reason}
            </p>
          </div>

          <div className="mt-2">
             <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-orange-500 to-red-600 transition-all duration-1000 ease-out"
                  style={{ width: `${song.popularityScore}%` }}
                ></div>
             </div>
             <div className="flex justify-between mt-1">
               <span className="text-[10px] text-gray-500">Popularity</span>
               <span className="text-[10px] text-orange-400 font-bold">{song.popularityScore}%</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SongCard;