'use client';

import styles from './topTracks.module.scss';
import { TrackItem } from "../TrackItem2";
import { useDispatch, useSelector } from "react-redux";
import { setTopTracks } from "@/slices/topTracksSlice";
import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from 'gsap';
import { ScrollToPlugin, ScrollTrigger } from 'gsap/all';

export default function TopTracksView({ initialData }) {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile.user);
  const ctx = useRef();
  const tracks = useSelector((state) => state.topTracks);

  useEffect(() => {
    if (initialData) {
      dispatch(setTopTracks(initialData));
    }
  }, [dispatch, initialData]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
    ctx.current = gsap.context(() => {
      let panels = gsap.utils.toArray(".trackItem"),
        observer = ScrollTrigger.normalizeScroll(true),
        scrollTween;

      // on touch devices, ignore touchstart events if there's an in-progress tween so that touch-scrolling doesn't interrupt and make it wonky
      document.addEventListener("touchstart", e => {
        if (scrollTween) {
          e.preventDefault();
          e.stopImmediatePropagation();
        }
      }, {capture: true, passive: false})

      function goToSection(i) {
        scrollTween = gsap.to(window, {
          scrollTo: {y: i * innerHeight, autoKill: false},
          onStart: () => {
            observer.disable(); // for touch devices, as soon as we start forcing scroll it should stop any current touch-scrolling, so we just disable() and enable() the normalizeScroll observer
            observer.enable();
          },
          duration: 1,
          onComplete: () => scrollTween = null,
          overwrite: true
        });
      }

      panels.forEach((panel, i) => {
        ScrollTrigger.create({
          trigger: panel,
          start: "top bottom",
          end: "+=199%",
          onToggle: self => self.isActive && !scrollTween && goToSection(i)
        });
      });

      // just in case the user forces the scroll to an inbetween spot (like a momentum scroll on a Mac that ends AFTER the scrollTo tween finishes):
      ScrollTrigger.create({
        start: 0, 
        end: "max",
        snap: 1 / (panels.length - 1)
      })
    });

    return () => {
      ctx.current?.revert();
    };
  }, [tracks]);

  // console.log(profile, tracks);

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
          {tracks?.map((track) => (
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