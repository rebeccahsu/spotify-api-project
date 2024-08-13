import { createSlice } from '@reduxjs/toolkit';

const topTracksSlice = createSlice({
  name: 'topTracks',
  initialState: [],
  reducers: {
    setTopTracks: (state, action) => {
      return action.payload;
    },
    clearTopTracks: () => {
      return [];
    },
  },
});

export const { setTopTracks, clearTopTracks } = topTracksSlice.actions;
export default topTracksSlice.reducer;
