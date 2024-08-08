'use client';

import Image from "next/image";
import styles from "./trackItem.module.scss";
import { useState } from "react";
import clsx from "clsx";

export function TrackItem({ track }) {
  const [isPlaying, setIsPlaying] = useState(false);

  const image = track.album.images[1];

  const renderArtists = () => (
    <p>
      {track.artists.map((artist) => artist.name).join(", ")}
    </p>
  );

  return (
    <div
      key={track.id}
      className={styles.trackItem}
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

        <Image
          src={image.url}
          alt={track.name}
          width={image.width}
          height={image.height}
          layout="intrinsic"
          className={clsx(styles.cdFigure, isPlaying && styles.playing)}
        />
      </div>

      <div className={styles.info}>
        <p>{track.name}</p>
        {renderArtists()}
      </div>

      <div className={styles.previewAudio}>
        {track.preview_url ? (
          <audio
            controls
            controlsList="nofullscreen nodownload noplaybackrate foobar"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
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