'use server';

import axios from 'axios';
import { cookies } from 'next/headers';

const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const redirectUri = process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI;

const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

const cookieStore = cookies();
const accessToken = cookieStore.get('access_token')?.value;

export const getSpotifyToken = async (code) => {
  const response = await axios.post('https://accounts.spotify.com/api/token', null, {
    params: {
      grant_type: 'authorization_code',
      code,
      redirect_uri: redirectUri,
    },
    headers: {
      Authorization: `Basic ${basicAuth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  return response.data;
};

export const getUserProfile = async () => {
  const response = await axios.get('https://api.spotify.com/v1/me', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data;
};

export const getUserTopTracks = async ({ limit }) => {
  try {
    const response = await axios.get(`https://api.spotify.com/v1/me/top/tracks?${limit && `limit=${limit}`}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  
    return response.data.items;
  } catch (err) {
    console.log('err', err?.response?.status);
  }
};
