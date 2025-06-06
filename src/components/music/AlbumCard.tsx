import styles from './AlbumCard.module.css';
import type { Album } from '../../data/albums'; // Ruta relativa correcta
 // Ruta relativa correcta

interface Props {
  album: Album;
}

const AlbumCard = ({ album }: Props) => {
  return (
    <div className={styles.card}>
      <img src={album.cover} alt={`Cover of ${album.albumName}`} className={styles.cover} />
      <div>
        <h3 className={styles.title}>{album.albumName}</h3>
        <p className={styles.artist}>{album.artist}</p>
        <p className={styles.date}>{album.publicationDate}</p>
        {/* Botón visual sin acción  */}
        <button className={styles.playButton}>▶</button>
      </div>
    </div>
  );
};

export default AlbumCard;