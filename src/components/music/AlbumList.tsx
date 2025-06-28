// src/components/AlbumList.tsx

import React from 'react';
import styles from './AlbumList.module.css';
import type { Album } from '../../data/albums';

// tipos de las props usando una interfaz
interface AlbumListProps {
  albums: Album[];
  onAlbumSelect: (album: Album) => void;
}

//  desestructuración en los parámetros para obtener las props
const AlbumList: React.FC<AlbumListProps> = ({ albums, onAlbumSelect }) => {
  return (
    <div className={styles.grid}>
      {}
      {albums.map(album => (
        <div
          key={album.id} // La `key` debe ser  identificador único
          className={styles.item} // clase definida en AlbumList.module.css
          onClick={() => onAlbumSelect(album)} // Pasamos el album seleccionado al padre
        >
          <img src={album.cover} alt={album.albumName} className={styles.cover} />
          <div className={styles.info}>
            <h3 className={styles.title}>{album.albumName}</h3>
            <p className={styles.artist}>{album.artist}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AlbumList;