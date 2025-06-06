import styles from './Navbar.module.css';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <h1 className={styles.brand}>Music Gallery</h1>
      <div>
        <a href="#" className={styles.navLink}>Inicio</a>
        <a href="#" className={styles.navLink}>Buscar</a>
      </div>
    </nav>
  );
};

export default Navbar;