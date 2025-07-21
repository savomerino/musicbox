import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { mockAlbums } from '../data/albums';

const DetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const album = mockAlbums.find(a => a.id === id);

  if (!album) {
    return (
      <div>
        <h2>Álbum no encontrado</h2>
        <Link to="/">Volver al inicio</Link>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', color: 'white' }}>
      <Link to="/">← Volver</Link>
      <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
        <img src={album.cover} alt={album.albumName} style={{ width: '200px', height: '200px', marginRight: '20px' }} />
        <div>
          <h1>{album.albumName}</h1>
          <h2>{album.artist}</h2>
          <p>Categoría: {album.category}</p>
          <p>Publicado: {album.publicationDate}</p>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;