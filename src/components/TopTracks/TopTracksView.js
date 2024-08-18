'use client';

import styles from './topTracks.module.scss';
import { TrackItem } from "../TrackItem2";
import { useDispatch, useSelector } from "react-redux";
import { setTopTracks } from "@/slices/topTracksSlice";
import { useEffect } from "react";

export default function TopTracksView({ initialData }) {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile.user);

  useEffect(() => {
    if (initialData) {
      dispatch(setTopTracks(initialData));
    }
  }, [dispatch, initialData]);

  const data = useSelector((state) => state.topTracks);

  console.log(profile, data);

  const renderContent = () => !profile
    ? (
      <div>Login to view your top 5 tracks.</div>
    )
    : (
      <>
        <h1 className={styles.title}>
          Top 5 Tracks
        </h1>

        <div className={styles.list}>
          {data?.map((track) => (
            <TrackItem
              key={track.id}
              track={track}
            />
          ))}
        </div>
      </>
    );

  return (
    <section className={styles.topTracksSection}>
      {renderContent()}
    </section>
  );
}