import React from 'react';
import { Link } from 'react-router-dom';
import styles from './AlbumList.module.css';
import type { Album } from '../../data/albums';

interface AlbumListProps {
  albums: Album[];
  onAlbumSelect?: (album: Album) => void;
}

const AlbumList: React.FC<AlbumListProps> = ({ albums, onAlbumSelect }) => {
  return (
    <div className={styles.grid}>
      {albums.map(album => (
        <Link
          to={`/song/${album.id}`}
          key={album.id}
          className={styles.item}
          onClick={() => onAlbumSelect?.(album)}
        >
          <img src={album.cover} alt={album.albumName} className={styles.cover} />
          <div className={styles.info}>
            <h3 className={styles.title}>{album.albumName}</h3>
            <p className={styles.artist}>{album.artist}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default AlbumList;