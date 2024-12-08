import { NextResponse } from 'next/server';
import axios from 'axios';

export async function middleware(request) {
  const url = new URL(request.url);

  if (url.pathname === '/api/auth/callback') {
    const code = url.searchParams.get('code');

    if (!code) {
      return NextResponse.json({ error: 'No code provided' }, { status: 400 });
    }

    const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
    const redirectUri = process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI;

    try {
      const response = await axios.post('https://accounts.spotify.com/api/token', new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: redirectUri,
      }), {
        headers: {
          'Authorization': 'Basic ' + Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      const { access_token, refresh_token } = response.data;

      const res = NextResponse.redirect(new URL('/', request.url));
      res.cookies.set('access_token', access_token, { httpOnly: true, path: '/' });
      res.cookies.set('refresh_token', refresh_token, { httpOnly: true, path: '/' });
      return res;
    } catch (error) {
      console.error('Error fetching Spotify token:', error.response ? error.response.data : error.message);
      return NextResponse.json({ error: 'Failed to fetch token from Spotify' }, { status: 500 });
    }
  }

  return NextResponse.next();
}
