// src/pages/HomePage.tsx

import React, { useState } from 'react';
import type { Album, } from '../data/albums';
import {mockAlbums } from '../data/albums';
import SearchBar from '../components/SearchBar';
import AlbumList from '../components/music/AlbumList';

const HomePage: React.FC = () => {
  const [filteredAlbums, setFilteredAlbums] = useState<Album[]>(mockAlbums);

  const handleSearch = (searchTerm: string) => {
    const lowerCaseTerm = searchTerm.toLowerCase();
    if (!lowerCaseTerm) {
      setFilteredAlbums(mockAlbums);
      return;
    }
    const filtered = mockAlbums.filter(album =>
      album.albumName.toLowerCase().includes(lowerCaseTerm)
    );
    setFilteredAlbums(filtered);
  };

  return (
    <div>
      <header className="app-header">
        <h1>MusicBox</h1>
        <SearchBar onSearch={handleSearch} />
      </header>
      <main>
        <AlbumList albums={filteredAlbums} />
      </main>
    </div>
  );
};

export default HomePage;