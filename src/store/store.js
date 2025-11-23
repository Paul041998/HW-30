import { configureStore } from '@reduxjs/toolkit';
import swapiReducer from '../features/swapiSlice.js';

export const store = configureStore({
  reducer: {
    swapi: swapiReducer,
  },
});
