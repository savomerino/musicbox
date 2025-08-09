import styles from './AlbumList.module.css';
import Container from '../common/Container';
import AlbumCard from './AlbumCard';
import type { Album } from '../../data/albums';

interface Props {
  title: string;
  albums: Album[];
  onAlbumSelect: (album: Album) => void;
  favorites: string[]; // Lista de IDs favoritos
  onToggleFavorite: (albumId: string) => void; // Función para alternar
}

const AlbumList = ({ title, albums, onAlbumSelect, favorites, onToggleFavorite }: Props) => {
  return (
    <Container title={title}>
      <div className={styles.grid}>
        {albums.map((album) => {
          const isFavorite = favorites.includes(album.id);
          return (
            <AlbumCard
              key={album.id}
              album={album}
              onPlay={onAlbumSelect}
              isFavorite={isFavorite}
              onToggleFavorite={onToggleFavorite}
            />
          );
        })}
      </div>
    </Container>
  );
};

export default AlbumList;