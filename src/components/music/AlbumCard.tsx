import { Link } from 'react-router-dom';
import styles from './AlbumCard.module.css';
import type { Album } from '../../data/albums';

interface Props {
  album: Album;
  onPlay: (album: Album) => void;
  isFavorite: boolean;
  onToggleFavorite: (albumId: string) => void;
}

const AlbumCard = ({ album, onPlay, isFavorite, onToggleFavorite }: Props) => {
  // Manejador para el botón de Play
  const handlePlayClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Evita que el clic se propague al Link
    onPlay(album);
  };

  // Manejador para el botón de Favoritos
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Evita que el clic se propague
    onToggleFavorite(album.id);
  };

  return (
    <div className={styles.card}>
      <div style={{ position: 'relative' }}>
        <Link to={`/song/${album.id}`}>
          <img 
            src={album.cover} 
            alt={`Cover of ${album.albumName}`} 
            className={styles.cover} 
          />
        </Link>
        {/* El botón de Play ahora llama a su propio manejador */}
        <button className={styles.playButton} onClick={handlePlayClick}>▶</button>
      </div>
      <div className={styles.infoContainer}>
        <div>
          <h3 className={styles.title}>{album.albumName}</h3>
          <p className={styles.artist}>{album.artist}</p>
        </div>
        {/* El botón de Favoritos está separado y llama a su manejador */}
        <button onClick={handleFavoriteClick} className={styles.favoriteButton}>
          {isFavorite ? '❤️' : '🤍'}
        </button>
      </div>
    </div>
  );
};

export default AlbumCard;