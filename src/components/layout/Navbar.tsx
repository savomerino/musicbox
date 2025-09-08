import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <Link to="/" className={styles.brand}>MusicBox</Link>
      <div>
        <Link to="/" className={styles.navLink}>Inicio</Link>
        <Link to="/favoritos" className={styles.navLink}>Favoritos</Link>
        <Link to="/create" className={styles.navLink}>Crear Canción</Link> {/* 👈 Añadir este enlace */}
      </div>
    </nav>
  );
};

export default Navbar;