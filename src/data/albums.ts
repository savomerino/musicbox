// Definimos el tipo para cada álbum
export interface Album {
  id: string;
  cover: string; 
  artist: string;
  albumName: string;
  publicationDate: string;
}

// Creamos la lista de objetos mockeados (al menos 7 items) 
export const mockAlbums: Album[] = [
  { id: 'album-1', cover: 'https://picsum.photos/seed/picsum1/200/200', artist: 'The Digital Nomads', albumName: 'Cybernetic Dreams', publicationDate: '2023-10-26' },
  { id: 'album-2', cover: 'https://picsum.photos/seed/picsum2/200/200', artist: 'Acoustic Echoes', albumName: 'Fireside Melodies', publicationDate: '2022-05-15' },
  { id: 'album-3', cover: 'https://picsum.photos/seed/picsum3/200/200', artist: 'Synthwave Surfers', albumName: 'Neon Paradise', publicationDate: '2024-01-20' },
  { id: 'album-4', cover: 'https://picsum.photos/seed/picsum4/200/200', artist: 'Jazzphonics', albumName: 'Midnight Grooves', publicationDate: '2021-11-30' },
  { id: 'album-5', cover: 'https://picsum.photos/seed/picsum5/200/200', artist: 'Lo-Fi Chillers', albumName: 'Rainy Day Rhythms', publicationDate: '2023-02-14' },
  { id: 'album-6', cover: 'https://picsum.photos/seed/picsum6/200/200', artist: 'Rock Rebellion', albumName: 'Static Overload', publicationDate: '2020-08-01' },
  { id: 'album-7', cover: 'https://picsum.photos/seed/picsum7/200/200', artist: 'Classical Minds', albumName: 'Symphony of the Stars', publicationDate: '2019-03-10' },
];