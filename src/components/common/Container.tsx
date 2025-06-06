import React from 'react';
import styles from './Container.module.css';

interface ContainerProps {
  children: React.ReactNode; // Acepta 'children' para ser reutilizable 
  title: string;
}

const Container = ({ children, title }: ContainerProps) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      {children}
    </div>
  );
};

export default Container;