'use client';

import styles from './topTracks.module.scss';
import { TrackItem } from './TrackItem';
import { useDispatch, useSelector } from "react-redux";
import { setTopTracks } from "@/slices/topTracksSlice";
import { useEffect, useRef, useState } from "react";
import gsap from 'gsap';
import { ScrollToPlugin, ScrollTrigger } from 'gsap/all';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Mousewheel } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

export default function TracksCarouselView({ initialData }) {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile.user);
  const ctx = useRef();
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

  // console.log(profile, tracks);

  const renderCurrentTrackInfo = () => (
    <div className={styles.currentTrackInfo}>
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
      <div>Login to view your top 5 tracks.</div>
    )
    : (
      // <>
      //   <h1 className={styles.title}>
      //     Top 5 Tracks
      //   </h1>

      //   <div className={styles.list}>
      //     {tracks?.map((track) => (
      //       <TrackItem
      //         key={track.id}
      //         track={track}
      //       />
      //     ))}
      //   </div>
      // </>
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
          onRealIndexChange={(swiper) => {
            setCurrentTrack(tracks[swiper.realIndex]);
          }}
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