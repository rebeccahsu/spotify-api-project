'use client';

import Image from "next/image";
import styles from "./trackItem.module.scss";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";

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

  return (
    <div
      key={track.id}
      className={clsx(styles.trackItem, isPlaying && styles.playing, "trackItem")}
      onClick={() => {
        if (audioRef.current) {
          if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
          } else {
            audioRef.current.play();
            setIsPlaying(true);
          }
        }
      }}
    >
      <div className={styles.imageContainer}>
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