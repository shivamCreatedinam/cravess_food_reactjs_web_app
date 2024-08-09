import { configureStore } from '@reduxjs/toolkit';
import locationSlice from './slices/Location';
import tokenSlice from './slices/Token';

export const store = configureStore({
  reducer: {
    location: locationSlice,
    token: tokenSlice,
  },
});
