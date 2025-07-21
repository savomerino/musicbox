import { Link } from 'react-router-dom'; // Importar Link
import styles from './Navbar.module.css';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <Link to="/" className={styles.brand}>MusicBox</Link> {/* Link a la Home */}
      <div>
        <Link to="/" className={styles.navLink}>Inicio</Link>
        <Link to="/favoritos" className={styles.navLink}>Favoritos</Link> {/* Link a Favoritos */}
      </div>
    </nav>
  );
};

export default Navbar;