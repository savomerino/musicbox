import { useState } from 'react';

import { type Album, mockAlbums } from './data/albums'; 
import AlbumList from './components/music/AlbumList';
import SearchBar from './components/SearchBar';
import Player from './components/Player';
import './App.css';

// URL del audio 
const AUDIO_URL = "https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3";

function App() {
    // useState para manejar la lista de álbumes filtrada y el album actual.
  // Inicializamos la lista con los albumes.
  const [filteredAlbums, setFilteredAlbums] = useState<Album[]>(mockAlbums);
  const [currentAlbum, setCurrentAlbum] = useState<Album | null>(null);

  // --- MANEJADORES ---
  const handleSearch = (searchTerm: string) => {
    const lowerCaseTerm = searchTerm.toLowerCase();
    
    // Usamos .filter(), un método de array que devuelve un nuevo array
    // Esto es inmutable, como se recomienda en React.
    const filtered = mockAlbums.filter(album =>
      album.albumName.toLowerCase().includes(lowerCaseTerm)
    );
    
    setFilteredAlbums(filtered);
  };

  const handleAlbumSelect = (album: Album) => {
    setCurrentAlbum(album);
  };

  // --- RENDERIZADO ---
  return (
    <>
      <header className="app-header">
        <h1>MusicBox - V. 2.0</h1>
        <SearchBar onSearch={handleSearch} />
      </header>
      
      <main>
        {/* Pasamos los álbumes filtrados y el manejador como props. */}
        <AlbumList albums={filteredAlbums} onAlbumSelect={handleAlbumSelect} />
      </main>

      {/* Usamos el operador lógico AND (&&) para renderizado condicional /}
      {/* Si `currentAlbum` es "truthy", el Player se muestra /}
      {/* La prop "key" al cambiar, fuerza a React a crear una nueva */}
      {/* instancia del Player, reseteando su estado  */}
      {currentAlbum && (
        <Player 
          key={currentAlbum.id} 
          album={currentAlbum} 
          audioUrl={AUDIO_URL} 
        />
      )}
    </>
  );
}

export default App;