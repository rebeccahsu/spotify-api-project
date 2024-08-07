import React from 'react';
import { ProfileProvider } from '../ProfileContext';
import Header from '../Header';
import { getUserProfile } from '@/lib/spotify';

export default async function Layout({ children }) {
  const getProfile = async () => {
    try {
      const data = await getUserProfile();
      return data;
    } catch (error) {
      console.error('Error fetching profile:', error);
      return null;
    }
  }

  const profile = await getProfile();

  return (
    <ProfileProvider initialProfile={profile}>
      <Header />
      {children}
    </ProfileProvider>
  );
}
