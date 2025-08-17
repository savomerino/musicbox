import { Link } from 'react-router-dom';
import styles from './SongCard.module.css';
import type { Song } from '../../services/db';

interface Props {
  song: Song;
  onPlay: (song: Song) => void;
  isFavorite: boolean;
  onToggleFavorite: (songId: string) => void;
}

const SongCard = ({ song, onPlay, isFavorite, onToggleFavorite }: Props) => {
  const handlePlayClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onPlay(song);
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleFavorite(String(song.id)); 
  };
  
  return (
    <div className={styles.card}>
      <div style={{ position: 'relative' }}>
        <Link to={`/song/${song.id}`}>
          <img 
            src={song.cover} 
            alt={`Cover of ${song.album}`} 
            className={styles.cover} 
          />
        </Link>
        <button className={styles.playButton} onClick={handlePlayClick}>▶</button>
      </div>
      <div className={styles.infoContainer}>
        <div>
          <h3 className={styles.title}>{song.title}</h3>
          <p className={styles.artist}>{song.artist}</p>
        </div>
        <button onClick={handleFavoriteClick} className={styles.favoriteButton}>
          {isFavorite ? '❤️' : '🤍'}
        </button>
      </div>
    </div>
  );
};

export default SongCard;