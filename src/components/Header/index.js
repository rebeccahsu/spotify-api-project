'use client';

import { useProfile } from "../ProfileContext";

const CLIENT_ID = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
const REDIRECT_URI = process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI;
const SCOPES = ['user-top-read'];
const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
const RESPONSE_TYPE = 'code';

export default function Header() {
  const { profile, setProfile } = useProfile();

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
        setProfile(null);
      } else {
        console.error('Failed to log out');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <header>
      {profile ? (
        <div>
          <p>Hi, {profile.display_name}</p>

          <button onClick={handleLogout}>
            Log out
          </button>
        </div>
      ) : (
        <button onClick={handleLogin}>
          Login
        </button>
      )}
    </header>
  );
}