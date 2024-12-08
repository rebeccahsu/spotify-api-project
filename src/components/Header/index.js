'use client';

import { clearProfile, setProfile } from "@/slices/profileSlice";
import styles from './header.module.scss';
import { clearTopTracks } from "@/slices/topTracksSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserProfile } from "@/lib/spotify";
import Link from "next/link";

const CLIENT_ID = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
const REDIRECT_URI = process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI;
const SCOPES = ['user-top-read'];
const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
const RESPONSE_TYPE = 'code';

export default function Header() {
  const dispatch = useDispatch();

  const handleLogin = () => {
    console.log('before login', CLIENT_ID, process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID);
    window.location.href = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPES.join('%20')}&response_type=${RESPONSE_TYPE}`;
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/logout', {
        method: 'POST',
      });

      if (response.ok) {
        dispatch(clearProfile());
        dispatch(clearTopTracks());
      } else {
        console.error('Failed to log out');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };


  const profile = useSelector((state) => state.profile.user);

  useEffect(() => {
    const getProfile = async () => {
      try {
        const data = await getUserProfile();
        dispatch(setProfile(data));
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    getProfile();

  }, [dispatch]);

  return (
    <header className={styles.header}>
      <Link href="/">
        Home
      </Link>
      <Link href="/stats">
        Stats
      </Link>
      {profile ? (
        <>
          <p>Hi, {profile.display_name}</p>

          <button onClick={handleLogout}>
            Log out
          </button>
        </>
      ) : (
        <button onClick={handleLogin}>
          Login
        </button>
      )}
    </header>
  );
}