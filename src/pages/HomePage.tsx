import React from 'react';
import { useQuery } from '@tanstack/react-query';
import type { Album } from '../data/albums';
import { getAlbums } from '../services/musicService'; // Importar desde el servicio
import AlbumList from '../components/music/AlbumList';

interface HomePageProps {
  onAlbumSelect: (album: Album) => void;
  favorites: string[];
  onToggleFavorite: (albumId: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onAlbumSelect, favorites, onToggleFavorite }) => {
  // Usar useQuery para obtener los álbumes
  const { data: albums, isLoading, isError, error } = useQuery({
    queryKey: ['albums'], // Clave única para esta consulta
    queryFn: getAlbums,  // Función que obtiene los datos del servicio
  });

  // Requisito 3: Mostrar estado de carga/error
  if (isLoading) {
    return <div style={{ color: 'white', textAlign: 'center', padding: '50px' }}>Cargando álbumes...</div>;
  }

  if (isError) {
    return <div style={{ color: 'red', textAlign: 'center', padding: '50px' }}>Error al cargar: {error.message}</div>;
  }

  return (
    <>
      <AlbumList
        title="Lanzamientos Populares"
        albums={albums} // Usar los datos de la query
        onAlbumSelect={onAlbumSelect}
        favorites={favorites}
        onToggleFavorite={onToggleFavorite}
      />
      {/* Puedes seguir mostrando otras listas si el servicio las devuelve o filtrando los resultados */}
    </>
  );
};

export default HomePage;