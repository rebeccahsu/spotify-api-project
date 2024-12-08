import axios from 'axios';
import { cookies } from 'next/headers';

export async function requestWithAuth(options) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('access_token')?.value;

  try {
    console.log(`[API] request: ${JSON.stringify(options, null, 2)}`);
    const result = await axios({
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${accessToken}`,
      }
    });
    console.log(`[API] status: ${result?.status}`);

    return result;
  } catch (err) {
    const status = err?.response?.status;
    // const data = err?.response?.data;
    const msg = err?.message ?? err;

    const log = [
      status ? `status: ${status}` : null,
      // data ? `data: ${JSON.stringify(data)}` : null,
      msg ? `msg: ${msg}` : null
    ]
      .filter((el) => !!el)
      .join(', ');

    console.log(`[API] error ${log}`);

    if (status === 401) {
      // Token might be expired, attempt to refresh
      await refreshToken();
      const newAccessToken = cookies().get('access_token')?.value;
      
      // Retry the request after refreshing the token
      return axios.get(url, {
        headers: { Authorization: `Bearer ${newAccessToken}` },
        ...options,
      });
    }

    throw err;
  }
}

export const getHost = () => {
  return process.env.SERVER_HOST;
};

async function refreshToken() {
  const refreshToken = cookies().get('refresh_token')?.value; // Retrieve refresh token from cookies or storage
  if (!refreshToken) {
    throw new Error('No refresh token found');
  }

  try {
    const response = await axios.post('https://accounts.spotify.com/api/token', new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    }), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    if (response.status !== 200) {
      throw new Error('Failed to refresh token');
    }

    const { access_token, refresh_token } = response.data;
    // Save the new access token in cookies or storage
    cookies().set('access_token', access_token, { path: '/' });
    cookies().set('refresh_token', refresh_token, { path: '/' });
  } catch (error) {
    console.error('Error refreshing token:', error);
    throw error;
  }
}
