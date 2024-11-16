'use client';

import Image from "next/image";
import styles from "./trackItem.module.scss";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import playButton from '../../../../public/play-button.svg';
import pauseButton from '../../../../public/pause-button.svg';

export function TrackItem({ track, currentTrack }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const image = track.album.images[1];

  useEffect(() => {
    if (currentTrack && currentTrack.id !== track.id) {
      setIsPlaying(false);
      audioRef.current.pause();
    }
  }, [currentTrack, track]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  }

  return (
    <div
      key={track.id}
      className={clsx(styles.trackItem, isPlaying && styles.playing, "trackItem")}
    >
      {isPlaying ? (
          <Image
            src={pauseButton}
            width={50}
            className={styles.controlButton}
            onClick={togglePlay}
          />
        ) : (
          <Image
            src={playButton}
            width={50}
            className={styles.controlButton}
            onClick={togglePlay}
          />
        )
      }
      <div
        className={styles.imageContainer}
        onClick={togglePlay}
      >
        <Image
          src={image.url}
          alt={track.name}
          width={image.width}
          height={image.height}
          layout="intrinsic"
          className={styles.trackImage}
        />
      </div>

      <div className={styles.previewAudio}>
        {track.preview_url ? (
          <audio
            controls
            controlsList="nofullscreen nodownload noplaybackrate foobar"
            ref={audioRef}
          >
            <source src={track.preview_url} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        ) : (
          <p>No preview available</p>
        )}
      </div>
    </div>
  );
}