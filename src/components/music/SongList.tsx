import styles from './SongList.module.css';
import Container from '../common/Container';
import SongCard from './SongCard';
import type { Song } from '../../services/db';

interface Props {
  title: string;
  songs: Song[];
  onSongSelect: (song: Song) => void;
  favorites: string[];
  onToggleFavorite: (songId: string) => void;
}

const SongList = ({ title, songs, onSongSelect, favorites, onToggleFavorite }: Props) => {
  return (
    <Container title={title}>
      <div className={styles.grid}>
        {songs.map((song) => {
          const isFavorite = favorites.includes(String(song.id));
          return (
            <SongCard
              key={song.id}
              song={song}
              onPlay={onSongSelect}
              isFavorite={isFavorite}
              onToggleFavorite={onToggleFavorite}
            />
          );
        })}
      </div>
    </Container>
  );
};

export default SongList;