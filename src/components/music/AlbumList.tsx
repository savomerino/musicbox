import styles from './AlbumList.module.css';
import Container from '../common/Container';
import AlbumCard from './AlbumCard';
import type { Album } from '../../data/albums';

interface Props {
  title: string;
  albums: Album[];
  onAlbumSelect: (album: Album) => void;
}

const AlbumList = ({ title, albums, onAlbumSelect }: Props) => {
  return (
    <Container title={title}>
      <div className={styles.grid}>
        {albums.map((album) => (
          <AlbumCard key={album.id} album={album} onPlay={onAlbumSelect} />
        ))}
      </div>
    </Container>
  );
};

export default AlbumList;