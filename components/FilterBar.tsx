import React from 'react';
import { Category } from '../types';

interface FilterBarProps {
  selected: string;
  onSelect: (category: string) => void;
}

const CATEGORIES: Category[] = [
  'All Time Hits',
  'Trending Now',
  'Party Anthems',
  '90s Nostalgia',
  '2000s Hits',
  'Classical Masterpieces',
  'Film Soundtracks',
  'Sad Hours',
  'Workout Energy'
];

const FilterBar: React.FC<FilterBarProps> = ({ selected, onSelect }) => {
  return (
    <div className="w-full overflow-x-auto pb-4 no-scrollbar">
      <div className="flex space-x-3 px-1">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => onSelect(cat)}
            className={`
              whitespace-nowrap px-6 py-2 rounded-full font-bold text-sm transition-all duration-300 transform
              ${selected === cat 
                ? 'bg-white text-red-600 shadow-[0_0_15px_rgba(255,255,255,0.4)] scale-105' 
                : 'bg-white/10 text-white hover:bg-white/20 border border-white/10'}
            `}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterBar;