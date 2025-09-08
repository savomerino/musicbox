// pasado a typescript

import { musicDB, getNextId, type Song } from './db';

// Una función de ayuda para simular la demora de la red
const delay = (ms = 500): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

// El tipo para los datos de una nueva canción. Usamos `Omit` para excluir el `id`,
// ya que será generado por el servicio.
type NewSongData = Omit<Song, 'id'>;

// Mock API service con tipos para cada método
export const musicService = {
  // GET all songs -> Devuelve una promesa que resuelve en un array de canciones
  async getAllSongs(): Promise<Song[]> {
    await delay(300);
    const stored = localStorage.getItem('musicDB');
    if (stored) {
      return JSON.parse(stored) as Song[];
    }
    return [...musicDB];
  },

  // GET song by ID -> Acepta un ID (string) y devuelve una promesa con una canción
  async getSongById(id: string): Promise<Song> {
    await delay(200);
    const stored = localStorage.getItem('musicDB');
    const songs: Song[] = stored ? JSON.parse(stored) : musicDB;
    
    // Convertimos el ID de string a número para la búsqueda
    const song = songs.find((s) => s.id === parseInt(id, 10));
    
    if (!song) {
      throw new Error('Song not found');
    }
    return song;
  },

  // POST - Create new song -> Acepta los datos de la nueva canción y devuelve la canción creada
  async createSong(songData: Partial<NewSongData>): Promise<Song> {
    await delay(400);
    const stored = localStorage.getItem('musicDB');
    const songs: Song[] = stored ? JSON.parse(stored) : [...musicDB];

    const newSong: Song = {
      id: getNextId(),
      title: songData.title || 'Untitled',
      artist: songData.artist || 'Unknown Artist',
      album: songData.album || 'Unknown Album',
      year: songData.year || new Date().getFullYear(),
      genre: songData.genre || [],
      duration: songData.duration || 0,
      rating: songData.rating || 0,
      cover: songData.cover || 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: songData.description || '',
    };

    songs.push(newSong);
    localStorage.setItem('musicDB', JSON.stringify(songs));
    return newSong;
  },

  // PUT - Update existing song
  async updateSong(id: string, songData: Partial<Song>): Promise<Song> {
    await delay(400);
    const stored = localStorage.getItem('musicDB');
    const songs: Song[] = stored ? JSON.parse(stored) : [...musicDB];
    
    const index = songs.findIndex((s) => s.id === parseInt(id, 10));
    if (index === -1) {
      throw new Error('Song not found');
    }

    songs[index] = { ...songs[index], ...songData };
    localStorage.setItem('musicDB', JSON.stringify(songs));
    return songs[index];
  },

  // DELETE song
  async deleteSong(id: string): Promise<{ success: boolean }> {
    await delay(300);
    const stored = localStorage.getItem('musicDB');
    const songs: Song[] = stored ? JSON.parse(stored) : [...musicDB];

    const index = songs.findIndex((s) => s.id === parseInt(id, 10));
    if (index === -1) {
      throw new Error('Song not found');
    }

    songs.splice(index, 1);
    localStorage.setItem('musicDB', JSON.stringify(songs));
    return { success: true };
  },

  // ... puedes añadir aquí los otros métodos como getSongsByGenre, searchSongs, etc.,
  // siempre añadiendo los tipos correspondientes.
};