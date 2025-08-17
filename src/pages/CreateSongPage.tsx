import React from 'react';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { musicService } from '../services/musicService';
import type { Song } from '../services/db';

const CreateSongPage: React.FC = () => {
  const queryClient = useQueryClient();

  const { data: currentSongs } = useQuery<Song[]>({ queryKey: ['songs'] });

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: musicService.createSong,
    onMutate: async (newSongData: Partial<Song>) => {
      await queryClient.cancelQueries({ queryKey: ['songs'] });

      const previousSongs = queryClient.getQueryData<Song[]>(['songs']);

      queryClient.setQueryData<Song[]>(['songs'], (old = []) => [
        ...old,
        {
          id: Date.now(), 
          ...newSongData,
          genre: [],
          duration: 0,
          rating: 0,
          cover: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=400',
          description: 'Nueva canción recién creada.',
        } as Song,
      ]);

      return { previousSongs };
    },
    onError: (err, newSong, context) => {
      if (context?.previousSongs) {
        queryClient.setQueryData(['songs'], context.previousSongs);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['songs'] });
    },
  });
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newSong: Partial<Song> = {
      title: formData.get('title') as string,
      artist: formData.get('artist') as string,
      album: formData.get('album') as string,
      year: Number(formData.get('year')),
    };
    mutate(newSong);
    e.currentTarget.reset();
  };

  return (
    <div style={{ color: 'white', padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h2>Crear Nueva Canción</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input name="title" placeholder="Título de la canción" required style={inputStyle} />
        <input name="artist" placeholder="Artista" required style={inputStyle} />
        <input name="album" placeholder="Nombre del Álbum" required style={inputStyle} />
        <input name="year" type="number" defaultValue={new Date().getFullYear()} required style={inputStyle} />
        
        <button type="submit" disabled={isPending} style={buttonStyle}>
          {isPending ? 'Guardando...' : 'Guardar Canción'}
        </button>
        {isError && <p style={{ color: 'red' }}>Error: {(error as Error).message}</p>}
      </form>

      <div style={{marginTop: '30px'}}>
        <h3>Lista de Canciones (con actualización optimista)</h3>
        {currentSongs?.map(song => (
          <div key={song.id} style={{padding: '5px 0', borderBottom: '1px solid #333'}}>
            {song.title} - <span style={{color: '#aaa'}}>{song.artist}</span>
          </div>
        ))}
        {isPending && <div style={{padding: '5px 0', borderBottom: '1px solid #333', opacity: 0.6}}>...Añadiendo nueva canción</div>}
      </div>
    </div>
  );
};

const inputStyle: React.CSSProperties = {
  padding: '10px',
  borderRadius: '5px',
  border: '1px solid #555',
  backgroundColor: '#333',
  color: 'white',
  fontSize: '16px'
};

const buttonStyle: React.CSSProperties = {
  padding: '10px',
  borderRadius: '5px',
  border: 'none',
  backgroundColor: '#1db954',
  color: 'white',
  fontSize: '16px',
  cursor: 'pointer'
};

export default CreateSongPage;