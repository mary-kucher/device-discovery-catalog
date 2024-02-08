/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IFavourite } from '../favourite.interface';

export interface IFavouritesState {
  favourites: IFavourite[],
}

const initialState: IFavouritesState = {
  favourites: [],
};

export const favouritesSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    addFavourite: (state: IFavouritesState, action: PayloadAction<string>) => {
      state.favourites.push({ id: action.payload });
    },
    // eslint-disable-next-line max-len
    removeFavourite: (state: IFavouritesState, action: PayloadAction<string>) => {
      state.favourites = state.favourites.filter(favourite => {
        return favourite.id !== action.payload;
      });
    },
  },
});

export const {
  addFavourite,
  removeFavourite,
} = favouritesSlice.actions;

export default favouritesSlice.reducer;
