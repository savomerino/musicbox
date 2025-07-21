import React, { useState, useRef, useEffect } from 'react';
import type { Album } from '../data/albums';

interface PlayerProps {
  album: Album;
  audioUrl: string;
}

const Player: React.FC<PlayerProps> = ({ album, audioUrl }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      isPlaying ? audio.play() : audio.pause();
    }
  }, [isPlaying]);

  const togglePlayPause = () => setIsPlaying(prev => !prev);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const { currentTime, duration } = audioRef.current;
      if (duration) setProgress((currentTime / duration) * 100);
    }
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      const { duration } = audioRef.current;
      audioRef.current.currentTime = (Number(e.target.value) * duration) / 100;
    }
  };

  return (
    <div style={styles.playerContainer}>
      <audio
        ref={audioRef}
        src={audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onLoadedData={() => audioRef.current?.play()}
        onEnded={() => setIsPlaying(false)}
      />
      <img src={album.cover} alt={album.albumName} style={styles.albumCover} />
      <div style={styles.songInfo}>
        <strong>{album.albumName}</strong>
        <small>{album.artist}</small>
      </div>
      <button onClick={togglePlayPause} style={styles.playButton}>{isPlaying ? '❚❚' : '▶'}</button>
      <input
        type="range"
        value={progress}
        onChange={handleSliderChange}
        style={styles.slider}
      />
    </div>
  );
};

// Estilos en línea para simplicidad
const styles: { [key: string]: React.CSSProperties } = {
  playerContainer: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100%',
    backgroundColor: '#181818',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    padding: '10px 20px',
    borderTop: '1px solid #282828'
  },
  albumCover: { width: '50px', height: '50px', marginRight: '15px' },
  songInfo: { flexGrow: 1, display: 'flex', flexDirection: 'column' },
  playButton: { background: 'none', border: 'none', color: 'white', fontSize: '24px', cursor: 'pointer' },
  slider: { flexGrow: 2, marginLeft: '15px' }
};

export default Player;