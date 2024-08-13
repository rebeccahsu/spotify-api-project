import { configureStore } from '@reduxjs/toolkit';
import profileReducer from '../slices/profileSlice';
import topTracksReducer from '../slices/topTracksSlice';

export const store = configureStore({
  reducer: {
    profile: profileReducer,
    topTracks: topTracksReducer,
  },
});
