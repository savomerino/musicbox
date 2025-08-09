import styles from './AlbumList.module.css';
import Container from '../common/Container';
import AlbumCard from './AlbumCard';
import type { Song } from '../../services/db'; // 👈 1. Importar tipo 'Song'

interface Props {
  title: string;
  albums: Song[]; // 👈 2. Espera un array de 'Song'
  onAlbumSelect: (album: Song) => void; // 👈 3. El handler ahora es de tipo 'Song'
  favorites: string[];
  onToggleFavorite: (albumId: string) => void;
}

const AlbumList = ({ title, albums, onAlbumSelect, favorites, onToggleFavorite }: Props) => {
  return (
    <Container title={title}>
      <div className={styles.grid}>
        {albums.map((album) => {
          // 4. El ID en el servicio es un número, lo convertimos a string para la comparación
          const isFavorite = favorites.includes(String(album.id));
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