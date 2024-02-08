import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProduct } from '../../../entities/ProductCard/product.interface';

export interface SearchedState {
  searchedValue: string,
  searchedProducts: IProduct[],
}

const initialState: SearchedState = {
  searchedValue: '',
  searchedProducts: [],
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchedValue: (state: SearchedState,
      action: PayloadAction<string>) => {
      /* eslint-disable no-param-reassign */
      state.searchedValue = action.payload;
    },
    setSearchedProducts: (state: SearchedState,
      action: PayloadAction<IProduct[]>) => {
      /* eslint-disable no-param-reassign */
      state.searchedProducts = [...action.payload];
    },
    clearSearchedProducts: (state: SearchedState) => {
      state.searchedValue = '';
      state.searchedProducts = [];
    },
  },
});

export const {
  setSearchedProducts, setSearchedValue, clearSearchedProducts,
} = searchSlice.actions;

export default searchSlice.reducer;
