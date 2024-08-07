import { NextResponse } from 'next/server';
import { getUserTopTracks } from '../../../lib/spotify';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const accessToken = searchParams.get('access_token');

  try {
    const topTracks = await getUserTopTracks(accessToken);
    return NextResponse.json(topTracks);
  } catch (error) {
    console.error('Error fetching user top tracks:', error);
    return NextResponse.json({ error: 'Failed to fetch user top tracks' }, { status: 500 });
  }
}
