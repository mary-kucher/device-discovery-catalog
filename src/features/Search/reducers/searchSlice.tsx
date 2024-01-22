import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProduct } from '../../../entities/ProductCard/product.interface';

export interface CategoryState {
  searchedValue: string,
  searchedProducts: IProduct[],
}

const initialState: CategoryState = {
  searchedValue: '',
  searchedProducts: [],
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchedValue: (state: CategoryState,
      action: PayloadAction<string>) => {
      /* eslint-disable no-param-reassign */
      state.searchedValue = action.payload;
    },
    setSearchedProducts: (state: CategoryState,
      action: PayloadAction<IProduct[]>) => {
      /* eslint-disable no-param-reassign */
      state.searchedProducts = [...action.payload];
    },
    clearSearchedProducts: (state: CategoryState) => {
      state.searchedValue = '';
      state.searchedProducts = [];
    },
  },
});

export const {
  setSearchedProducts, setSearchedValue, clearSearchedProducts,
} = searchSlice.actions;

export default searchSlice.reducer;
