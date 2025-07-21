import { Link } from 'react-router-dom';
import styles from './AlbumCard.module.css';
import type { Album } from '../../data/albums';

interface Props {
  album: Album;
  onPlay: (album: Album) => void; // Función para reproducir
}

const AlbumCard = ({ album, onPlay }: Props) => {
  return (
    <div className={styles.card}>
      <Link to={`/song/${album.id}`}>
        <img src={album.cover} alt={`Cover of ${album.albumName}`} className={styles.cover} />
      </Link>
      <div>
        <Link to={`/song/${album.id}`} style={{ textDecoration: 'none' }}>
          <h3 className={styles.title}>{album.albumName}</h3>
        </Link>
        <p className={styles.artist}>{album.artist}</p>
        <p className={styles.date}>{album.publicationDate}</p>
        <button className={styles.playButton} onClick={() => onPlay(album)}>▶</button>
      </div>
    </div>
  );
};

export default AlbumCard;