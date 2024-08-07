import React from 'react';
import axios from 'axios';
import { cookies } from 'next/headers';
import { ProfileProvider } from '../ProfileContext';
import Header from '../Header';

export default async function Layout({ children }) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('access_token')?.value;

  const isLoggedIn = Boolean(accessToken);

  if (!accessToken) {
    return <div>No access token found.</div>;
  }

  let profile = null;

  try {
    const response = await axios.get('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    profile = response.data;
  } catch (error) {
    console.error('Error fetching profile:', error);
  }

  return (
    <ProfileProvider initialProfile={profile} isLoggedIn={isLoggedIn}>
      <Header />
      {children}
    </ProfileProvider>
  );
}
