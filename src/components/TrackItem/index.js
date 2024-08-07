import Image from "next/image";
import styles from "./trackItem.module.scss";

export function TrackItem({ track }) {
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
      {/* <Image
        src={image.url}
        alt={track.name}
        width={image.width}
        height={image.height}
        layout="intrinsic"
        className={styles.trackImage}
      /> */}

      <div className={styles.info}>
        <p>{track.name}</p>
        {renderArtists()}
      </div>
    </div>
  );
}