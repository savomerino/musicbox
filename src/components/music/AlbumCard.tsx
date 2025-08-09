import { Link } from 'react-router-dom';
import styles from './AlbumCard.module.css';
import type { Song } from '../../services/db'; // 👈 1. Importar tipo 'Song'

interface Props {
  album: Song; // 👈 2. Espera un prop 'album' de tipo 'Song'
  onPlay: (album: Song) => void;
  isFavorite: boolean;
  onToggleFavorite: (albumId: string) => void;
}

const AlbumCard = ({ album, onPlay, isFavorite, onToggleFavorite }: Props) => {
  const handlePlayClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onPlay(album);
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // 3. El ID de la canción es un número, lo convertimos a string
    onToggleFavorite(String(album.id)); 
  };
  
  // 👇 4. Renderizar las propiedades correctas
  return (
    <div className={styles.card}>
      <div style={{ position: 'relative' }}>
        <Link to={`/song/${album.id}`}>
          <img 
            src={album.cover} 
            alt={`Cover of ${album.album}`} 
            className={styles.cover} 
          />
        </Link>
        <button className={styles.playButton} onClick={handlePlayClick}>▶</button>
      </div>
      <div className={styles.infoContainer}>
        <div>
          <h3 className={styles.title}>{album.title}</h3>
          <p className={styles.artist}>{album.artist}</p>
        </div>
        <button onClick={handleFavoriteClick} className={styles.favoriteButton}>
          {isFavorite ? '❤️' : '🤍'}
        </button>
      </div>
    </div>
  );
};

export default AlbumCard;