export interface Song {
  title: string;
  artist: string;
  album: string;
  year: string;
  genre: string;
  popularityScore: number; // 0 to 100
  reason: string; // Why it was recommended
  platformStats?: string; // e.g., "2B+ Streams"
  description?: string; // Longer description for the modal
}

export type Category = 
  | 'All Time Hits'
  | 'Trending Now'
  | 'Party Anthems'
  | '90s Nostalgia'
  | '2000s Hits'
  | 'Classical Masterpieces'
  | 'Film Soundtracks'
  | 'Sad Hours'
  | 'Workout Energy'
  | 'K-Pop Essentials'
  | 'Hip-Hop Legends'
  | 'Rock Classics';

export interface FilterState {
  category: Category | string;
  customQuery?: string;
}