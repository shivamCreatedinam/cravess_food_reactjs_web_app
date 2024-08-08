import { configureStore } from '@reduxjs/toolkit';
import locationSlice from './slices/Location';

export const store = configureStore({
  reducer: {
    location: locationSlice,
  },
});
