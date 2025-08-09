// pasado a typescript

// 1. Definimos la interfaz para una canción, estableciendo los tipos de cada campo.
export interface Song {
  id: number;
  title: string;
  artist: string;
  album: string;
  year: number;
  genre: string[];
  duration: number;
  rating: number;
  cover: string;
  description: string;
}

// 2. Definimos la base de datos como un array de canciones (Song[])
let musicDB: Song[] = [
  // ... (los mismos objetos de canciones que proporcionaste)
  {
    id: 1,
    title: 'Bohemian Rhapsody',
    artist: 'Queen',
    album: 'A Night at the Opera',
    year: 1975,
    genre: ['Rock', 'Progressive Rock'],
    duration: 355,
    rating: 9.5,
    cover:
      'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=400',
    description:
      'A groundbreaking rock opera that combines multiple musical styles and tells a dramatic story through its innovative structure.',
  },
  {
    id: 2,
    title: 'Billie Jean',
    artist: 'Michael Jackson',
    album: 'Thriller',
    year: 1982,
    genre: ['Pop', 'R&B'],
    duration: 294,
    rating: 9.2,
    cover:
      'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=400',
    description:
      "One of the most iconic pop songs of all time, featuring Jackson's signature vocals and an unforgettable bassline.",
  },
  // ... Pega el resto de tus canciones aquí
];

// 3. Tipamos la función para asegurar que siempre devuelva un número.
export const getNextId = (): number => {
  if (musicDB.length === 0) return 1;
  return Math.max(...musicDB.map((song) => song.id)) + 1;
};

export { musicDB };