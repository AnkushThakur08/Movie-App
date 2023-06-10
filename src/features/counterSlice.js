import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchFilms = createAsyncThunk('films/fetchFilms', async () => {
  const response = await axios.get('https://swapi.dev/api/films?format=json');
  return response.data.results;
});

const initialState = {
  films: [],
  loading: false,
  error: null,
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilms.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFilms.fulfilled, (state, action) => {
        state.loading = false;
        state.films = action.payload;
      })
      .addCase(fetchFilms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const selectFilms = (state) => state.counter.films;
export const selectLoading = (state) => state.counter.loading;
export const selectError = (state) => state.counter.error;

export default counterSlice.reducer;
