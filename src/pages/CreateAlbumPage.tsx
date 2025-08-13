import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { musicService } from '../services/musicService';

const CreateAlbumPage: React.FC = () => {
  // 1. Usar un estado de formulario más completo
  const [formState, setFormState] = useState({
    title: '',
    artist: '',
    album: '',
    year: new Date().getFullYear(),
  });

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate, isPending, isError, error } = useMutation({ // isPending es el nuevo nombre para isLoading en v5
    mutationFn: musicService.createSong, // 👈 2. Llamar a la función correcta
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['songs'] });
      navigate('/');
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 3. Enviar el objeto con las propiedades correctas
    mutate({
      title: formState.title,
      artist: formState.artist,
      album: formState.album,
      year: Number(formState.year),
    });
  };

  return (
    <div style={{ color: 'white', padding: '20px', maxWidth: '500px', margin: 'auto' }}>
      <h2>Crear Nueva Canción</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input name="title" value={formState.title} onChange={handleChange} placeholder="Título de la canción" required />
        <input name="artist" value={formState.artist} onChange={handleChange} placeholder="Artista" required />
        <input name="album" value={formState.album} onChange={handleChange} placeholder="Nombre del Álbum" required />
        <input name="year" type="number" value={formState.year} onChange={handleChange} placeholder="Año" required />
        
        <button type="submit" disabled={isPending}>
          {isPending ? 'Guardando...' : 'Guardar Canción'}
        </button>
        {isError && <p style={{ color: 'red' }}>Error: {(error as Error).message}</p>}
      </form>
    </div>
  );
};

export default CreateAlbumPage;