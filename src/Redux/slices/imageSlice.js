// Example: slices/images.js
import { createSlice } from '@reduxjs/toolkit';

const imagesSlice = createSlice({
  name: 'images',
  initialState: {
    image1: null,
    image2: null,
  },
  reducers: {
    setImage1: (state, action) => {
      state.image1 = action.payload;
    },
    setImage2: (state, action) => {
      state.image2 = action.payload;
    },
  },
});

export const { setImage1, setImage2 } = imagesSlice.actions;

// Async action creator (optional, using redux-thunk)
export const fetchImages = () => async (dispatch) => {
  try {
    const response = await fetch('/api/images');
    const data = await response.json();
    dispatch(setImage1(data.image1));
    dispatch(setImage2(data.image2));
  } catch (error) {
    console.error('Failed to fetch images:', error);
  }
};

export default imagesSlice.reducer;
