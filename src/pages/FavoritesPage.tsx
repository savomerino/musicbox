import React from 'react';
import { useQuery } from '@tanstack/react-query';
import type { Song } from '../services/db';
import { musicService } from '../services/musicService';
import SongList from '../components/music/SongList';

interface FavoritesPageProps {
  onSongSelect: (song: Song) => void;
  favorites: string[];
  onToggleFavorite: (songId: string) => void;
}

const FavoritesPage: React.FC<FavoritesPageProps> = ({ onSongSelect, favorites, onToggleFavorite }) => {
  // 1. Obtener TODAS las canciones desde el servicio
  const { data: allSongs, isLoading, isError } = useQuery({
    queryKey: ['songs'], // Usamos la misma key, React Query devolverá los datos cacheados
    queryFn: musicService.getAllSongs,
  });

  // 2. Filtrar las canciones para mostrar solo los favoritos
  const favoriteSongs = allSongs?.filter(song => favorites.includes(String(song.id))) || [];

  if (isLoading) {
    return <div style={{ color: 'white', textAlign: 'center', padding: '50px' }}>Cargando favoritos...</div>;
  }
  
  if (isError) {
    return <div style={{ color: 'red', textAlign: 'center', padding: '50px' }}>Error al cargar los datos.</div>;
  }

  return (
    <>
      {favoriteSongs.length > 0 ? (
        <SongList 
          title="Tus Favoritos" 
          songs={favoriteSongs} 
          onSongSelect={onSongSelect} 
          favorites={favorites} 
          onToggleFavorite={onToggleFavorite} 
        />
      ) : (
        <div style={{ color: 'white', textAlign: 'center', paddingTop: '50px' }}>
          <h2>Aún no tienes favoritos</h2>
          <p>Haz clic en el corazón 🤍 en cualquier canción para guardarla aquí.</p>
        </div>
      )}
    </>
  );
};

export default FavoritesPage;