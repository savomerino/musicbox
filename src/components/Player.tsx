import React, { useState, useRef, useEffect } from 'react';
import type { Album } from '../data/albums';

//  props que recibirá el Player
interface PlayerProps {
  album: Album;
  audioUrl: string;
}

const Player: React.FC<PlayerProps> = ({ album, audioUrl }) => {
  //useRef para la referencia al elemento <audio> del DOM
  const audioRef = useRef<HTMLAudioElement>(null);

  //  useState para los estados que afectan directamente la UI
  const [isPlaying, setIsPlaying] = useState(true); // Inicia reproduciendo
  const [progress, setProgress] = useState(0);

  // useEffect para manejar el efecto secundario de reproducir-pausar
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]); // solo se ejecuta si `isPlaying` cambia

  // Manejador para el botón de Play/Pausa
  const togglePlayPause = () => {
    setIsPlaying(prevState => !prevState); // Actualiza usando el estado anterior
  };
  
  // Manejador para actualizar el slider mientras la canción avanza
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const { currentTime, duration } = audioRef.current;
      if (duration) { // Asegurarse que la duración no es NaN
        setProgress((currentTime / duration) * 100);
      }
    }
  };

  // Manejador para cambiar la posición de la canción con el slider
  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      const { duration } = audioRef.current;
      audioRef.current.currentTime = (Number(event.target.value) * duration) / 100;
    }
  };

  return (
    <div className="player-container">
      {/* tag <audio> no se ve, pero es controlado por React */}
      <audio
        ref={audioRef}
        src={audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onLoadedData={() => audioRef.current?.play()}
        onEnded={() => setIsPlaying(false)}
      />
      
      {/* los controles que el usuario sí ve */}
      <div className="player-controls">
        <img src={album.cover} alt={album.albumName} className="player-album-cover" />
        <div className="player-song-info">
          <strong>{album.albumName}</strong>
          <span>{album.artist}</span>
        </div>
        <button onClick={togglePlayPause}>
          {/* Operador ternario para cambiar el texto del botón */}
          {isPlaying ? 'Pausar' : 'Reproducir'}
        </button>
        <input
          type="range"
          value={progress}
          onChange={handleSliderChange}
          className="progress-slider"
        />
      </div>
    </div>
  );
};

export default Player;