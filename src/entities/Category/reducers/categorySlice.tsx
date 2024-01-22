import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICategory } from '../category.interface';

export interface CategoryState {
  categories: ICategory[],
}

const initialState: CategoryState = {
  categories: [],
};

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setCategories: (state: CategoryState,
      action: PayloadAction<ICategory[]>) => {
      /* eslint-disable no-param-reassign */
      state.categories = [...action.payload];
    },
  },
});

export const { setCategories } = categorySlice.actions;

export default categorySlice.reducer;
