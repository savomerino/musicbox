import styles from './App.module.css';
import Navbar from './components/layout/Navbar';
import AlbumList from './components/music/AlbumList';
import { mockAlbums } from './data/albums';

function App() {
  return (
    <div className={styles.app}>
      <Navbar />
      <main>
        {}
        <AlbumList title="Lanzamientos Populares" albums={mockAlbums} />
        <AlbumList title="Tus Mixes Más Escuchados" albums={mockAlbums.slice(0, 5).reverse()} />
        <AlbumList title="Similares" albums={mockAlbums.slice(2, 7)} />
        <AlbumList title="Clásicos del Rock" albums={mockAlbums.slice(4)} />
      </main>
    </div>
  );
}

export default App;