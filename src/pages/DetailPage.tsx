// src/pages/DetailPage.tsx

import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { mockAlbums } from '../data/albums';

// Definimos las props para manejar favoritos (esto vendrá de App.tsx)
interface DetailPageProps {
  favorites: string[];
  onToggleFavorite: (albumId: string) => void;
}

const DetailPage: React.FC<DetailPageProps> = ({ favorites, onToggleFavorite }) => {
  // 1. Usamos el hook useParams para obtener los parámetros de la URL
  const { id } = useParams<{ id: string }>();

  // 2. Buscamos el álbum en nuestro array de datos usando el ID de la URL
  const album = mockAlbums.find(a => a.id === id);

  // 3. Manejo de caso donde el ID no es válido y no se encuentra el álbum
  if (!album) {
    return (
      <div>
        <h2>Álbum no encontrado</h2>
        <Link to="/">Volver al inicio</Link>
      </div>
    );
  }

  // 4. Lógica para saber si este álbum es favorito
  const isFavorite = favorites.includes(album.id);

  return (
    <div className="detail-page">
      <Link to="/">← Volver a la lista</Link>
      <div className="album-detail-header">
        <img src={album.cover} alt={album.albumName} className="detail-cover" />
        <div className="album-detail-info">
          <h1>{album.albumName}</h1>
          <h2>{album.artist}</h2>
          <p>Fecha de publicación: {album.publicationDate}</p>
          {/* 5. Botón para agregar o quitar de favoritos */}
          <button onClick={() => onToggleFavorite(album.id)} className="favorite-button">
            {isFavorite ? 'Quitar de Favoritos ❤️' : 'Agregar a Favoritos 🤍'}
          </button>
        </div>
      </div>
      {/* Aquí podrías agregar más detalles, como la lista de canciones del álbum */}
    </div>
  );
};

export default DetailPage;