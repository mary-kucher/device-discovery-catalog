/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IEntry } from '../entry.interface';

export interface ICartState {
  entries: IEntry[],
}

const initialState: ICartState = {
  entries: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct: (state: ICartState, action: PayloadAction<string>) => {
      const item = state.entries.find((entry) => {
        return entry.id === action.payload;
      });

      if (item) {
        item.quantity += 1;
      } else {
        state.entries.push({ id: action.payload, quantity: 1 });
      }
    },
    incrementQuantity: (state: ICartState, action: PayloadAction<string>) => {
      const item = state.entries.find((entry) => entry.id === action.payload);

      if (!item) {
        throw new Error('Item not found');
      }

      item.quantity += 1;
    },
    decrementQuantity: (state: ICartState, action: PayloadAction<string>) => {
      const item = state.entries.find((entry) => entry.id === action.payload);

      if (!item) {
        throw new Error('Item not found');
      }

      if (item.quantity === 1) {
        item.quantity = 1;
      } else {
        item.quantity -= 1;
      }
    },
    removeProduct: (state: ICartState, action: PayloadAction<string>) => {
      state.entries = state.entries.filter(entry => {
        return entry.id !== action.payload;
      });
    },
  },
});

export const {
  addProduct,
  incrementQuantity,
  decrementQuantity,
  removeProduct,
} = cartSlice.actions;

export default cartSlice.reducer;
