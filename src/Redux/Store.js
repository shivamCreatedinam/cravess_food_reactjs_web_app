import { configureStore } from '@reduxjs/toolkit';
import {thunk} from 'redux-thunk';
import imageReducer from './slices/imageSlice';

export const store = configureStore({
    reducer: {
        images: imageReducer,
      },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});
