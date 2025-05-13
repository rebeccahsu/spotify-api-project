'use client';

import styles from './topTracks.module.scss';
import { TrackItem } from './TrackItem';
import { useDispatch, useSelector } from "react-redux";
import { setTopTracks } from "@/slices/topTracksSlice";
import { useEffect, useState } from "react";
import gsap from 'gsap';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Mousewheel } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import clsx from 'clsx';

export default function TracksCarouselView({ initialData }) {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile.user);
  const tracks = useSelector((state) => state.topTracks);

  const [currentTrack, setCurrentTrack] = useState(tracks[0]);

  useEffect(() => {
    if (initialData) {
      dispatch(setTopTracks(initialData));
    }
  }, [dispatch, initialData]);

  useEffect(() => {
    setCurrentTrack(tracks[0]);
  }
  , [tracks]);

  const onRealIndexChange = (swiper) => {
    setCurrentTrack(tracks[swiper.realIndex]);
    gsap.fromTo(".currentTrackInfo",
      { opacity: 0, y: 100 },
      { opacity: 1, y: 0, duration: 0.5 }
    );
    
  }

  const renderCurrentTrackInfo = () => (
    <div className={clsx(styles.currentTrackInfo, "currentTrackInfo")}>
      <h1 className={styles.name}>
        {currentTrack.name}
      </h1>
      <p className={styles.artists}>
        {currentTrack.artists.map((artist) => artist.name).join(", ")}
      </p>
    </div>
  );

  const renderContent = () => !profile
    ? (
      <div style={{ paddingTop: 180 }}>
        Login to view your top 5 tracks.
      </div>
    )
    : (
      <div className={styles.carouselWrapper}>
        {currentTrack && renderCurrentTrackInfo()}

        <Swiper
          direction={'vertical'}
          pagination={{
            clickable: true,
          }}
          mousewheel={true}
          modules={[Pagination, Mousewheel]}
          className={styles.carousel}
          onRealIndexChange={onRealIndexChange}
          slidesPerView={1.2}
          centeredSlides
          loop
          style={{
            "--swiper-pagination-color": "#333",
            "--swiper-pagination-bullet-inactive-color": "#fff",
            "--swiper-pagination-bullet-inactive-opacity": "1",
            "--swiper-pagination-bullet-size": "3px",
            "--swiper-pagination-bullet-horizontal-gap": "10px"
          }}
        >
          {tracks?.map((track) => (
            <SwiperSlide
              className={styles.slide}
              key={track.id}
            >
              <TrackItem
                track={track}
                currentTrack={currentTrack}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    );

  return (
    <section className={styles.topTracksSection}>
      {renderContent()}
    </section>
  );
}