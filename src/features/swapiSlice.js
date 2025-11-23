import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  people: { items: [], next: 'https://swapi.dev/api/people/' },
  planets: { items: [], next: 'https://swapi.dev/api/planets/' },
  starships: { items: [], next: 'https://swapi.dev/api/starships/' },
  selected: null,
};

export const fetchPage = createAsyncThunk(
  'swapi/fetchPage',
  async ({ type, url }) => {
    if (!url) throw new Error('No next page');

    const res = await axios.get(url);        

    return { type, data: res.data };         
  }
);

const swapiSlice = createSlice({
  name: 'swapi',
  initialState,
  reducers: {
    setSelected(state, action) {
      state.selected = action.payload;
    },
    clearSelected(state) {
      state.selected = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPage.fulfilled, (state, action) => {
      const { type, data } = action.payload;
      state[type].items.push(...data.results);
      state[type].next = data.next;
    });
  },
});

export const { setSelected, clearSelected } = swapiSlice.actions;
export default swapiSlice.reducer;
