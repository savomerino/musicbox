import React, { useState, useDeferredValue } from 'react';
import { useQuery } from '@tanstack/react-query';
import type { Song } from '../services/db';
import { musicService } from '../services/musicService';
import SongList from '../components/music/SongList';
import SearchBar from '../components/SearchBar';

interface HomePageProps {
  onSongSelect: (song: Song) => void;
  favorites: string[];
  onToggleFavorite: (songId: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onSongSelect, favorites, onToggleFavorite }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const deferredSearchTerm = useDeferredValue(searchTerm);

  const { data: songs, isLoading, isError, error } = useQuery({
    queryKey: ['songs'],
    queryFn: musicService.getAllSongs,
  });

  const filteredSongs = songs?.filter(song =>
    song.title.toLowerCase().includes(deferredSearchTerm.toLowerCase()) ||
    song.artist.toLowerCase().includes(deferredSearchTerm.toLowerCase())
  );

  if (isLoading) {
    return <div style={{ color: 'white', textAlign: 'center', padding: '50px' }}>Cargando canciones...</div>;
  }

  if (isError) {
    return <div style={{ color: 'red', textAlign: 'center', padding: '50px' }}>Error al cargar: {error.message}</div>;
  }

  return (
    <>
      <div style={{ padding: '1rem 1.5rem' }}>
        <SearchBar onSearch={setSearchTerm} />
      </div>
      <SongList
        title="Lanzamientos Populares"
        songs={filteredSongs || []}
        onSongSelect={onSongSelect}
        favorites={favorites}
        onToggleFavorite={onToggleFavorite}
      />
    </>
  );
};

export default HomePage;