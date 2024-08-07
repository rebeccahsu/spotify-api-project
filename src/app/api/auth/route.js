// app/api/auth/route.js

import axios from 'axios';
import querystring from 'querystring';

export async function GET(req) {
  const url = new URL(req.url);
  const code = url.searchParams.get('code');

  const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const redirectUri = process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI;

  try {
    const response = await axios.post('https://accounts.spotify.com/api/token', querystring.stringify({
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: redirectUri,
    }), {
      headers: {
        'Authorization': 'Basic ' + Buffer.from(clientId + ':' + clientSecret).toString('base64'),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const { access_token, refresh_token } = response.data;

    return new Response(JSON.stringify({ access_token, refresh_token }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error fetching Spotify token:', error.response ? error.response.data : error.message);
    return new Response(JSON.stringify({ error: 'Failed to fetch token from Spotify' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
