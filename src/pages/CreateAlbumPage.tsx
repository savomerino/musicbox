import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { createAlbum } from '../services/musicService';

const CreateAlbumPage: React.FC = () => {
  const [albumName, setAlbumName] = useState('');
  const [artist, setArtist] = useState('');
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate, isLoading, isError, error } = useMutation({
    mutationFn: createAlbum,
    onSuccess: () => {
      // Invalida la caché de 'albums' para que la lista se actualice
      queryClient.invalidateQueries({ queryKey: ['albums'] });
      navigate('/'); // Redirige al inicio tras el éxito
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({ albumName, artist, id: Date.now().toString() /* otros campos necesarios */ });
  };

  return (
    <div style={{ color: 'white', padding: '20px' }}>
      <h2>Crear Nuevo Álbum</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={albumName}
          onChange={(e) => setAlbumName(e.target.value)}
          placeholder="Nombre del Álbum"
          required
        />
        <input
          type="text"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
          placeholder="Artista"
          required
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Guardando...' : 'Guardar Álbum'}
        </button>
        {isError && <p style={{ color: 'red' }}>Error: {(error as Error).message}</p>}
      </form>
    </div>
  );
};

export default CreateAlbumPage;