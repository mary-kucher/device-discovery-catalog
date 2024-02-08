import { configureStore, combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';
import categoryReducer from '../entities/Category/reducers/categorySlice';
import searchReducer from '../features/Search/reducers/searchSlice';
import cartReducer from '../features/Cart/reducers/cartSlice';
import favouritesReducer from '../features/Favourites/reducers/favouritesSlice';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['category', 'search'],
};

const rootReducer = combineReducers({
  category: categoryReducer,
  search: searchReducer,
  cart: cartReducer,
  favourites: favouritesReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [],
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const persistor = persistStore(store);
