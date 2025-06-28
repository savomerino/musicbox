import React, { useState } from 'react';

//  forma de las props con TypeScript
interface SearchBarProps {
  onSearch: (term: string) => void;
}

//  componente funcional
const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  //  useState para "recordar" lo que el usuario escribe
  const [term, setTerm] = useState('');

  // este manejador se ejecuta cada vez que el input cambia
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTerm = event.target.value;
    setTerm(newTerm); // Actualizamos nuestro estado interno
    onSearch(newTerm); // Notificamos al componente padre (App.tsx) del cambio
  };

  // Renderizamos el JSX
  return (
    <input
      type="text"
      placeholder="Buscar por nombre de álbum..."
      className="search-bar"
      value={term} // El valor del input está controlado por el estado `term`
      onChange={handleChange} // El evento `onChange` actualiza el estado
    />
  );
};

export default SearchBar;