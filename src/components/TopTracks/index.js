import { getUserTopTracks } from "@/lib/spotify";
import styles from './topTracks.module.scss';
import { TrackItem } from "../TrackItem";

async function getTopFiveTracks() {
  const data = await getUserTopTracks({ limit: 5 });
  return data;
}

export default async function TopTracks() {
  const data = await getTopFiveTracks();

  if (!data?.length) {
    return null;
  }

  return (
    <section className={styles.topTracksSection}>
      <h1 className={styles.title}>
        Top 5 Tracks
      </h1>

      <div className={styles.list}>
        {data.map((track) => (
          <TrackItem key={track.id} track={track} />
        ))}
      </div>
    </section>
  );
}