import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  accessToken: null,
  user: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    setProfile: (state, action) => {
      state.user = action.payload;
    },
    clearProfile: (state) => {
      state.accessToken = null;
      state.user = null;
    },
  },
});

export const { setAccessToken, setProfile, clearProfile } = profileSlice.actions;
export default profileSlice.reducer;
