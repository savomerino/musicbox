import React from 'react';
import { useQuery } from '@tanstack/react-query';
import type { Song } from '../services/db'; // 👈 1. Importar el tipo correcto desde db.ts
import { musicService } from '../services/musicService'; // 👈 2. Importar el servicio
import AlbumList from '../components/music/AlbumList';

interface HomePageProps {
  onAlbumSelect: (album: Song) => void; // 👈 3. Usar el tipo Song
  favorites: string[];
  onToggleFavorite: (albumId: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onAlbumSelect, favorites, onToggleFavorite }) => {
  // Usar el nombre correcto de la función: musicService.getAllSongs
  const { data: songs, isLoading, isError, error } = useQuery({
    queryKey: ['songs'], // Renombramos la queryKey para mayor claridad
    queryFn: musicService.getAllSongs, // 👈 4. Llamar a la función correcta del servicio
  });

  if (isLoading) {
    return <div style={{ color: 'white', textAlign: 'center', padding: '50px' }}>Cargando canciones...</div>;
  }

  if (isError) {
    return <div style={{ color: 'red', textAlign: 'center', padding: '50px' }}>Error al cargar: {error.message}</div>;
  }

  return (
    <>
      <AlbumList
        title="Lanzamientos Populares"
        albums={songs || []} // 👈 5. Pasar los datos de la query (ahora son 'songs')
        onAlbumSelect={onAlbumSelect}
        favorites={favorites}
        onToggleFavorite={onToggleFavorite}
      />
    </>
  );
};

export default HomePage;