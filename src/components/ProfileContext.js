'use client';

import React, { createContext, useState, useContext } from 'react';

const ProfileContext = createContext(null);

export function ProfileProvider({ children, initialProfile }) {
  const [profile, setProfile] = useState(initialProfile);

  return (
    <ProfileContext.Provider value={{ profile, setProfile }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
}
