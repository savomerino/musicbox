import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { musicService } from '../services/musicService'; // 👈 1. Importar el servicio

const DetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const { data: song, isLoading, isError } = useQuery({
    queryKey: ['song', id], // La key debe ser única por canción
    queryFn: () => musicService.getSongById(id!), // 👈 2. Llamar a la función correcta
    enabled: !!id,
  });

  if (isLoading) return <div style={{ color: 'white' }}>Cargando...</div>;
  if (isError || !song) {
    return (
      <div style={{ color: 'white' }}>
        <h2>Canción no encontrada</h2>
        <Link to="/">Volver al inicio</Link>
      </div>
    );
  }

  // 👇 3. Renderizar las propiedades correctas del objeto 'song'
  return (
    <div style={{ padding: '20px', color: 'white' }}>
      <Link to="/">← Volver</Link>
      <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
        <img src={song.cover} alt={song.album} style={{ width: '200px', height: '200px', marginRight: '20px' }} />
        <div>
          <h1>{song.title}</h1>
          <h2>{song.artist}</h2>
          <p>Álbum: {song.album}</p>
          <p>Año: {song.year}</p>
          <p>Género: {song.genre.join(', ')}</p>
          <p style={{ marginTop: '10px' }}>{song.description}</p>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;