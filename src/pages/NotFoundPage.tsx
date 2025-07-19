// src/pages/NotFoundPage.tsx

import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <div className="not-found-page" style={{ textAlign: 'center', padding: '50px' }}>
      <h1>404</h1>
      <h2>Página No Encontrada</h2>
      <p>Lo sentimos, la página que estás buscando no existe.</p>
      <Link to="/">Volver a la página de inicio</Link>
    </div>
  );
};

export default NotFoundPage;